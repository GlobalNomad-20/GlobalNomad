"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface CustomImageProps extends ImageProps {
  fallbackSrc?: string;
}

const defaultFallback = "/image/tempImg.jpg";

const CustomImage = ({ src, alt, fallbackSrc = defaultFallback, ...props }: CustomImageProps) => {
  const [isError, setIsError] = useState(false);

  const handleError = () => {
    if (!isError) {
      setIsError(true);
    }
  };

  return (
    <Image
      {...props}
      key={src?.toString()}
      src={isError ? fallbackSrc : src}
      alt={alt}
      onError={handleError}
      unoptimized={isError || props.unoptimized}
    />
  );
};

export default CustomImage;
