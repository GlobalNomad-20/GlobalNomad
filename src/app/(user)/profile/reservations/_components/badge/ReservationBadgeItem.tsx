import { ReservationStatus } from "@/types/reservations";
import { cn } from "@/utils/cn";

const baseStyle = `typo-16-m flex h-10 min-w-25 flex-shrink-0 items-center justify-center rounded-4xl border cursor-pointer transition-colors`;

const ReservationBadgeItem = ({
  label,
  statusKey,
  isSelected,
  onClick,
}: {
  label: string;
  statusKey?: ReservationStatus;
  isSelected: boolean;
  onClick: (s?: ReservationStatus) => void;
}) => {
  const handleClick = () => {
    return onClick(statusKey);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        baseStyle,
        isSelected
          ? "bg-gray-800 text-white"
          : "border-gray-300 bg-white hover:bg-gray-800 hover:text-white",
      )}
    >
      {label}
    </button>
  );
};

export default ReservationBadgeItem;
