-- Simple storage fix that won't fail if policies exist
-- Run this in Supabase SQL Editor

-- Try to allow public uploads (will succeed or do nothing)
DO $$
BEGIN
    -- Try to drop first (will fail silently if doesn't exist)
    DROP POLICY IF EXISTS "Public can upload resumes" ON storage.objects;
    
    -- Now create the policy
    CREATE POLICY "Public can upload resumes" ON storage.objects
        FOR INSERT 
        WITH CHECK (bucket_id = 'resumes');
EXCEPTION
    WHEN duplicate_object THEN
        NULL; -- Policy already exists, that's fine
END
$$;

-- Make sure the bucket allows public access
UPDATE storage.buckets
SET public = true
WHERE id = 'resumes';
