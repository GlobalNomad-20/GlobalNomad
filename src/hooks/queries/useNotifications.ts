import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { deleteMyNotification, fetchMyNotifications } from "@/api/myNotifications";
import { myNotificationsKeys } from "@/lib/query/queryKeys";
import { NotificationResponse } from "@/types/notification";

export const useUnreadCount = () => {
  return useQuery({
    queryKey: myNotificationsKeys.count(),
    queryFn: async () => {
      const data = await fetchMyNotifications(1);
      return data.totalCount;
    },
    refetchInterval: 1000 * 60,
    staleTime: 1000 * 30,
  });
};

export const useMyNotifications = (size = 10) => {
  return useInfiniteQuery<NotificationResponse>({
    queryKey: myNotificationsKeys.list(),
    initialPageParam: null,
    queryFn: ({ pageParam }) => {
      return fetchMyNotifications(size, pageParam as number | undefined);
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.cursorId) {
        return lastPage.cursorId;
      }
      return null;
    },
  });
};

export const useDeleteMyNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: number) => {
      return deleteMyNotification(notificationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: myNotificationsKeys.all });
      console.log("알림이 삭제되었습니다.");
    },
    onError: (error) => {
      console.error("알림 삭제 실패:", error);
    },
  });
};
