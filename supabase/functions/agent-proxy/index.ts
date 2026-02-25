import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const AGENT_URL = "https://ovyqztmnmpvwpiauxubq.supabase.co/functions/v1/agent";
const AGENT_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92eXF6dG1ubXB2d3BpYXV4dWJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5MzUxNDQsImV4cCI6MjA4NzUxMTE0NH0.nlOgHQSS5yDNXZEkPRUjqwc38rHhJQaIX6NOsv72QHI";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.text();

    const res = await fetch(AGENT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: AGENT_KEY,
        Authorization: `Bearer ${AGENT_KEY}`,
      },
      body,
    });

    const data = await res.text();

    return new Response(data, {
      status: res.status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Proxy error:", e);
    return new Response(JSON.stringify({ error: "Proxy error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
