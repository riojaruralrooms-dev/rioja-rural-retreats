-- RLS solo: public.apartamentos + public.reservas_pendientes
-- n8n (Service Role Secret) no se ve afectado. No toca otras tablas.

-- apartamentos
ALTER TABLE public.apartamentos ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "apartamentos_select_anon" ON public.apartamentos;
REVOKE ALL ON public.apartamentos FROM anon, authenticated;
GRANT ALL ON public.apartamentos TO service_role;

-- reservas_pendientes
ALTER TABLE public.reservas_pendientes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "reservas_pendientes_select_anon" ON public.reservas_pendientes;
DROP POLICY IF EXISTS "reservas_pendientes_insert_anon" ON public.reservas_pendientes;
REVOKE ALL ON public.reservas_pendientes FROM anon, authenticated;
GRANT ALL ON public.reservas_pendientes TO service_role;
