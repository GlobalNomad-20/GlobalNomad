import { MyActivityFormValues } from "../_schema/myActivityFormSchema";

import { MyActivityDetailResponse, UpdateActivityRequest } from "@/types/myActivities";

/**
 * 내 체험 수정 이미지 변경사항 계산 (추가/삭제)
 */
const calculateImageChanges = (
  initialImages: MyActivityDetailResponse["subImages"],
  currentImageUrls: string[],
) => {
  const initialImageUrls = initialImages.map((img) => {
    return img.imageUrl;
  });

  // 삭제할 이미지 ID 찾기 (기존에 있었는데 현재는 없는 것)
  const subImageIdsToRemove = initialImages
    .filter((img) => {
      return !currentImageUrls.includes(img.imageUrl);
    })
    .map((img) => {
      return img.id;
    });

  // 추가할 이미지 URL 찾기 (현재 있는데 기존에 없던 것)
  const subImageUrlsToAdd = currentImageUrls.filter((url) => {
    return !initialImageUrls.includes(url);
  });

  return { subImageIdsToRemove, subImageUrlsToAdd };
};

/**
 * 내 체험 수정 스케줄 변경사항 계산 (추가/삭제)
 */
const calculateScheduleChanges = (
  initialSchedules: MyActivityDetailResponse["schedules"],
  currentSchedules: MyActivityFormValues["schedules"],
) => {
  const initialScheduleIds = initialSchedules.map((schedule) => {
    return schedule.id;
  });

  const currentScheduleIds = currentSchedules
    .filter((s) => {
      return s.id;
    })
    .map((s) => {
      return s.id!;
    });

  // 삭제할 스케줄 ID 찾기 (기존에 있었는데 현재는 없는 것)
  const scheduleIdsToRemove = initialScheduleIds.filter((id) => {
    return !currentScheduleIds.includes(id);
  });

  // 추가할 스케줄 찾기 (id가 없는 새로운 스케줄)
  const schedulesToAdd = currentSchedules
    .filter((schedule) => {
      return !schedule.id;
    })
    .map(({ date, startTime, endTime }) => {
      return {
        date,
        startTime,
        endTime,
      };
    });

  return { scheduleIdsToRemove, schedulesToAdd };
};

/**
 * 내 체험 수정 API 요청 데이터 생성
 */
export const buildUpdateData = (
  initialData: MyActivityDetailResponse,
  formData: MyActivityFormValues,
): Omit<UpdateActivityRequest, "bannerImageUrl"> & { bannerImageUrl: string } => {
  const imageChanges = calculateImageChanges(initialData.subImages, formData.subImageUrls);
  const scheduleChanges = calculateScheduleChanges(initialData.schedules, formData.schedules);

  return {
    title: formData.title,
    category: formData.category,
    description: formData.description,
    price: formData.price,
    address: formData.address,
    bannerImageUrl: formData.bannerImageUrl[0],
    ...imageChanges,
    ...scheduleChanges,
  };
};
