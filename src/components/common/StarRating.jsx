import { Star } from 'lucide-react';

export default function StarRating({ rating, size = 16 }) {
  return (
    <div className="star-rating" aria-label={`Note: ${rating} sur 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={star <= rating ? 'star' : 'star empty'}
          fill={star <= rating ? 'currentColor' : 'none'}
        />
      ))}
    </div>
  );
}
