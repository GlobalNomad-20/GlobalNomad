"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useCalendarQuery = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const today = new Date();
  const defaultYear = String(today.getFullYear());
  const defaultMonth = String(today.getMonth() + 1).padStart(2, "0");

  const year = searchParams.get("year") || defaultYear;
  const month = searchParams.get("month") || defaultMonth;

  const handleMonthChange = useCallback(
    (newYear: string, newMonth: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("year", newYear);
      params.set("month", newMonth);

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  return {
    year,
    month,
    handleMonthChange,
  };
};
