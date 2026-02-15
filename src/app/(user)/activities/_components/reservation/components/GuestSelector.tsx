"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import MinusSvg from "@/assets/svg/MinusSvg";
import PlusSvg from "@/assets/svg/PlusSvg";

interface GuestSelectorProps {
  setReservationGuest: (count: number) => void;
}

const GuestSelector = ({ setReservationGuest }: GuestSelectorProps) => {
  const [personCount, setPersonCount] = useState(1);

  useEffect(() => {
    setReservationGuest(personCount);
  }, [personCount, setReservationGuest]);

  const handleIncreaseCount = () => {
    setPersonCount((prev) => {
      return prev + 1;
    });
  };

  const handleDecreaseCount = () => {
    if (personCount <= 1) return;
    setPersonCount((prev) => {
      return prev - 1;
    });
  };
  return (
    <div
      className="flex items-center justify-between md:flex-col md:items-start md:gap-5 lg:flex-row
        lg:items-center lg:justify-between"
    >
      <div className="typo-16-b text-gray-950">참여 인원 수</div>
      <div
        className="inline-flex h-10 w-36 items-center justify-between gap-6 rounded-xl border
          border-[#EEEEEE] bg-white px-5 py-3.5 md:w-63.25 md:gap-16.5 md:px-7.5 md:py-4 lg:w-35
          lg:gap-5.5 lg:rounded-3xl lg:px-4.75 lg:py-2.5"
      >
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.85 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          onClick={handleDecreaseCount}
          className="cursor-pointer hover:text-gray-500 disabled:text-gray-200"
          disabled={personCount === 1}
        >
          <MinusSvg className="h-3.25 w-3.25" />
        </motion.button>
        <motion.div
          key={personCount}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.15 }}
          className="typo-16-b w-5 text-center text-[#4B4B4B]"
        >
          {personCount}
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.85 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          onClick={handleIncreaseCount}
          className="cursor-pointer hover:text-gray-500"
        >
          <PlusSvg className="h-3.25 w-3.25" />
        </motion.button>
      </div>
    </div>
  );
};

export default GuestSelector;
