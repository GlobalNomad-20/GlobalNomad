import { API_ENDPOINTS, BASE_URL } from "@/constants/apiEndPoint";
import { fetchWithAuth } from "@/lib/client/auth";
import { User } from "@/types/user";

export const fetchMyInfoServer = async () => {
  const url = `${BASE_URL}${API_ENDPOINTS.USERS.ME}`;

  return await fetchWithAuth<User>(url);
};
