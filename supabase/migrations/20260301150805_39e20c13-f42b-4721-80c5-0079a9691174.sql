
CREATE TABLE public.rate_limits (
  key TEXT PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 1,
  window_start TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Allow edge functions to read/write via anon key (no auth needed)
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access to rate_limits" ON public.rate_limits
  FOR ALL USING (true) WITH CHECK (true);

-- Auto-cleanup old entries every call isn't ideal, so add an index for cleanup
CREATE INDEX idx_rate_limits_window ON public.rate_limits (window_start);
