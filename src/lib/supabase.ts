import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yrwpyemyvmaeuvalraux.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlyd3B5ZW15dm1hZXV2YWxyYXV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3NTYyMDIsImV4cCI6MjA4MDMzMjIwMn0.IO33B2YvLDBzj5E1YBk-euuEdrCzCDohr90RNWwsDO0'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Nome do bucket de imagens
export const IMAGES_BUCKET = 'Imagens'
