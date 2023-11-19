import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()


import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://hjayddtycnnofqguvbqh.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqYXlkZHR5Y25ub2ZxZ3V2YnFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUyMDc0OTEsImV4cCI6MjAxMDc4MzQ5MX0.KAxZbkUx6af_TVd3n0aWXAQWGH5OCgMPMgqkrqiS7Mg')