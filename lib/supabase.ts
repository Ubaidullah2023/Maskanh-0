import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

// Get the Supabase URL and key from app.config.js
const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl || 'https://efyqjrpxkrmmmydtoxwj.supabase.co';
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmeXFqcnB4a3JtbW15ZHRveHdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1MTk1NTIsImV4cCI6MjA2MjA5NTU1Mn0.gMBi9n0zawvSbAQ2AbqulPVwSm7yYUN6cFJ1bW3os30';

// Create the Supabase client with workarounds for React Native
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
}); 