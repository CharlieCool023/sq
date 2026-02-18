-- Simple fix for public inserts
-- Run this in Supabase SQL Editor

-- Allow public to insert job applications
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE policyname = 'Public can insert job_applications' AND tablename = 'job_applications'
    ) THEN
        CREATE POLICY "Public can insert job_applications" ON job_applications
            FOR INSERT WITH CHECK (true);
    END IF;
END
$$;

-- Allow public to insert contact submissions
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE policyname = 'Public can insert contact_submissions' AND tablename = 'contact_submissions'
    ) THEN
        CREATE POLICY "Public can insert contact_submissions" ON contact_submissions
            FOR INSERT WITH CHECK (true);
    END IF;
END
$$;

-- Allow public to insert booking requests
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE policyname = 'Public can insert booking_requests' AND tablename = 'booking_requests'
    ) THEN
        CREATE POLICY "Public can insert booking_requests" ON booking_requests
            FOR INSERT WITH CHECK (true);
    END IF;
END
$$;

-- Allow public to view career openings
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE policyname = 'Public can view career_openings' AND tablename = 'career_openings'
    ) THEN
        CREATE POLICY "Public can view career_openings" ON career_openings
            FOR SELECT USING (true);
    END IF;
END
$$;
