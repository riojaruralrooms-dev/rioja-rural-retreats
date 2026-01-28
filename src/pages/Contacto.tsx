import { useState } from "react";
import Layout from "@/components/Layout";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { accommodations } from "@/data/accommodations";
import heroImage from "@/assets/hero-rioja.jpg";
import { useToast } from "@/hooks/use-toast";

const Contacto = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    alojamiento: "",
    mensaje: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Mensaje enviado",
      description:
        "Gracias por contactarnos. Te responderemos lo antes posible.",
    });

    setFormData({
      nombre: "",
      email: "",
      telefono: "",
      alojamiento: "",
      mensaje: "",
    });
    setIsSubmitting(false);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[350px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Contacto Rioja Rural Rooms"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        <div className="relative z-10 text-center px-4 animate-fade-up">
          <h1 className="hero-title text-cream text-4xl md:text-5xl lg:text-6xl">
            Contacto
          </h1>
          <div className="divider-wine !bg-cream/50 mt-6 mb-4" />
          <p className="text-cream/90 text-lg">Información y reservas</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div>
              <h2 className="font-serif text-3xl text-charcoal mb-8">
                ¿Cómo podemos ayudarte?
              </h2>
              <p className="text-muted-foreground mb-10 leading-relaxed">
                Estamos encantados de atenderte para cualquier consulta sobre
                disponibilidad, precios o información sobre nuestros
                alojamientos. No dudes en contactarnos.
              </p>

              <div className="space-y-6">
                <a
                  href="tel:+34640918592"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full bg-wine/10 flex items-center justify-center group-hover:bg-wine transition-colors">
                    <Phone className="text-wine group-hover:text-cream transition-colors" size={22} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Teléfono</p>
                    <p className="text-lg font-medium text-charcoal">
                      640 918 592
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:info@riojaruralrooms.com"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full bg-wine/10 flex items-center justify-center group-hover:bg-wine transition-colors">
                    <Mail className="text-wine group-hover:text-cream transition-colors" size={22} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="text-lg font-medium text-charcoal">
                      info@riojaruralrooms.com
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-wine/10 flex items-center justify-center">
                    <MapPin className="text-wine" size={22} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ubicación</p>
                    <p className="text-lg font-medium text-charcoal">
                      La Rioja Alta, España
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card rounded-sm p-8 md:p-10 shadow-soft border border-border">
              <h3 className="font-serif text-2xl text-charcoal mb-6">
                Solicitar información
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="nombre"
                    className="block text-sm font-medium text-charcoal-light mb-2"
                  >
                    Nombre *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-charcoal-light mb-2"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="telefono"
                    className="block text-sm font-medium text-charcoal-light mb-2"
                  >
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Tu teléfono"
                  />
                </div>

                <div>
                  <label
                    htmlFor="alojamiento"
                    className="block text-sm font-medium text-charcoal-light mb-2"
                  >
                    Alojamiento de interés
                  </label>
                  <select
                    id="alojamiento"
                    name="alojamiento"
                    value={formData.alojamiento}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="">Selecciona un alojamiento</option>
                    {accommodations.map((acc) => (
                      <option key={acc.id} value={acc.name}>
                        {acc.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="mensaje"
                    className="block text-sm font-medium text-charcoal-light mb-2"
                  >
                    Mensaje *
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    required
                    rows={4}
                    value={formData.mensaje}
                    onChange={handleChange}
                    className="form-input resize-none"
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-wine w-full flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    "Enviando..."
                  ) : (
                    <>
                      <Send size={18} />
                      Solicitar información
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contacto;
