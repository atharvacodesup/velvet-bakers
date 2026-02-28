import { FiStar } from "react-icons/fi";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: number;
}

const StarRating = ({ rating, max = 5, size = 16 }: StarRatingProps) => (
  <div className="flex gap-0.5" aria-label={`${rating} out of ${max} stars`}>
    {Array.from({ length: max }, (_, i) => (
      <FiStar
        key={i}
        size={size}
        className={i < rating ? "fill-accent text-accent" : "text-muted-foreground/40"}
      />
    ))}
  </div>
);

export default StarRating;
