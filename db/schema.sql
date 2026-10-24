CREATE TABLE IF NOT EXISTS public.scores (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username text NOT NULL CHECK (length(btrim(username)) > 0),
  time double precision NOT NULL CHECK (time > 0),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS scores_time_idx ON public.scores (time);
