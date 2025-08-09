# Supabase Setup Instructions

## Step 1: Run the Data Migration

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Navigate to your project
3. Go to the SQL Editor tab
4. Copy and paste the contents of `database-data-migration.sql` 
5. Run the SQL query to populate your fees table

## Step 2: Verify Data

After running the migration, go to the "Table Editor" tab and check the `fees` table to ensure it has data.

## Step 3: Check Environment Variables

Make sure your `.env` file has the correct values:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Step 4: Test the Application

1. Run the development server: `npm run dev`
2. Open the browser developer console (F12)
3. Look for debug logs starting with "AppContext" and "ViewerInterface"
4. Check if fees are loading correctly

## Debugging Steps

If fees are still not showing:

1. Check the browser console for any error messages
2. Verify the Supabase connection in the Network tab
3. Check if the database tables are correctly named (should be "fees", "profiles", etc.)
4. Ensure Row Level Security policies allow reading from the fees table

## Manual Test Query

In Supabase SQL Editor, you can test the data with:

```sql
SELECT * FROM fees WHERE grade = 'Class 1' AND board = 'State';
```

This should return at least one result if the data migration was successful.
