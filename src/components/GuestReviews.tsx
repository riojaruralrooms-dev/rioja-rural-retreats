import { Star, ExternalLink } from "lucide-react";
import Marquee from "./Marquee";

interface Review {
  name: string;
  text: string;
}

interface ReviewGroup {
  title: string;
  reviews: Review[];
  buttonText: string;
  buttonUrl: string;
}

const ReviewCard = ({ name, text }: Review) => (
  <div className="flex-shrink-0 w-[340px] bg-card rounded-3xl p-6 border border-border/50 transition-shadow duration-300 hover:shadow-xl">
    <div className="flex gap-1 mb-3">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} className="fill-primary text-primary" />
      ))}
    </div>
    <p className="text-muted-foreground text-sm leading-relaxed mb-4 italic">
      "{text}"
    </p>
    <p className="text-foreground text-sm font-semibold">{name}</p>
  </div>
);

const reviewGroups: ReviewGroup[] = [
  {
    title: "Experiencias en El Sitio de Carmelo",
    reviews: [
      { name: "Elena Ramos", text: "Casa muy completa y acogedora con detalles especiales: la bodega natural y la gran mesa" },
      { name: "Tam Gonzalez", text: "Salón enorme y calado espectacular para tomar unos vinos. De los mejores alojamientos rurales" },
      { name: "Patricia Dominguez", text: "Irene demostró un trato inmejorable. Casa equipada con gran cocina industrial y un salón gigante" },
      { name: "Roberto Movellan", text: "Mantiene la esencia de una antigua bodega decorada con todo detalle. Simplemente excepcional" },
      { name: "Daniel BA", text: "Recomendable 100%. Éramos 18 con una silla de ruedas y sin ningún problema. Baño adaptado" },
      { name: "Marcia Rodríguez", text: "¡Increíble! El calao subterráneo es perfecto para tomar el vermú de manera diferente. Javi fue muy amable" },
    ],
    buttonText: "Contar mi experiencia en El Carmelo",
    buttonUrl: "https://search.google.com/local/writereview?placeid=ChIJ_7wcMnuHTw0Ri4mUZHDNcG0",
  },
  {
    title: "Descanso en El Tironcillo",
    reviews: [
      { name: "Florina Enache", text: "Apartamento muy bonito con vista al río. Me ha gustado tanto que en un mes repetiré" },
      { name: "Alberto Arranz", text: "Perfecta ubicación. Apartamento muy limpio y muy cómodo. Repetiremos. 👌🏻" },
      { name: "Johanna F.", text: "Camas muy confortables y el jacuzzi interior es un plus para relajarse. La terraza con vistas al río da mucha paz" },
      { name: "Luisa Pérez", text: "El dúplex es perfecto, amplio y mención especial a la limpieza. Estaba limpísimo" },
      { name: "Arantxa Portal", text: "Dúplex luminoso. Disfrutar del paisaje y el sonido del río desde la terraza es un lujazo" },
      { name: "José Luis Medrano", text: "Vistas magníficas. Desayunar oyendo el río de fondo es un lujo. Anfitriones muy amables" },
      { name: "Inés Casado", text: "El apartamento es estupendo, nuevo e impecable. La situación junto al río es idílica" },
    ],
    buttonText: "Contar mi experiencia en El Tironcillo",
    buttonUrl: "https://search.google.com/local/writereview?placeid=ChIJzYyc9JKHTw0RKWuBrEBlRBo",
  },
  {
    title: "Vuestra Huella en Rioja Rural Rooms",
    reviews: [
      { name: "Alba Nanclares", text: "La casa rural más chula en la que nos hemos hospedado. Súper equipada y la anfitriona un 10" },
      { name: "Moisés Hernández", text: "Apartamentos cómodos en un pueblo muy tranquilo, al lado del río. Admiten mascotas" },
      { name: "Monica Barrasa", text: "Ideal para familias. El entorno es espectacular con senderos, bares de pinchos y bodegas" },
      { name: "Ana B", text: "Perfecto para grupos grandes. Celebramos unas bodas de plata inolvidables. Nota sobresaliente" },
      { name: "María A. Núñez", text: "Casa muy acogedora y amplia. El dueño encantador, con total disponibilidad" },
      { name: "Ana S", text: "Limpio, tiene de todo, nuevo y excelente ubicación al lado del río para pasear" },
      { name: "Josep LY", text: "Limpieza impecable y cocina completamente equipada. Nos gustó el diseño y decoración" },
      { name: "Marta Lopez", text: "Casa de 10, acogedora y muy calentita. Habitaciones y baños muy limpios" },
    ],
    buttonText: "Dejar opinión general",
    buttonUrl: "https://share.google/OQTh0ahgy3380bkoH",
  },
];

const GuestReviews = () => {
  return (
    <section id="nuestros-huespedes" className="section-padding" style={{ backgroundColor: "#FCFBF9" }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">Nuestros Huéspedes</h2>
          <div className="divider-wine" />
          <p className="section-subtitle max-w-3xl">
            Vuestras palabras son la mejor forma de conocernos. Gracias por confiar en nosotros para vuestros días de descanso en la Rioja Alta.
          </p>
        </div>

        <div className="space-y-16">
          {reviewGroups.map((group, idx) => (
            <div key={idx}>
              <h3 className="font-serif text-2xl md:text-3xl text-center mb-8" style={{ color: "hsl(var(--charcoal))" }}>
                {group.title}
              </h3>

              <Marquee speed={group.reviews.length * 8} pauseOnHover>
                {group.reviews.map((review, i) => (
                  <ReviewCard key={i} {...review} />
                ))}
              </Marquee>

              <div className="text-center mt-8">
                <a
                  href={group.buttonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-wine inline-flex items-center gap-2 rounded-full"
                >
                  {group.buttonText}
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuestReviews;
