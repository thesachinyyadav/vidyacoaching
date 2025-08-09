-- Complete Supabase setup for Vidya Coaching authentication and management system

-- 1. Create profiles table (if not exists)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'viewer' CHECK (role IN ('admin', 'viewer')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create fees table (if not exists)
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
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fees ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS Policies for profiles table

-- Policy: Users can read their own profile
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

-- Policy: Users can update their own profile
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Policy: Admins can view all profiles
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles" ON public.profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Policy: Allow profile creation during signup
DROP POLICY IF EXISTS "Allow profile creation" ON public.profiles;
CREATE POLICY "Allow profile creation" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- 5. Create RLS Policies for fees table

-- Policy: Anyone can read fees (public information)
DROP POLICY IF EXISTS "Anyone can read fees" ON public.fees;
CREATE POLICY "Anyone can read fees" ON public.fees
    FOR SELECT TO PUBLIC USING (true);

-- Policy: Only admins can insert fees
DROP POLICY IF EXISTS "Admins can insert fees" ON public.fees;
CREATE POLICY "Admins can insert fees" ON public.fees
    FOR INSERT TO authenticated WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Policy: Only admins can update fees
DROP POLICY IF EXISTS "Admins can update fees" ON public.fees;
CREATE POLICY "Admins can update fees" ON public.fees
    FOR UPDATE TO authenticated USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Policy: Only admins can delete fees
DROP POLICY IF EXISTS "Admins can delete fees" ON public.fees;
CREATE POLICY "Admins can delete fees" ON public.fees
    FOR DELETE TO authenticated USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- 6. Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, username, role)
    VALUES (
        new.id,
        new.email,
        COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
        COALESCE(new.raw_user_meta_data->>'role', 'viewer')
    );
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 8. Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 9. Create triggers for updated_at
DROP TRIGGER IF EXISTS handle_updated_at_profiles ON public.profiles;
CREATE TRIGGER handle_updated_at_profiles
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS handle_updated_at_fees ON public.fees;
CREATE TRIGGER handle_updated_at_fees
    BEFORE UPDATE ON public.fees
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 10. Admin user creation
-- Note: You cannot directly insert into auth.users table
-- Instead, create admin users through one of these methods:
-- 
-- Method 1: Supabase Dashboard
-- Go to Authentication > Users > "Add User" and create admin@vidyacoaching.com
-- 
-- Method 2: After user registers, update their role:
-- UPDATE public.profiles SET role = 'admin' WHERE email = 'your-email@example.com';
-- 
-- Method 3: Use Supabase Auth API in your application
-- This is handled by the Register component in the React app

COMMENT ON TABLE public.profiles IS 'User profiles with roles and permissions';
COMMENT ON TABLE public.fees IS 'Fee structures for different grades and boards';
COMMENT ON COLUMN public.profiles.role IS 'User role: admin (full access) or viewer (read-only)';
COMMENT ON COLUMN public.fees.total_fee IS 'Total monthly fee excluding one-time charges';

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated, anon;
GRANT ALL ON public.profiles TO authenticated;
GRANT ALL ON public.fees TO authenticated;
GRANT SELECT ON public.fees TO anon;
