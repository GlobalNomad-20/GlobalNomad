"use client";

import Lottie from "lottie-react";
import { useEffect, useState } from "react";

interface EmptyResultProps {
  message: string;
}
const EmptyResult = ({ message }: EmptyResultProps) => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/lottie/NotFound.json")
      .then((res) => {
        return res.json();
      })
      .then(setAnimationData);
  }, []);

  if (!animationData) return null;

  return (
    <div className="flex w-full flex-col items-center justify-center py-10">
      <div className="h-36 w-36 md:h-44 md:w-44">
        <Lottie animationData={animationData} loop autoplay />
      </div>
      <div className="typo-16-m mt-2 text-gray-300">{message}</div>
    </div>
  );
};

export default EmptyResult;
