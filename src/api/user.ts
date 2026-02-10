import { API_ENDPOINTS, BASE_URL } from "@/constants/apiEndPoint";
import { fetchWithAuth } from "@/lib/client/auth";
import { client } from "@/lib/client/client";
import { UpdateUserParams, UploadImageResponse, User } from "@/types/user";

export const fetchMyInfoServer = async () => {
  const url = `${BASE_URL}${API_ENDPOINTS.USERS.ME}`;

  return await fetchWithAuth<User>(url);
};

export const fetchMyInfo = async () => {
  const response = await client.get<User>(API_ENDPOINTS.USERS.ME);
  return response.data;
};

export const updateMyInfo = async (params: UpdateUserParams) => {
  const response = await client.patch<User>(API_ENDPOINTS.USERS.ME, params);
  return response.data;
};

export const uploadProfileImage = async (imageFile: File) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await client.post<UploadImageResponse>(API_ENDPOINTS.USERS.ME_IMAGE, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
