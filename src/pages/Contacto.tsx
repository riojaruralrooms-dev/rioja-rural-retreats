import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Phone, Mail, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { accommodations } from "@/data/accommodations";
import heroImage from "@/assets/hero-rioja.jpg";

const Contacto = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    alojamiento: "",
    mensaje: "",
    consent: false,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // Pre-select accommodation from query params
  useEffect(() => {
    const accommodation = searchParams.get("accommodation");
    const source = searchParams.get("source");
    if (accommodation) {
      setFormData((prev) => ({
        ...prev,
        alojamiento: accommodation,
        mensaje: source === "direct_booking"
          ? `Me gustaría reservar con el descuento del 10% de reserva directa.`
          : prev.mensaje,
      }));
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const value = target instanceof HTMLInputElement && target.type === "checkbox" ? target.checked : target.value;
    setFormData({ ...formData, [target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const body = {
        name: formData.nombre,
        email: formData.email,
        phone: formData.telefono,
        accommodation: formData.alojamiento,
        message: formData.mensaje,
        source: searchParams.get("source") || "contact_form",
        consent: formData.consent,
        created_at: new Date().toISOString(),
      };

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Error al enviar");

      setStatus("success");
      setFormData({ nombre: "", email: "", telefono: "", alojamiento: "", mensaje: "", consent: false });
    } catch {
      setStatus("error");
    }
  };

  const allAccommodations = [
    ...accommodations.map((a) => a.name),
    "Apartamento con Jacuzzi",
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[350px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Contacto Rioja Rural Rooms" className="w-full h-full object-cover" />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        <div className="relative z-10 text-center px-4 animate-fade-up">
          <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl" style={{ color: "hsl(var(--cream))" }}>
            Contacto
          </h1>
          <div className="divider-wine !bg-cream/50 mt-6 mb-4" />
          <p className="text-lg" style={{ color: "hsl(var(--cream) / 0.9)" }}>Información y reservas</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div>
              <h2 className="font-serif text-3xl text-charcoal mb-8">¿Cómo podemos ayudarte?</h2>
              <p className="text-muted-foreground mb-10 leading-relaxed">
                Estamos encantados de atenderte para cualquier consulta sobre disponibilidad, precios o información sobre nuestros alojamientos. No dudes en contactarnos.
              </p>
              <div className="space-y-6">
                <a href="tel:+34640918592" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                    <Phone className="text-primary group-hover:text-primary-foreground transition-colors" size={22} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Teléfono</p>
                    <p className="text-lg font-medium text-charcoal">640 918 592</p>
                  </div>
                </a>
                <a href="mailto:info@riojaruralrooms.com" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                    <Mail className="text-primary group-hover:text-primary-foreground transition-colors" size={22} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="text-lg font-medium text-charcoal">info@riojaruralrooms.com</p>
                  </div>
                </a>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="text-primary" size={22} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ubicación</p>
                    <p className="text-lg font-medium text-charcoal">La Rioja Alta, España</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card rounded-sm p-8 md:p-10 border border-border" style={{ boxShadow: "var(--shadow-soft)" }}>
              <h3 className="font-serif text-2xl text-charcoal mb-6">Solicitar información</h3>

              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                  <CheckCircle size={48} className="text-accent" />
                  <p className="font-serif text-xl text-charcoal">Solicitud enviada</p>
                  <p className="text-muted-foreground text-sm">Te contactamos en breve.</p>
                  <button onClick={() => setStatus("idle")} className="btn-outline-wine mt-4 text-xs px-6 py-2">
                    Enviar otra consulta
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-charcoal-light mb-2">Nombre *</label>
                    <input type="text" id="nombre" name="nombre" required value={formData.nombre} onChange={handleChange} className="form-input" placeholder="Tu nombre" maxLength={100} />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-charcoal-light mb-2">Email *</label>
                    <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="form-input" placeholder="tu@email.com" maxLength={255} />
                  </div>
                  <div>
                    <label htmlFor="telefono" className="block text-sm font-medium text-charcoal-light mb-2">Teléfono</label>
                    <input type="tel" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} className="form-input" placeholder="Tu teléfono" maxLength={20} />
                  </div>
                  <div>
                    <label htmlFor="alojamiento" className="block text-sm font-medium text-charcoal-light mb-2">Alojamiento de interés</label>
                    <select id="alojamiento" name="alojamiento" value={formData.alojamiento} onChange={handleChange} className="form-input">
                      <option value="">Selecciona un alojamiento</option>
                      {allAccommodations.map((name) => (
                        <option key={name} value={name}>{name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="mensaje" className="block text-sm font-medium text-charcoal-light mb-2">Mensaje *</label>
                    <textarea id="mensaje" name="mensaje" required rows={4} value={formData.mensaje} onChange={handleChange} className="form-input resize-none" placeholder="¿En qué podemos ayudarte?" maxLength={1000} />
                  </div>
                  <div className="flex items-start gap-3">
                    <input type="checkbox" id="consent" name="consent" checked={formData.consent} onChange={handleChange} required className="mt-1 accent-primary" />
                    <label htmlFor="consent" className="text-xs text-muted-foreground leading-relaxed">
                      Acepto la <a href="/politica-privacidad" className="underline hover:text-primary">política de privacidad</a> y el tratamiento de mis datos para gestionar mi solicitud. *
                    </label>
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-2 text-destructive text-sm">
                      <AlertCircle size={16} />
                      Error al enviar. Inténtalo de nuevo.
                    </div>
                  )}

                  <button type="submit" disabled={status === "loading"} className="btn-wine w-full flex items-center justify-center gap-2 disabled:opacity-70">
                    {status === "loading" ? "Enviando..." : (<><Send size={18} />Solicitar información</>)}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contacto;
