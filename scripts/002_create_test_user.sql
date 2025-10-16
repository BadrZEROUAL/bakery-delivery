-- Create a test user account with confirmed email
-- Email: badr.zer@gmail.com
-- Password: Todo.Dodo01!!

-- First, we need to create the user in the auth.users table
-- Note: This uses Supabase's internal functions to properly hash the password

DO $$
DECLARE
  user_id uuid;
BEGIN
  -- Generate a UUID for the user
  user_id := gen_random_uuid();
  
  -- Insert into auth.users with confirmed email
  INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_app_meta_data,
    raw_user_meta_data,
    aud,
    role
  ) VALUES (
    user_id,
    '00000000-0000-0000-0000-000000000000',
    'badr.zer@gmail.com',
    crypt('Todo.Dodo01!!', gen_salt('bf')), -- Hash the password
    now(), -- Email confirmed immediately
    now(),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    'authenticated',
    'authenticated'
  )
  ON CONFLICT (email) DO NOTHING;
  
  -- Create corresponding profile in public.profiles
  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    role,
    created_at,
    updated_at
  ) VALUES (
    user_id,
    'badr.zer@gmail.com',
    'Test User',
    'customer',
    now(),
    now()
  )
  ON CONFLICT (id) DO NOTHING;
  
END $$;
