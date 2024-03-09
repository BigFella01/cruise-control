import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hewjjsjwsuexxlyyexsz.supabase.co";
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhld2pqc2p3c3VleHhseXlleHN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc4Mzk1NTAsImV4cCI6MjAyMzQxNTU1MH0.kCHKROH35oiIQCbZ4CF9KtAWpmQYWHXq32jkFbkASr4';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase