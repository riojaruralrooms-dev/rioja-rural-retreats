import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Users, Check, Phone, Mail } from "lucide-react";
import Layout from "@/components/Layout";
import { accommodations } from "@/data/accommodations";
import JacuzziCard from "@/components/JacuzziCard";

const AlojamientoDetalle = () => {
  const { id } = useParams<{ id: string }>();
  const accommodation = accommodations.find((a) => a.id === id);

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

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-end">
        <div className="absolute inset-0">
          <img
            src={accommodation.image}
            alt={accommodation.name}
            className="w-full h-full object-cover"
          />
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
          <div className="location-badge text-cream/80 mb-3">
            <MapPin size={16} />
            <span>{accommodation.location}</span>
          </div>
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
                  {accommodation.apartments
                    .filter((a) => a.id !== "apartamento-3")
                    .map((apartment) => (
                    <div
                      key={apartment.id}
                      className="bg-card rounded-sm p-6 md:p-8 shadow-soft border border-border"
                    >
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                        <h3 className="font-serif text-xl text-charcoal">
                          {apartment.name}
                        </h3>
                        <div className="capacity-badge">
                          <Users size={16} />
                          <span>
                            {apartment.capacity}
                            {apartment.capacityMax &&
                              ` (${apartment.capacityMax})`}
                          </span>
                        </div>
                      </div>
                      {apartment.description && (
                        <p className="text-wine text-sm mb-4 italic">
                          {apartment.description}
                        </p>
                      )}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {apartment.features.map((feature, idx) => (
                          <div key={idx} className="feature-item">
                            <Check className="feature-icon" size={16} />
                            <span className="text-sm text-muted-foreground">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Jacuzzi premium card - only for Tironcillo */}
                {accommodation.id === "virgen-tironcillo" && (
                  <div className="mt-8">
                    <JacuzziCard />
                  </div>
                )}
              </div>
            )}

            {/* Contact CTA */}
            <div className="bg-stone-light rounded-sm p-8 md:p-10 text-center">
              <h3 className="font-serif text-2xl text-charcoal mb-4">
                ¿Te interesa este alojamiento?
              </h3>
              <p className="text-muted-foreground mb-6">
                Contacta con nosotros para más información y reservas
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:+34640918592"
                  className="btn-wine flex items-center gap-2"
                >
                  <Phone size={18} />
                  640 918 592
                </a>
                <a
                  href="mailto:info@riojaruralrooms.com"
                  className="btn-outline-wine flex items-center gap-2"
                >
                  <Mail size={18} />
                  Enviar email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AlojamientoDetalle;
