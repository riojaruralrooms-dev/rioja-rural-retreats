import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Users, Check, Phone, Mail } from "lucide-react";
import Layout from "@/components/Layout";
import { accommodations } from "@/data/accommodations";
import ApartmentListCard from "@/components/ApartmentListCard";
import { apartmentDetails } from "@/data/apartmentDetails";

const AlojamientoDetalle = () => {
  const { id } = useParams<{ id: string }>();
  const accommodation = accommodations.find((a) => a.id === id);
  const slideImages = accommodation?.images && accommodation.images.length > 1 ? accommodation.images : null;
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    if (!slideImages) return;
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % slideImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slideImages]);

  useEffect(() => {
    if (accommodation?.externalUrl) {
      window.location.replace(accommodation.externalUrl);
    }
  }, [accommodation?.externalUrl]);

  if (!accommodation) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-serif text-4xl text-charcoal mb-4">
              Alojamiento no encontrado
            </h1>
            <Link to="/alojamientos" className="btn-wine">
              Volver a alojamientos
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  if (accommodation.externalUrl) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Redirigiendo a {accommodation.name}…</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-end">
        <div className="absolute inset-0">
          {slideImages ? (
            slideImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${accommodation.name} ${idx + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                  idx === heroIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))
          ) : (
            <img src={accommodation.image} alt={accommodation.name} className="w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent" />
        </div>
        <div className="relative z-10 container mx-auto px-4 pb-12">
          <Link
            to="/alojamientos"
            className="inline-flex items-center gap-2 text-cream/80 hover:text-cream mb-6 transition-colors"
          >
            <ArrowLeft size={18} />
            Volver a alojamientos
          </Link>
          {accommodation.locationUrl ? (
            <a
              href={accommodation.locationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="location-badge text-cream/80 hover:text-cream mb-3 transition-colors"
            >
              <MapPin size={16} />
              <span className="underline underline-offset-2">{accommodation.location}</span>
            </a>
          ) : (
            <div className="location-badge text-cream/80 mb-3">
              <MapPin size={16} />
              <span>{accommodation.location}</span>
            </div>
          )}
          <h1 className="hero-title text-cream text-3xl md:text-4xl lg:text-5xl">
            {accommodation.name}
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Description */}
            <div className="mb-12">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {accommodation.fullDescription}
              </p>
            </div>

            {/* Capacity (for non-apartment accommodations) */}
            {accommodation.capacity && (
              <div className="mb-8">
                <div className="capacity-badge inline-flex">
                  <Users size={18} />
                  <span>Capacidad: {accommodation.capacity}</span>
                </div>
              </div>
            )}

            {/* Features (for non-apartment accommodations) */}
            {accommodation.features && (
              <div className="mb-12">
                <h2 className="font-serif text-2xl text-charcoal mb-6">
                  Características
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {accommodation.features.map((feature, idx) => (
                    <div key={idx} className="feature-item">
                      <Check className="feature-icon" size={20} />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Apartments List */}
            {accommodation.apartments && (
              <div className="mb-12">
                <h2 className="font-serif text-2xl text-charcoal mb-8">
                  Apartamentos disponibles
                </h2>
                <div className="space-y-6">
                  {apartmentDetails
                    .filter((a) => {
                      if (accommodation.id === "virgen-tironcillo") {
                        return ["duplex-1", "duplex-2", "jacuzzi"].includes(a.slug);
                      }
                      if (accommodation.id === "la-florida") {
                        return ["florida-1", "florida-2"].includes(a.slug);
                      }
                      if (accommodation.id === "centro-haro") {
                        return ["haro-centro"].includes(a.slug);
                      }
                      return false;
                    })
                    .map((apartment) => (
                      <ApartmentListCard key={apartment.slug} apartment={apartment} />
                    ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

    </Layout>
  );
};

export default AlojamientoDetalle;
