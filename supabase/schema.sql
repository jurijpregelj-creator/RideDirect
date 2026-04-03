-- ============================================================
-- AmuseRides.eu — Supabase Database Schema
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- ============================================================
-- EXTENSIONS
-- ============================================================
create extension if not exists "uuid-ossp";

-- ============================================================
-- PROFILES
-- ============================================================
create type user_role as enum ('buyer', 'seller', 'admin');

create table if not exists profiles (
  id          uuid references auth.users on delete cascade primary key,
  email       text not null,
  full_name   text,
  role        user_role not null default 'buyer',
  country     text,
  created_at  timestamptz not null default now()
);

-- Auto-create profile on new user signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role, country)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    coalesce((new.raw_user_meta_data->>'role')::user_role, 'buyer'),
    new.raw_user_meta_data->>'country'
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ============================================================
-- LISTINGS
-- ============================================================
create type listing_status    as enum ('draft', 'pending', 'approved');
create type listing_condition as enum ('new', 'like_new', 'good', 'fair', 'parts_only');

create table if not exists listings (
  id                   uuid primary key default uuid_generate_v4(),
  seller_id            uuid not null references profiles(id) on delete cascade,
  title                text not null,
  description          text,
  category             text not null,
  country              text not null,
  price                numeric(12, 2) not null,
  currency             char(3) not null default 'EUR',
  condition            listing_condition not null,
  manufacturer         text,
  year                 smallint,
  ce_docs_available    boolean not null default false,
  inspection_available boolean not null default false,
  original_language    char(2),
  status               listing_status not null default 'pending',
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

-- Auto-update updated_at on every row change
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger listings_updated_at
  before update on listings
  for each row execute procedure update_updated_at_column();

-- ============================================================
-- LISTING IMAGES
-- ============================================================
create table if not exists listing_images (
  id          uuid primary key default uuid_generate_v4(),
  listing_id  uuid not null references listings(id) on delete cascade,
  image_url   text not null,
  sort_order  smallint not null default 0,
  created_at  timestamptz not null default now()
);

create index listing_images_listing_id_idx on listing_images(listing_id);

-- ============================================================
-- INQUIRIES
-- ============================================================
create table if not exists inquiries (
  id          uuid primary key default uuid_generate_v4(),
  listing_id  uuid not null references listings(id) on delete cascade,
  seller_id   uuid not null references profiles(id) on delete cascade,
  buyer_name  text not null,
  buyer_email text not null,
  buyer_phone text,
  message     text not null,
  created_at  timestamptz not null default now()
);

create index inquiries_listing_id_idx on inquiries(listing_id);
create index inquiries_seller_id_idx  on inquiries(seller_id);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS on all tables
alter table profiles       enable row level security;
alter table listings       enable row level security;
alter table listing_images enable row level security;
alter table inquiries      enable row level security;

-- ---- PROFILES ----
-- Users can read their own profile
create policy "Users can view own profile"
  on profiles for select
  using (auth.uid() = id);

-- Users can update their own profile
create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

-- Admins can view all profiles
create policy "Admins can view all profiles"
  on profiles for select
  using (
    exists (
      select 1 from profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ---- LISTINGS ----
-- Anyone can view approved listings (public marketplace)
create policy "Public can view approved listings"
  on listings for select
  using (status = 'approved');

-- Sellers can view their own listings (all statuses)
create policy "Sellers can view own listings"
  on listings for select
  using (auth.uid() = seller_id);

-- Sellers can insert their own listings
create policy "Sellers can insert own listings"
  on listings for insert
  with check (auth.uid() = seller_id);

-- Sellers can update their own listings (only draft/pending)
create policy "Sellers can update own listings"
  on listings for update
  using (auth.uid() = seller_id and status in ('draft', 'pending'));

-- Admins can manage all listings
create policy "Admins can manage all listings"
  on listings for all
  using (
    exists (
      select 1 from profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ---- LISTING IMAGES ----
-- Anyone can view images of approved listings
create policy "Public can view images of approved listings"
  on listing_images for select
  using (
    exists (
      select 1 from listings
      where listings.id = listing_images.listing_id
        and listings.status = 'approved'
    )
  );

-- Sellers can manage images of their own listings
create policy "Sellers can manage own listing images"
  on listing_images for all
  using (
    exists (
      select 1 from listings
      where listings.id = listing_images.listing_id
        and listings.seller_id = auth.uid()
    )
  );

-- ---- INQUIRIES ----
-- Sellers can view inquiries for their listings
create policy "Sellers can view inquiries on their listings"
  on inquiries for select
  using (seller_id = auth.uid());

-- Anyone can create an inquiry (even unauthenticated users)
create policy "Anyone can submit an inquiry"
  on inquiries for insert
  with check (true);

-- Admins can view all inquiries
create policy "Admins can view all inquiries"
  on inquiries for select
  using (
    exists (
      select 1 from profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================================
-- STORAGE BUCKETS (run separately in Supabase Storage)
-- ============================================================
-- Create a bucket called 'listing-images' with public access
-- In Supabase Dashboard: Storage > New bucket > Name: listing-images > Public: true

-- ============================================================
-- USEFUL VIEWS
-- ============================================================

-- Public listings with first image
create or replace view public_listings as
  select
    l.*,
    (
      select image_url
      from listing_images li
      where li.listing_id = l.id
      order by li.sort_order asc
      limit 1
    ) as cover_image
  from listings l
  where l.status = 'approved'
  order by l.created_at desc;
