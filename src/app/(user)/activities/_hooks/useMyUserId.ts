"use client";

import { useQuery } from "@tanstack/react-query";

import { getMyActivities } from "@/api/myActivities";

export const useMyUserId = () => {
  return useQuery({
    queryKey: ["myUserId"],
    queryFn: async () => {
      const response = await getMyActivities({ size: 1 });
      return response.activities?.[0]?.userId ?? null;
    },
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });
};
