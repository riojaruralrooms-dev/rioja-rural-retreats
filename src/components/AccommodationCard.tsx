import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";

interface AccommodationCardProps {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  buttonText?: string;
}

const AccommodationCard = ({
  id,
  name,
  location,
  description,
  image,
  buttonText = "Ver alojamiento",
}: AccommodationCardProps) => {
  return (
    <div className="card-accommodation group bg-card">
      <div className="relative h-72 md:h-80 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="card-image"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
      </div>
      <div className="p-6 md:p-8">
        <div className="location-badge mb-3">
          <MapPin size={14} />
          <span>{location}</span>
        </div>
        <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-3">
          {name}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-6">
          {description}
        </p>
        <Link
          to={`/alojamientos/${id}`}
          className="inline-flex items-center gap-2 text-wine font-medium tracking-wide uppercase text-sm group-hover:gap-3 transition-all duration-300"
        >
          {buttonText}
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default AccommodationCard;
