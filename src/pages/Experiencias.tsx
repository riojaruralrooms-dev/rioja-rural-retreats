import Layout from "@/components/Layout";
import ExperienceCard from "@/components/ExperienceCard";
import { Wine, Utensils, Mountain, Heart } from "lucide-react";

import bodegasImg from "@/assets/experiencia-bodegas.jpg";
import gastronomiaImg from "@/assets/experiencia-gastronomia.jpg";
import naturalezaImg from "@/assets/experiencia-naturaleza.jpg";
import parejaImg from "@/assets/experiencia-pareja.jpg";
import heroImage from "@/assets/hero-rioja.jpg";

const experiences = [
  {
    title: "Enoturismo",
    description:
      "Descubre las bodegas centenarias de Haro y la Rioja Alta. Visitas guiadas, catas de vino, y la historia del mejor vino del mundo. A pocos kilómetros de todos nuestros alojamientos.",
    image: bodegasImg,
    icon: <Wine size={32} />,
  },
  {
    title: "Gastronomía local",
    description:
      "Saborea la auténtica cocina riojana: patatas a la riojana, chuletillas al sarmiento, pimientos asados y los mejores productos de la huerta. Restaurantes tradicionales y modernos.",
    image: gastronomiaImg,
    icon: <Utensils size={32} />,
  },
  {
    title: "Naturaleza y rutas",
    description:
      "Paseos junto al río Tirón, rutas entre viñedos, senderismo en la Sierra de la Demanda. Un entorno natural privilegiado para desconectar y respirar aire puro.",
    image: naturalezaImg,
    icon: <Mountain size={32} />,
  },
  {
    title: "Experiencias en pareja o familia",
    description:
      "Escapadas románticas entre viñedos, vacaciones en familia con piscina y jardín, o simplemente disfrutar de la tranquilidad. Cada alojamiento ofrece una experiencia única.",
    image: parejaImg,
    icon: <Heart size={32} />,
  },
];

const Experiencias = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Experiencias en La Rioja Alta"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto animate-fade-up">
          <h1 className="hero-title text-cream text-4xl md:text-5xl lg:text-6xl">
            Experiencias
          </h1>
          <div className="divider-wine !bg-cream/50 mt-6 mb-6" />
          <p className="text-cream/90 text-lg md:text-xl">
            Descubre La Rioja Alta desde una ubicación privilegiada
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Bodegas centenarias, gastronomía, rutas naturales, paseos junto al
              río, enoturismo y experiencias únicas. Todo esto te espera en La
              Rioja Alta, a pocos minutos de cualquiera de nuestros
              alojamientos.
            </p>
          </div>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="pb-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {experiences.map((experience, index) => (
              <div key={index} className="group">
                <div className="relative overflow-hidden rounded-sm h-80 md:h-96 mb-6">
                  <img
                    src={experience.image}
                    alt={experience.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="text-cream/80 mb-3">{experience.icon}</div>
                    <h3 className="font-serif text-2xl md:text-3xl text-cream">
                      {experience.title}
                    </h3>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed px-2">
                  {experience.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-stone-light">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-6">
            Vive La Rioja Alta
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Reserva tu alojamiento y déjate sorprender por todo lo que esta
            tierra tiene para ofrecerte.
          </p>
          <a href="/contacto" className="btn-wine">
            Reservar ahora
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Experiencias;
