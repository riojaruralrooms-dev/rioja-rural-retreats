import { Star } from "lucide-react";

interface ReviewCardProps {
  name: string;
  text: string;
}

const ReviewCard = ({ name, text }: ReviewCardProps) => {
  return (
    <div className="bg-card rounded-2xl p-6 border border-border" style={{ boxShadow: "var(--shadow-soft)" }}>
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
};

export default ReviewCard;
