import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";

interface AccommodationCardProps {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  images?: string[];
  buttonText?: string;
}

const AccommodationCard = ({
  id,
  name,
  location,
  description,
  image,
  images,
  buttonText = "Ver alojamiento",
}: AccommodationCardProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideImages = images && images.length > 1 ? images : null;

  useEffect(() => {
    if (!slideImages) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slideImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slideImages]);

  return (
    <div className="card-accommodation group bg-card">
      <div className="relative h-72 md:h-80 overflow-hidden">
        {slideImages ? (
          slideImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${name} ${idx + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                idx === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))
        ) : (
          <img src={image} alt={name} className="card-image" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
        {slideImages && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {slideImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? "bg-white/90 w-4" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
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
