-- Revierte RLS en apartamentos y reservas_pendientes (estado anterior: RLS desactivado).
-- Ejecutar en Supabase → SQL Editor si quieres deshacer 20260521120000_rls_apartamentos_reservas.sql

-- Políticas que pudo crear la migración
DROP POLICY IF EXISTS "apartamentos_select_anon" ON public.apartamentos;
DROP POLICY IF EXISTS "reservas_pendientes_select_anon" ON public.reservas_pendientes;
DROP POLICY IF EXISTS "reservas_pendientes_insert_anon" ON public.reservas_pendientes;

-- Desactivar RLS (como antes del lint fix)
ALTER TABLE public.apartamentos DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservas_pendientes DISABLE ROW LEVEL SECURITY;

-- Permisos habituales en Supabase (API pública + service_role)
GRANT SELECT, INSERT, UPDATE, DELETE ON public.apartamentos TO anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.reservas_pendientes TO anon, authenticated, service_role;
