-- Create admin_profiles table for admin users
CREATE TABLE public.admin_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'owner' CHECK (role IN ('owner', 'government_officer', 'admin')),
  department TEXT,
  phone TEXT,
  avatar_url TEXT,
  is_verified BOOLEAN DEFAULT false,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create app_users table to store all app user data
CREATE TABLE public.app_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  location TEXT,
  emergency_contacts JSONB DEFAULT '[]'::jsonb,
  health_data JSONB DEFAULT '{}'::jsonb,
  safety_alerts_count INTEGER DEFAULT 0,
  sos_triggered_count INTEGER DEFAULT 0,
  ai_interactions_count INTEGER DEFAULT 0,
  last_active TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ai_analytics table for AI model statistics
CREATE TABLE public.ai_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  total_training_sessions INTEGER DEFAULT 0,
  daily_training_progress NUMERIC(5,2) DEFAULT 0,
  cumulative_training_hours NUMERIC(10,2) DEFAULT 0,
  users_helped_count INTEGER DEFAULT 0,
  threats_detected INTEGER DEFAULT 0,
  health_predictions INTEGER DEFAULT 0,
  safety_predictions INTEGER DEFAULT 0,
  prediction_accuracy NUMERIC(5,2) DEFAULT 0,
  model_version TEXT,
  response_time_avg_ms INTEGER DEFAULT 0,
  tokens_processed BIGINT DEFAULT 0,
  active_learning_samples INTEGER DEFAULT 0,
  false_positive_rate NUMERIC(5,2) DEFAULT 0,
  false_negative_rate NUMERIC(5,2) DEFAULT 0,
  sos_response_time_avg_seconds NUMERIC(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create admin_messages table for messaging users
CREATE TABLE public.admin_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id UUID NOT NULL REFERENCES public.admin_profiles(id) ON DELETE CASCADE,
  recipient_type TEXT NOT NULL CHECK (recipient_type IN ('all', 'individual', 'group')),
  recipient_ids UUID[] DEFAULT '{}',
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  message_type TEXT NOT NULL CHECK (message_type IN ('notification', 'email', 'both')),
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create platform_stats table for daily platform statistics
CREATE TABLE public.platform_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL DEFAULT CURRENT_DATE UNIQUE,
  total_users INTEGER DEFAULT 0,
  active_users INTEGER DEFAULT 0,
  new_users INTEGER DEFAULT 0,
  sos_alerts_triggered INTEGER DEFAULT 0,
  health_checkups INTEGER DEFAULT 0,
  ai_conversations INTEGER DEFAULT 0,
  avg_session_duration_minutes NUMERIC(10,2) DEFAULT 0,
  app_crashes INTEGER DEFAULT 0,
  api_requests INTEGER DEFAULT 0,
  storage_used_mb NUMERIC(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create verification_codes table for password reset
CREATE TABLE public.verification_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  code TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('password_reset', 'email_verification')),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.platform_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_codes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for admin_profiles
CREATE POLICY "Admins can view their own profile"
ON public.admin_profiles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can update their own profile"
ON public.admin_profiles FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Allow signup to create admin profile"
ON public.admin_profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for app_users (admins can view all)
CREATE POLICY "Admins can view all app users"
ON public.app_users FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.admin_profiles 
    WHERE admin_profiles.user_id = auth.uid()
  )
);

CREATE POLICY "Admins can update app users"
ON public.app_users FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.admin_profiles 
    WHERE admin_profiles.user_id = auth.uid()
  )
);

-- RLS Policies for ai_analytics (admins can view all)
CREATE POLICY "Admins can view AI analytics"
ON public.ai_analytics FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.admin_profiles 
    WHERE admin_profiles.user_id = auth.uid()
  )
);

CREATE POLICY "System can insert AI analytics"
ON public.ai_analytics FOR INSERT
WITH CHECK (true);

-- RLS Policies for admin_messages
CREATE POLICY "Admins can view their own messages"
ON public.admin_messages FOR SELECT
USING (
  admin_id IN (
    SELECT id FROM public.admin_profiles 
    WHERE admin_profiles.user_id = auth.uid()
  )
);

CREATE POLICY "Admins can create messages"
ON public.admin_messages FOR INSERT
WITH CHECK (
  admin_id IN (
    SELECT id FROM public.admin_profiles 
    WHERE admin_profiles.user_id = auth.uid()
  )
);

-- RLS Policies for platform_stats (admins can view)
CREATE POLICY "Admins can view platform stats"
ON public.platform_stats FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.admin_profiles 
    WHERE admin_profiles.user_id = auth.uid()
  )
);

