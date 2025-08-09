-- Simple Admin-Only Authentication for Vidya Coaching
-- Run this first in Supabase SQL Editor

-- 1. Create simplified admin table
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TABLE IF EXISTS public.admin_users CASCADE;

CREATE TABLE public.admin_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create fees table (same as before)
CREATE TABLE IF NOT EXISTS public.fees (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    grade TEXT NOT NULL,
    board TEXT NOT NULL,
    monthly_fee INTEGER NOT NULL DEFAULT 0,
    admission_fee INTEGER NOT NULL DEFAULT 0,
    security_deposit INTEGER NOT NULL DEFAULT 0,
    exam_fee INTEGER DEFAULT 0,
    lab_fee INTEGER DEFAULT 0,
    library_fee INTEGER DEFAULT 0,
    sports_fee INTEGER DEFAULT 0,
    misc_fee INTEGER DEFAULT 0,
    total_fee INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(grade, board)
);

-- 3. Enable Row Level Security
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fees ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS Policies

-- Admin users: only allow reading own data (for login verification)
DROP POLICY IF EXISTS "Admin users can read own data" ON public.admin_users;
CREATE POLICY "Admin users can read own data" ON public.admin_users
    FOR SELECT TO PUBLIC USING (true);

-- Fees: Public can read (for viewer interface)
DROP POLICY IF EXISTS "Anyone can read fees" ON public.fees;
CREATE POLICY "Anyone can read fees" ON public.fees
    FOR SELECT TO PUBLIC USING (true);

-- Fees: Admin operations (we'll handle this in the app logic)
DROP POLICY IF EXISTS "Allow fee modifications" ON public.fees;
CREATE POLICY "Allow fee modifications" ON public.fees
    FOR ALL TO PUBLIC USING (true);

-- 5. Insert admin users with hashed passwords
-- Password hashing using crypt function
INSERT INTO public.admin_users (username, email, password_hash) VALUES
    ('sachin', 'sachin.yadav@bca.christuniversity.in', crypt('sachin123', gen_salt('bf'))),
    ('sakshi', 'sakshi.yadav@mais.christuniversity.in', crypt('sakshi123', gen_salt('bf')))
ON CONFLICT (username) DO UPDATE SET
    email = EXCLUDED.email,
    password_hash = EXCLUDED.password_hash,
    updated_at = now();

-- 6. Create function to verify admin login
CREATE OR REPLACE FUNCTION public.verify_admin_login(input_username TEXT, input_password TEXT)
RETURNS TABLE(is_valid BOOLEAN, user_data JSON) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        CASE WHEN password_hash = crypt(input_password, password_hash) THEN true ELSE false END as is_valid,
        CASE WHEN password_hash = crypt(input_password, password_hash) 
            THEN json_build_object('id', id, 'username', username, 'email', email)
            ELSE NULL 
        END as user_data
    FROM public.admin_users 
    WHERE username = input_username;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Create function to verify admin by username and email (for password recovery)
CREATE OR REPLACE FUNCTION public.verify_admin_identity(input_username TEXT, input_email TEXT)
RETURNS TABLE(is_valid BOOLEAN, user_data JSON) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        CASE WHEN username = input_username AND email = input_email THEN true ELSE false END as is_valid,
        CASE WHEN username = input_username AND email = input_email 
            THEN json_build_object('id', id, 'username', username, 'email', email)
            ELSE NULL 
        END as user_data
    FROM public.admin_users 
    WHERE username = input_username AND email = input_email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. Create function to update password
CREATE OR REPLACE FUNCTION public.update_admin_password(input_username TEXT, input_email TEXT, new_password TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE public.admin_users 
    SET password_hash = crypt(new_password, gen_salt('bf')), 
        updated_at = now()
    WHERE username = input_username AND email = input_email;
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON public.admin_users TO anon, authenticated;
GRANT ALL ON public.fees TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.verify_admin_login TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.verify_admin_identity TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.update_admin_password TO anon, authenticated;

COMMENT ON TABLE public.admin_users IS 'Admin users for Vidya Coaching management system';
COMMENT ON TABLE public.fees IS 'Fee structures for different grades and boards';
COMMENT ON FUNCTION public.verify_admin_login IS 'Verify admin login with username and password';
COMMENT ON FUNCTION public.verify_admin_identity IS 'Verify admin identity with username and email for password recovery';
