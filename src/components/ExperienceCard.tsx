interface ExperienceCardProps {
  title: string;
  description: string;
  image: string;
  icon?: React.ReactNode;
}

const ExperienceCard = ({ title, description, image, icon }: ExperienceCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-sm h-80 md:h-96">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        {icon && (
          <div className="text-cream/80 mb-3">{icon}</div>
        )}
        <h3 className="font-serif text-2xl md:text-3xl text-cream mb-2">
          {title}
        </h3>
        <p className="text-cream/80 text-sm md:text-base leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ExperienceCard;
