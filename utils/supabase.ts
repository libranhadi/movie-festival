import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://uibxdcuorpefrqlscojx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpYnhkY3VvcnBlZnJxbHNjb2p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1OTE3ODMsImV4cCI6MjA1NTE2Nzc4M30.1khBtixBe5-pJrbzm5jlrxEE_2RCtAmuCQSiC5GVzCU' 
);
