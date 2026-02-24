import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, Users, Minus, Plus } from "lucide-react";
import Layout from "@/components/Layout";
import { jacuzziApartment } from "@/data/jacuzziApartment";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

const ApartamentoJacuzzi = () => {
  const apt = jacuzziApartment;
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [adults, setAdults] = useState(2);

  const handleBooking = () => {
    if (!checkin || !checkout) {
      toast({ title: "Selecciona las fechas de entrada y salida", variant: "destructive" });
      return;
    }
    if (checkout <= checkin) {
      toast({ title: "La fecha de salida debe ser posterior a la de entrada", variant: "destructive" });
      return;
    }
    const url = `${apt.baseBookingUrl}?checkin=${checkin}&checkout=${checkout}&group_adults=${adults}&submit=`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const featureIcons: Record<string, string> = {
    "Jacuzzi": "🛁",
    "Cocina equipada": "🍳",
    "WiFi gratis": "📶",
    "TV": "📺",
    "Calefacción": "🔥",
    "Terraza": "☀️",
    "Aire acondicionado": "❄️",
  };

  return (
    <Layout>
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          {/* Back link */}
          <Link
            to="/alojamientos/virgen-tironcillo"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-wine mb-8 transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            Volver a alojamientos
          </Link>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
            <h1 className="font-serif text-4xl md:text-5xl text-charcoal">
              {apt.title}
            </h1>
            <span className="inline-flex self-start md:self-auto items-center bg-orange-500 text-white font-semibold px-5 py-2 rounded-full text-sm shadow-lg">
              Desde {apt.priceFrom} € / noche
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left: Gallery + Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10]" style={{ boxShadow: "var(--shadow-medium)" }}>
                <img
                  src={apt.gallery[selectedImage].src}
                  alt={apt.gallery[selectedImage].alt}
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {apt.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative rounded-xl overflow-hidden aspect-square transition-all duration-300 ${
                      selectedImage === idx
                        ? "ring-2 ring-orange-500 ring-offset-2 opacity-100"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Description */}
              <div>
                <h2 className="font-serif text-2xl text-charcoal mb-4">Sobre este apartamento</h2>
                <p className="text-muted-foreground leading-relaxed text-base">
                  {apt.longDescription}
                </p>
              </div>

              {/* Features */}
              <div>
                <h2 className="font-serif text-2xl text-charcoal mb-6">Servicios y equipamiento</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {apt.features.map((f) => (
                    <div key={f} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                      <span className="text-lg">{featureIcons[f] || "✓"}</span>
                      <span className="text-sm font-medium text-foreground">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Booking panel */}
            <div className="lg:col-span-1">
              <div className="sticky top-48 bg-card rounded-2xl p-6 md:p-8 border border-border" style={{ boxShadow: "var(--shadow-elevated)" }}>
                <h3 className="font-serif text-xl text-charcoal mb-1">Reserva tu estancia</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Desde <span className="font-semibold text-orange-500">{apt.priceFrom} €</span> / noche
                </p>

                <div className="space-y-4">
                  {/* Checkin */}
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                      Entrada
                    </label>
                    <input
                      type="date"
                      value={checkin}
                      onChange={(e) => setCheckin(e.target.value)}
                      min={format(new Date(), "yyyy-MM-dd")}
                      className="form-input rounded-lg text-sm"
                    />
                  </div>

                  {/* Checkout */}
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                      Salida
                    </label>
                    <input
                      type="date"
                      value={checkout}
                      onChange={(e) => setCheckout(e.target.value)}
                      min={checkin || format(new Date(), "yyyy-MM-dd")}
                      className="form-input rounded-lg text-sm"
                    />
                  </div>

                  {/* Adults */}
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                      Adultos
                    </label>
                    <div className="flex items-center gap-4 border rounded-lg px-4 py-2.5" style={{ borderColor: "hsl(var(--border))" }}>
                      <button
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="p-1 rounded-full hover:bg-secondary transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="flex-1 text-center font-medium">{adults}</span>
                      <button
                        onClick={() => setAdults(Math.min(6, adults + 1))}
                        className="p-1 rounded-full hover:bg-secondary transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={handleBooking}
                    className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm tracking-wider uppercase rounded-lg transition-colors duration-300 mt-2"
                    style={{ boxShadow: "0 4px 14px -3px rgba(249,115,22,0.4)" }}
                  >
                    Ver disponibilidad
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ApartamentoJacuzzi;
