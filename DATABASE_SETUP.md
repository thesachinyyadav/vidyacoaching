# Database Setup Instructions

## Setting up Supabase for Vidya Coaching

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up/log in and click "New Project"
3. Choose organization and fill project details:
   - **Name**: vidya-coaching
   - **Database Password**: (choose a strong password)
   - **Region**: Choose closest to your users
4. Wait for project creation (takes ~2 minutes)

### 2. Get Project Credentials
1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: https://xyz.supabase.co)
   - **Project API Key** (anon/public key)

### 3. Set Environment Variables
Update your `.env` file with the credentials:
```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 4. Create Database Schema
1. Go to **SQL Editor** in Supabase dashboard
2. Copy and paste this SQL code:

```sql
-- 1) Profiles table for user roles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text,
  email text,
  role text not null check (role in ('admin','viewer')) default 'viewer',
  created_at timestamptz default now()
);

-- Auto-create profile when user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, email, role)
  values (new.id, new.email, new.email, 'viewer');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create profile automatically
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2) Fees table
create table public.fees (
  id uuid primary key default gen_random_uuid(),
  grade text not null,
  board text not null,
  monthly_fee numeric not null,
  admission_fee numeric default 0,
  security_deposit numeric default 0,
  exam_fee numeric,
  lab_fee numeric,
  library_fee numeric,
  sports_fee numeric,
  misc_fee numeric,
  total_fee numeric not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Index for faster queries
create index fees_board_grade_idx on public.fees(board, grade);

-- 3) Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.fees enable row level security;

-- 4) Security Policies

-- Profiles: users can read their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Fees: everyone can read (for viewer interface)
create policy "Anyone can view fees"
  on public.fees for select
  using (true);

-- Fees: only admins can create
create policy "Only admins can create fees"
  on public.fees for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Fees: only admins can update
create policy "Only admins can update fees"
  on public.fees for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Fees: only admins can delete
create policy "Only admins can delete fees"
  on public.fees for delete
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );
```

3. Click **Run** to execute the SQL

### 5. Create Admin User
1. Go to **Authentication** → **Users**
2. Click **Invite a user** or **Add user**
3. Enter admin email (e.g., `admin@vidyacoaching.com`)
4. Set temporary password
5. After user is created, go to **Table Editor** → **profiles**
6. Find the user's row and change `role` from `viewer` to `admin`

### 6. Add Sample Data (Optional)
Go to **SQL Editor** and run:

```sql
-- Insert sample fees data
insert into public.fees (grade, board, monthly_fee, admission_fee, security_deposit, total_fee)
values 
  ('Class 1', 'State', 1000, 500, 1000, 1000),
  ('Class 1', 'CBSE', 1200, 500, 1000, 1200),
  ('Class 1', 'ICSE', 1500, 500, 1000, 1500),
  ('Class 10', 'State', 2000, 1000, 2000, 2000),
  ('Class 10', 'CBSE', 2500, 1000, 2000, 2500),
  ('Class 10', 'ICSE', 3000, 1000, 2000, 3000),
  ('Class 12', 'State', 3000, 1500, 3000, 3000),
  ('Class 12', 'CBSE', 3500, 1500, 3000, 3500),
  ('Class 12', 'ICSE', 4000, 1500, 3000, 4000);
```

### 7. Deploy to Netlify
1. Add environment variables to Netlify:
   - Go to your Netlify site dashboard
   - **Site settings** → **Build & deploy** → **Environment variables**
   - Add:
     - `VITE_SUPABASE_URL` = your project URL
     - `VITE_SUPABASE_ANON_KEY` = your anon key

### 8. Test Your Application
1. **Viewer Mode**: Should load fees from database
2. **Admin Login**: Use the admin email and password you created
3. **Admin Mode**: Should be able to add/edit/delete fees

### Database Features You Now Have:
- ✅ **Real-time database** with PostgreSQL
- ✅ **User authentication** with email/password
- ✅ **Role-based access** (admin/viewer)
- ✅ **Row Level Security** protecting your data
- ✅ **Automatic syncing** across all users
- ✅ **Free tier** supporting up to 50,000 monthly active users

### Troubleshooting:
- **Login not working**: Check if admin user exists and role is set to 'admin'
- **Data not loading**: Verify environment variables are set correctly
- **Permission denied**: Check RLS policies are applied correctly
- **Build errors**: Make sure all environment variables are set in both local `.env` and Netlify

Your application now has a full database backend! 🎉
