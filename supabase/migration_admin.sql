-- ============================================================
-- RideDirect Admin Panel Migration
-- Run in Supabase SQL Editor after initial schema.sql
-- ============================================================

-- Add rejected + expired statuses to listing_status enum
ALTER TYPE listing_status ADD VALUE IF NOT EXISTS 'rejected';
ALTER TYPE listing_status ADD VALUE IF NOT EXISTS 'expired';

-- Add expires_at column to listings (90-day visibility window)
ALTER TABLE listings ADD COLUMN IF NOT EXISTS expires_at timestamptz;

-- Update public view to also filter out expired listings
CREATE OR REPLACE VIEW public_listings AS
  SELECT
    l.*,
    (
      SELECT image_url
      FROM listing_images li
      WHERE li.listing_id = l.id
      ORDER BY li.sort_order ASC
      LIMIT 1
    ) AS cover_image
  FROM listings l
  WHERE l.status = 'approved'
    AND (l.expires_at IS NULL OR l.expires_at > now())
  ORDER BY l.created_at DESC;

-- Allow admins to read all profiles (add if not exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Admins can view all profiles'
  ) THEN
    CREATE POLICY "Admins can view all profiles"
      ON profiles FOR SELECT
      USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
      );
  END IF;
END;
$$;

-- To make yourself admin (replace with your user UUID):
-- UPDATE profiles SET role = 'admin' WHERE id = 'YOUR-USER-UUID-HERE';
