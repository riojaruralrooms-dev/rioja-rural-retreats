import Layout from "@/components/Layout";
import AccommodationCard from "@/components/AccommodationCard";
import { accommodations } from "@/data/accommodations";
import heroImage from "@/assets/hero-rioja.jpg";

const Alojamientos = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="La Rioja Alta"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        <div className="relative z-10 text-center px-4 animate-fade-up">
          <h1 className="hero-title text-cream text-4xl md:text-5xl lg:text-6xl">
            Nuestros Alojamientos
          </h1>
          <div className="divider-wine !bg-cream/50 mt-6" />
        </div>
      </section>

      {/* Accommodations List */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="section-subtitle text-lg">
              Todos nuestros alojamientos están situados en ubicaciones
              privilegiadas de La Rioja Alta, cerca de Haro, la capital del vino
              de Rioja.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {accommodations.filter((a) => !a.hidden).map((accommodation) => (
              <AccommodationCard
                key={accommodation.id}
                id={accommodation.id}
                name={accommodation.name}
                location={accommodation.location}
                description={accommodation.description}
                image={accommodation.image}
                images={accommodation.images}
                buttonText={accommodation.buttonText}
                externalUrl={accommodation.externalUrl}
                note={accommodation.note}
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Alojamientos;
