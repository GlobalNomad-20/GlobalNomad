import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * clsx로 조건부 클래스를 결합하고,
 * tailwind-merge로 중복되거나 충돌하는 테일윈드 클래스를 정리합니다.
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
