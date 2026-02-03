import { API_ENDPOINTS } from "@/constants/apiEndPoint";
import { client } from "@/lib/client/client";
import { NotificationResponse } from "@/types/notification";

export const getNotifications = async (size: number = 10, cursorId?: number) => {
  const response = await client.get<NotificationResponse>(API_ENDPOINTS.MY_NOTIFICATIONS.LIST, {
    params: { size, cursorId },
  });

  return response.data;
};
