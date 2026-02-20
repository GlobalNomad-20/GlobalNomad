import Image from "next/image";

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  disabled?: boolean;
}

const starCount = 5;

const StarRating = ({ rating, onRatingChange, disabled = false }: StarRatingProps) => {
  const handleStarClick = (starValue: number) => {
    if (disabled) return;
    onRatingChange(starValue);
  };

  return (
    <div className="mb-5 flex flex-col items-center justify-center gap-2 md:mb-7.5">
      <div className="flex items-center gap-1.5 md:gap-3" role="group" aria-label="별점">
        {Array.from({ length: starCount }, (_, i) => {
          const starValue = i + 1;
          const isFilled = starValue <= rating;

          const handleClick = () => {
            handleStarClick(starValue);
          };

          return (
            <button
              key={starValue}
              type="button"
              onClick={handleClick}
              disabled={disabled}
              className="disabled:cursor-not-allowed"
              aria-label={`${starValue}점`}
              aria-pressed={rating === starValue}
            >
              <Image
                width={36}
                height={36}
                src={isFilled ? "/image/yellowStar.png" : "/image/grayStar.png"}
                alt=""
                className="h-9 w-9 md:h-10.5 md:w-10.5"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StarRating;
