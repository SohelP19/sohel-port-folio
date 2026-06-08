
-- Owner email allowlist
CREATE OR REPLACE FUNCTION public.is_site_owner()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT coalesce((auth.jwt() ->> 'email') = 'sohelparvez1911@gmail.com', false);
$$;

-- Site assets table: maps a logical key to a storage path
CREATE TABLE public.site_assets (
  key TEXT PRIMARY KEY,
  path TEXT NOT NULL,
  name TEXT,
  mime TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.site_assets TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_assets TO authenticated;
GRANT ALL ON public.site_assets TO service_role;

ALTER TABLE public.site_assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site assets"
  ON public.site_assets FOR SELECT
  USING (true);

CREATE POLICY "Owner can insert site assets"
  ON public.site_assets FOR INSERT
  TO authenticated
  WITH CHECK (public.is_site_owner());

CREATE POLICY "Owner can update site assets"
  ON public.site_assets FOR UPDATE
  TO authenticated
  USING (public.is_site_owner())
  WITH CHECK (public.is_site_owner());

CREATE POLICY "Owner can delete site assets"
  ON public.site_assets FOR DELETE
  TO authenticated
  USING (public.is_site_owner());

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER trg_site_assets_updated
  BEFORE UPDATE ON public.site_assets
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Storage policies for the portfolio-media bucket
CREATE POLICY "Public read portfolio media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio-media');

CREATE POLICY "Owner can upload portfolio media"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'portfolio-media' AND public.is_site_owner());

CREATE POLICY "Owner can update portfolio media"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'portfolio-media' AND public.is_site_owner())
  WITH CHECK (bucket_id = 'portfolio-media' AND public.is_site_owner());

CREATE POLICY "Owner can delete portfolio media"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'portfolio-media' AND public.is_site_owner());
