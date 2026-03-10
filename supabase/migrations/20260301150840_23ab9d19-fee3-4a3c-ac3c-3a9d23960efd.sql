
-- Drop the overly permissive policy
DROP POLICY "Allow all access to rate_limits" ON public.rate_limits;

-- Only allow service_role to access this table (edge functions use service role)
CREATE POLICY "Service role only" ON public.rate_limits
  FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