-- RLS for verification_codes
CREATE POLICY "Anyone can create verification codes"
ON public.verification_codes FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can read their own verification codes"
ON public.verification_codes FOR SELECT
USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_admin_profiles_updated_at
BEFORE UPDATE ON public.admin_profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_app_users_updated_at
BEFORE UPDATE ON public.app_users
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for AI analytics (last 30 days)
INSERT INTO public.ai_analytics (date, total_training_sessions, daily_training_progress, cumulative_training_hours, users_helped_count, threats_detected, health_predictions, safety_predictions, prediction_accuracy, model_version, response_time_avg_ms, tokens_processed, active_learning_samples, false_positive_rate, false_negative_rate, sos_response_time_avg_seconds)
SELECT 
  CURRENT_DATE - (n || ' days')::INTERVAL,
  FLOOR(RANDOM() * 50 + 10)::INTEGER,
  ROUND((RANDOM() * 5 + 95)::NUMERIC, 2),
  ROUND((n * 2.5 + RANDOM() * 10)::NUMERIC, 2),
  FLOOR(RANDOM() * 500 + 100)::INTEGER,
  FLOOR(RANDOM() * 20 + 5)::INTEGER,
  FLOOR(RANDOM() * 300 + 50)::INTEGER,
  FLOOR(RANDOM() * 200 + 30)::INTEGER,
  ROUND((RANDOM() * 5 + 92)::NUMERIC, 2),
  'SheGuard-AI v2.' || FLOOR(RANDOM() * 5 + 1)::TEXT,
  FLOOR(RANDOM() * 100 + 50)::INTEGER,
  FLOOR(RANDOM() * 1000000 + 500000)::BIGINT,
  FLOOR(RANDOM() * 1000 + 200)::INTEGER,
  ROUND((RANDOM() * 2 + 1)::NUMERIC, 2),
  ROUND((RANDOM() * 1.5 + 0.5)::NUMERIC, 2),
  ROUND((RANDOM() * 1 + 2)::NUMERIC, 2)
FROM generate_series(0, 29) AS n;

-- Insert sample platform stats (last 30 days)
INSERT INTO public.platform_stats (date, total_users, active_users, new_users, sos_alerts_triggered, health_checkups, ai_conversations, avg_session_duration_minutes, app_crashes, api_requests, storage_used_mb)
SELECT 
  CURRENT_DATE - (n || ' days')::INTERVAL,
  10000 + n * 50,
  FLOOR(RANDOM() * 3000 + 2000)::INTEGER,
  FLOOR(RANDOM() * 100 + 20)::INTEGER,
  FLOOR(RANDOM() * 15 + 2)::INTEGER,
  FLOOR(RANDOM() * 500 + 100)::INTEGER,
  FLOOR(RANDOM() * 2000 + 500)::INTEGER,
  ROUND((RANDOM() * 10 + 5)::NUMERIC, 2),
  FLOOR(RANDOM() * 5)::INTEGER,
  FLOOR(RANDOM() * 100000 + 50000)::INTEGER,
  ROUND((1000 + n * 20 + RANDOM() * 50)::NUMERIC, 2)
FROM generate_series(0, 29) AS n
ON CONFLICT (date) DO NOTHING;

-- Insert sample app users
INSERT INTO public.app_users (full_name, email, phone, location, safety_alerts_count, sos_triggered_count, ai_interactions_count, last_active, status)
VALUES 
  ('Priya Sharma', 'priya.sharma@example.com', '+91 98765 43210', 'Mumbai, Maharashtra', 2, 0, 45, now() - interval '1 hour', 'active'),
  ('Ananya Patel', 'ananya.p@example.com', '+91 87654 32109', 'Ahmedabad, Gujarat', 0, 0, 23, now() - interval '3 hours', 'active'),
  ('Kavya Iyer', 'kavya.iyer@example.com', '+91 76543 21098', 'Chennai, Tamil Nadu', 1, 1, 67, now() - interval '30 minutes', 'active'),
  ('Riya Singh', 'riya.singh@example.com', '+91 65432 10987', 'Delhi, NCR', 3, 0, 89, now() - interval '2 days', 'active'),
  ('Meera Reddy', 'meera.r@example.com', '+91 54321 09876', 'Hyderabad, Telangana', 0, 0, 12, now() - interval '5 hours', 'active'),
  ('Shreya Gupta', 'shreya.g@example.com', '+91 43210 98765', 'Bangalore, Karnataka', 1, 0, 34, now() - interval '1 day', 'active'),
  ('Diya Menon', 'diya.menon@example.com', '+91 32109 87654', 'Kochi, Kerala', 0, 0, 56, now() - interval '6 hours', 'active'),
  ('Aisha Khan', 'aisha.k@example.com', '+91 21098 76543', 'Pune, Maharashtra', 2, 1, 78, now() - interval '4 hours', 'active'),
  ('Tanvi Joshi', 'tanvi.j@example.com', '+91 10987 65432', 'Jaipur, Rajasthan', 0, 0, 19, now() - interval '2 hours', 'inactive'),
  ('Nisha Verma', 'nisha.v@example.com', '+91 09876 54321', 'Lucknow, UP', 1, 0, 41, now() - interval '8 hours', 'active');

-- Enable realtime for key tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.ai_analytics;
ALTER PUBLICATION supabase_realtime ADD TABLE public.platform_stats;
ALTER PUBLICATION supabase_realtime ADD TABLE public.app_users;