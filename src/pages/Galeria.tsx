import { useState } from "react";
import Layout from "@/components/Layout";

import heroImage from "@/assets/hero-rioja.jpg";
import tironcilloImg from "@/assets/apartamentos-tironcillo.jpg";
import floridaImg from "@/assets/apartamentos-florida.jpg";
import haroImg from "@/assets/apartamento-haro.jpg";
import villaOlivoImg from "@/assets/villa-olivo.jpg";
import bedroomImg from "@/assets/gallery-bedroom.jpg";
import terraceImg from "@/assets/gallery-terrace.jpg";
import jacuzziImg from "@/assets/gallery-jacuzzi.jpg";
import livingImg from "@/assets/gallery-living.jpg";
import bodegasImg from "@/assets/experiencia-bodegas.jpg";
import gastronomiaImg from "@/assets/experiencia-gastronomia.jpg";
import naturalezaImg from "@/assets/experiencia-naturaleza.jpg";
import parejaImg from "@/assets/experiencia-pareja.jpg";

const galleryImages = [
  { src: heroImage, alt: "Viñedos de La Rioja Alta", category: "Entorno" },
  { src: tironcilloImg, alt: "Apartamentos Virgen de Tironcillo", category: "Alojamientos" },
  { src: floridaImg, alt: "Apartamentos La Florida", category: "Alojamientos" },
  { src: haroImg, alt: "Apartamento en el centro de Haro", category: "Interiores" },
  { src: villaOlivoImg, alt: "Villa El Olivo", category: "Alojamientos" },
  { src: bedroomImg, alt: "Dormitorio acogedor", category: "Interiores" },
  { src: terraceImg, alt: "Terraza con vistas", category: "Exteriores" },
  { src: jacuzziImg, alt: "Jacuzzi con vistas", category: "Exteriores" },
  { src: livingImg, alt: "Salón con chimenea", category: "Interiores" },
  { src: bodegasImg, alt: "Bodega centenaria", category: "Entorno" },
  { src: gastronomiaImg, alt: "Gastronomía riojana", category: "Entorno" },
  { src: naturalezaImg, alt: "Rutas naturales", category: "Entorno" },
  { src: parejaImg, alt: "Experiencia romántica", category: "Entorno" },
];

const categories = ["Todos", "Alojamientos", "Interiores", "Exteriores", "Entorno"];

const Galeria = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages =
    selectedCategory === "Todos"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[350px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Galería Rioja Rural Rooms"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        <div className="relative z-10 text-center px-4 animate-fade-up">
          <h1 className="hero-title text-cream text-4xl md:text-5xl lg:text-6xl">
            Galería
          </h1>
          <div className="divider-wine !bg-cream/50 mt-6" />
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 text-sm font-medium tracking-wider uppercase rounded-sm transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-wine text-cream"
                    : "bg-secondary text-secondary-foreground hover:bg-wine/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredImages.map((image, index) => (
              <div
                key={index}
                className="gallery-item aspect-[4/3] cursor-pointer"
                onClick={() => setSelectedImage(image.src)}
              >
                <img src={image.src} alt={image.alt} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-cream/80 hover:text-cream text-4xl"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          <img
            src={selectedImage}
            alt="Imagen ampliada"
            className="max-w-full max-h-[90vh] object-contain rounded-sm"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </Layout>
  );
};

export default Galeria;
