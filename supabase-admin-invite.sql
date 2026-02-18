-- Create a function to invite admin users without email rate limits
-- Run this in Supabase SQL Editor

-- First, enable the extensions we need
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the admin invite function
CREATE OR REPLACE FUNCTION admin_invite_user(
  email TEXT,
  password TEXT,
  user_role TEXT DEFAULT 'admin',
  full_name TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_user_id UUID;
BEGIN
  -- Create the user in auth.users
  INSERT INTO auth.users (email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
  VALUES (
    email,
    crypt(password, gen_salt('bf')),
    NOW(),
    jsonb_build_object('role', user_role, 'provider', 'email'),
    jsonb_build_object('full_name', full_name),
    NOW(),
    NOW()
  )
  RETURNING id INTO new_user_id;

  -- Create the profile
  INSERT INTO profiles (id, email, full_name, role, is_active, created_at, updated_at)
  VALUES (new_user_id, email, full_name, user_role, true, NOW(), NOW());

  RETURN new_user_id;
END;
$$;

-- Grant execute permission to authenticated users (you may want to restrict this)
GRANT EXECUTE ON FUNCTION admin_invite_user TO authenticated;
