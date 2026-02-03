import { API_ENDPOINTS } from "@/constants/apiEndPoint";
import { client } from "@/lib/client/client";
import { NotificationResponse } from "@/types/notification";

export const fetchMyNotifications = async (size?: number, cursorId?: number | null) => {
  const response = await client.get<NotificationResponse>(API_ENDPOINTS.MY_NOTIFICATIONS.LIST, {
    params: { size, cursorId },
  });

  return response.data;
};

export const deleteMyNotification = async (notificationId: number) => {
  const response = await client.delete(API_ENDPOINTS.MY_NOTIFICATIONS.DELETE(notificationId));

  return response.data;
};
