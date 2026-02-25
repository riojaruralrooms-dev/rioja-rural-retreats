
CREATE TABLE public.reservas_directas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT NOT NULL,
  fecha_entrada DATE,
  fecha_salida DATE,
  adultos INTEGER DEFAULT 2,
  alojamiento_slug TEXT,
  mensaje TEXT,
  consentimiento BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Allow anonymous inserts (public contact form)
ALTER TABLE public.reservas_directas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON public.reservas_directas
  FOR INSERT WITH CHECK (true);

-- No select/update/delete for anon
CREATE POLICY "Only service role can read" ON public.reservas_directas
  FOR SELECT USING (false);
