import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import ApartmentBookingSidebar from "@/components/ApartmentBookingSidebar";
import PetFriendlyBlock from "@/components/PetFriendlyBlock";
import ReviewCard from "@/components/ReviewCard";
import { apartmentDetails } from "@/data/apartmentDetails";

const featureIcons: Record<string, string> = {
  Jacuzzi: "🛁",
  "Cocina equipada": "🍳",
  "WiFi gratis": "📶",
  TV: "📺",
  Calefacción: "🔥",
  Terraza: "☀️",
  "Zona terraza": "☀️",
  "Aire acondicionado": "❄️",
  "Cuna disponible": "🍼",
  Cafetera: "☕",
  "Secador de pelo": "💇",
  "3 dormitorios": "🛏️",
  "2 baños completos": "🚿",
  Balcón: "🏠",
  "Check-in/out privado 24h": "🔑",
};

// Map slugs to their parent accommodation for back navigation
const slugToParent: Record<string, { path: string; label: string }> = {
  "duplex-1": { path: "/alojamientos/virgen-tironcillo", label: "Volver a alojamientos" },
  "duplex-2": { path: "/alojamientos/virgen-tironcillo", label: "Volver a alojamientos" },
  jacuzzi: { path: "/alojamientos/virgen-tironcillo", label: "Volver a alojamientos" },
  "florida-1": { path: "/alojamientos/la-florida", label: "Volver a alojamientos" },
  "florida-2": { path: "/alojamientos/la-florida", label: "Volver a alojamientos" },
  "haro-centro": { path: "/alojamientos/centro-haro", label: "Volver a alojamientos" },
};

const ApartmentDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const apt = apartmentDetails.find((a) => a.slug === slug);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!apt) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-serif text-4xl text-charcoal mb-4">Apartamento no encontrado</h1>
            <Link to="/alojamientos/virgen-tironcillo" className="btn-wine">Volver a alojamientos</Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          {/* Back link */}
          <Link
            to={slugToParent[slug || ""]?.path || "/alojamientos"}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-wine mb-8 transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            {slugToParent[slug || ""]?.label || "Volver a alojamientos"}
          </Link>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
            <h1 className="font-serif text-4xl md:text-5xl text-charcoal">{apt.title}</h1>
            <div className="inline-flex flex-col self-start md:self-auto items-end gap-1">
              <span
                className="inline-flex items-center bg-primary text-primary-foreground font-semibold px-5 py-2 rounded-full text-sm"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                Desde {apt.priceFrom} € / noche
              </span>
              {apt.priceTiers && apt.priceTiers.length > 0 && (
                <div className="flex gap-2 mt-1">
                  {apt.priceTiers.map((tier) => (
                    <div
                      key={tier.people}
                      className="flex flex-col items-center bg-secondary/50 rounded-lg px-3 py-1.5 min-w-[80px]"
                    >
                      <span className="text-[11px] text-muted-foreground">{tier.people}</span>
                      <span className="text-sm font-bold text-foreground">{tier.price}€</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
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
                        ? "ring-2 ring-primary ring-offset-2 opacity-100"
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
                <p className="text-muted-foreground leading-relaxed text-base">{apt.longDescription}</p>
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

              {/* Reviews */}
              {apt.reviews && apt.reviews.length > 0 && (
                <div>
                  <h2 className="font-serif text-2xl text-charcoal mb-6">Lo que dicen nuestros huéspedes</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {apt.reviews.map((review, idx) => (
                      <ReviewCard key={idx} name={review.name} text={review.text} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <ApartmentBookingSidebar apartmentSlug={apt.slug}>
              {apt.petFriendly && <PetFriendlyBlock />}
            </ApartmentBookingSidebar>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ApartmentDetailPage;
