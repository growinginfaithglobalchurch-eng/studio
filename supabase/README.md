# Supabase Database Migrations

This directory contains the SQL files that define your database schema. The migration files are designed to be run in order.

## How to Apply the Migrations

1.  Go to your Supabase project dashboard.
2.  Navigate to the **SQL Editor** section.
3.  Open `migrations/0001_initial_schema.sql`, copy its content, paste it into the Supabase SQL Editor, and click **"Run"**.
4.  Once the first script is successful, open `migrations/0002_add_content_tables.sql`, copy its content, paste it into the editor, and click **"Run"**.

These scripts will create all the necessary tables and policies for the application. They are safe to run multiple times.
