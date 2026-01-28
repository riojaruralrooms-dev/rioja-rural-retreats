import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const WEBSITE_CONTEXT = `Eres el asistente virtual de RIOJA RURAL ROOMS, un conjunto de alojamientos turísticos con encanto situados en La Rioja Alta, España.

INFORMACIÓN DE LA EMPRESA:
- Nombre: Rioja Rural Rooms
- Teléfono: 640 918 592
- Email: info@riojaruralrooms.com
- Ubicación: La Rioja Alta, España

ALOJAMIENTOS DISPONIBLES:

1. APARTAMENTOS VIRGEN DE TIRONCILLO (Cuzcurrita de Río Tirón)
   - Ubicación: Junto al río Tirón, a 8 km de Haro
   - Características: Apartamentos totalmente equipados con aire acondicionado
   - Tipos disponibles:
     * Apartamento Dúplex 1: 4 personas (hasta 6 con supletoria)
     * Apartamento Dúplex 2: 4 personas (hasta 6 con supletoria)
     * Apartamento 3: 4 personas, con jacuzzi, amplia terraza y vistas al río

2. APARTAMENTOS LA FLORIDA (Casalarreina)
   - Ubicación: Plaza La Florida, centro del pueblo, a 4 km de Haro
   - Características: Ubicación céntrica y privilegiada
   - Tipos disponibles:
     * Apartamento Primer Piso: 4 personas (hasta 6)
     * Apartamento Segundo Piso: 4 personas (hasta 6)
     * Apartamento Bajo: 2 personas (hasta 4) - pendiente de licencia turística

3. APARTAMENTO EN EL CENTRO DE HARO
   - Ubicación: Pleno centro de Haro, cerca de Plaza de la Paz y casco antiguo
   - Características: Amplio, 2 baños, cerca del barrio de bodegas centenarias
   - Capacidad: 6 personas

4. VILLA TURÍSTICA "EL OLIVO" (Cuzcurrita de Río Tirón)
   - Ubicación: A 8 km de Haro
   - Características: 4 habitaciones, salón con chimenea, cocina, 2 baños
   - Exterior: Jardín, piscina, barbacoa y billar
   - Capacidad: 8 personas

EXPERIENCIAS EN LA ZONA:
- Enoturismo: Visitas a bodegas centenarias, catas de vino
- Gastronomía: Cocina tradicional riojana
- Naturaleza: Rutas junto al río, senderismo
- En pareja/familia: Escapadas románticas entre viñedos

Tu objetivo es ayudar a los visitantes con información sobre los alojamientos, disponibilidad, precios, experiencias en la zona y proceso de reserva. Sé amable, profesional y responde en español. Si no sabes algo específico como precios o disponibilidad exacta, sugiere contactar directamente por teléfono o email.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Received chat request with", messages.length, "messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: WEBSITE_CONTEXT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Demasiadas solicitudes, por favor espera un momento." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Servicio temporalmente no disponible." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Error del servicio de IA" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Error desconocido" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
