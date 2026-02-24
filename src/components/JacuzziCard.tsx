import { Link } from "react-router-dom";
import { jacuzziApartment } from "@/data/jacuzziApartment";

const JacuzziCard = () => {
  const apt = jacuzziApartment;

  return (
    <div className="group relative bg-card rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1"
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      {/* Price badge */}
      <div className="absolute top-4 right-4 z-10 bg-orange-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
        Desde {apt.priceFrom},00 € / noche
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="relative md:w-1/2 h-64 md:h-auto min-h-[280px] overflow-hidden">
          <img
            src={apt.coverImage}
            alt={apt.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-3">
              {apt.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-5 text-sm">
              {apt.shortDescription}
            </p>

            {/* Feature chips */}
            <div className="flex flex-wrap gap-2 mb-6">
              {apt.features.map((f) => (
                <span
                  key={f}
                  className="text-xs font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          <Link
            to={`/apartamento/${apt.slug}`}
            className="inline-flex items-center justify-center w-full md:w-auto px-8 py-3 text-sm font-semibold tracking-wider uppercase rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors duration-300"
          >
            Más detalles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JacuzziCard;
