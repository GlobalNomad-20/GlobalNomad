import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { fetchMyInfo, updateMyInfo, uploadProfileImage } from "@/api/user";
import { userKeys } from "@/lib/query/queryKeys";
import { UpdateUserParams, User } from "@/types/user";

export const useMyInfo = (initialData?: User | null) => {
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: fetchMyInfo,
    initialData,
  });
};

export const useUpdateMyInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UpdateUserParams) => {
      return updateMyInfo(params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.me() });
    },
    onError: (error) => {
      console.error("정보 수정 실패:", error);
    },
  });
};

export const useUploadProfileImage = () => {
  return useMutation({
    mutationFn: (imageFile: File) => {
      return uploadProfileImage(imageFile);
    },
    onError: (error) => {
      console.error("이미지 업로드 실패:", error);
    },
  });
};
