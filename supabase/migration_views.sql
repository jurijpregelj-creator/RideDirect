-- Add views column to listings if not exists
ALTER TABLE listings ADD COLUMN IF NOT EXISTS views integer NOT NULL DEFAULT 0;

-- Function to safely increment listing view count
CREATE OR REPLACE FUNCTION increment_listing_view(listing_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE listings SET views = COALESCE(views, 0) + 1 WHERE id = listing_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute to anon and authenticated users (so visitors can also trigger views)
GRANT EXECUTE ON FUNCTION increment_listing_view(uuid) TO anon;
GRANT EXECUTE ON FUNCTION increment_listing_view(uuid) TO authenticated;
