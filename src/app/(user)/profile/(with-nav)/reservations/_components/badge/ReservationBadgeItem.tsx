import { motion } from "framer-motion";

import { ReservationStatus } from "@/types/reservations";
import { cn } from "@/utils/cn";

const baseStyle = `typo-14-m md:typo-16-b flex h-10 min-w-25 flex-shrink-0 items-center justify-center rounded-4xl border cursor-pointer transition-colors`;

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
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}>
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          baseStyle,
          isSelected
            ? "bg-gray-800 text-white"
            : "border-gray-200 bg-white text-gray-950 hover:bg-gray-800 hover:text-white",
        )}
      >
        {label}
      </button>
    </motion.div>
  );
};

export default ReservationBadgeItem;
