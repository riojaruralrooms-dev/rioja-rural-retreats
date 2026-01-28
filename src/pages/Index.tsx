import { Link } from "react-router-dom";
import { ArrowRight, Wine, Mountain, Users } from "lucide-react";
import Layout from "@/components/Layout";
import AccommodationCard from "@/components/AccommodationCard";
import ExperienceCard from "@/components/ExperienceCard";
import { accommodations } from "@/data/accommodations";

import heroImage from "@/assets/hero-rioja.jpg";
import bodegasImg from "@/assets/experiencia-bodegas.jpg";
import gastronomiaImg from "@/assets/experiencia-gastronomia.jpg";
import naturalezaImg from "@/assets/experiencia-naturaleza.jpg";
import parejaImg from "@/assets/experiencia-pareja.jpg";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="La Rioja Alta vineyards"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-up">
          <h1 className="hero-title text-cream mb-4">RIOJA RURAL ROOMS</h1>
          <p className="hero-subtitle text-cream/90 mb-6">
            Alojamientos con encanto en La Rioja Alta
          </p>
          <div className="divider-wine !bg-cream/50 mb-8" />
          <p className="text-cream/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Conjunto de alojamientos situados en enclaves privilegiados de La
            Rioja Alta, pensados para disfrutar del descanso, la naturaleza, el
            vino y la tranquilidad.
          </p>
          <Link to="/alojamientos" className="btn-hero">
            Ver alojamientos
          </Link>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-cream/50 rounded-full flex items-start justify-center pt-2">
            <div className="w-1 h-2 bg-cream/70 rounded-full" />
          </div>
        </div>
      </section>

      {/* Accommodations Section */}
      <section id="alojamientos" className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Nuestros Alojamientos</h2>
            <div className="divider-wine" />
            <p className="section-subtitle">
              Descubre nuestra selección de alojamientos rurales, cada uno con
              su propio encanto y carácter único.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {accommodations.map((accommodation) => (
              <AccommodationCard
                key={accommodation.id}
                id={accommodation.id}
                name={accommodation.name}
                location={accommodation.location}
                description={accommodation.description}
                image={accommodation.image}
                buttonText={accommodation.buttonText}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Experiences Preview Section */}
      <section className="section-padding bg-stone-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Experiencias en La Rioja Alta</h2>
            <div className="divider-wine" />
            <p className="section-subtitle">
              Descubre una ubicación privilegiada rodeada de bodegas
              centenarias, gastronomía, rutas naturales y experiencias únicas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ExperienceCard
              title="Enoturismo"
              description="Visitas a bodegas centenarias y catas de vino"
              image={bodegasImg}
              icon={<Wine size={28} />}
            />
            <ExperienceCard
              title="Gastronomía"
              description="Saborea la cocina tradicional riojana"
              image={gastronomiaImg}
              icon={<Wine size={28} />}
            />
            <ExperienceCard
              title="Naturaleza"
              description="Rutas y paseos junto al río"
              image={naturalezaImg}
              icon={<Mountain size={28} />}
            />
            <ExperienceCard
              title="En pareja"
              description="Escapadas románticas entre viñedos"
              image={parejaImg}
              icon={<Users size={28} />}
            />
          </div>

          <div className="text-center mt-12">
            <Link
              to="/experiencias"
              className="inline-flex items-center gap-2 text-wine font-medium tracking-wide uppercase text-sm hover:gap-3 transition-all duration-300"
            >
              Descubrir experiencias
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-wine relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="font-serif text-3xl md:text-4xl text-cream mb-6">
            ¿Listo para descubrir La Rioja Alta?
          </h2>
          <p className="text-cream/80 text-lg mb-8 max-w-xl mx-auto">
            Reserva tu estancia y vive una experiencia inolvidable rodeado de
            naturaleza, vino y tranquilidad.
          </p>
          <Link to="/contacto" className="btn-hero">
            Contactar ahora
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
