"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { myActivityFormSchema, MyActivityFormValues } from "../_schema/myActivityFormSchema";

import TextInput from "./inputs/TextInput";
import TextareaInput from "./inputs/TextareaInput";
import PriceInput from "./inputs/PriceInput";
import ScheduleInput from "./inputs/ScheduleInput";
import ImageInput from "./inputs/ImageInput";
import { FormSelectInput } from "./inputs/select/FormSelectInput";

import Button from "@/components/common/Button";
import { ACTIVITY_CATEGORIES } from "@/constants/categoryOption";
import { MyActivityDetailResponse } from "@/types/myActivities";
import { useCreateActivity, useUpdateActivity } from "@/hooks/queries/useMyActivities";

interface InputGroupProps {
  mode: "add" | "edit";
  initialData?: MyActivityDetailResponse | null;
}

const InputGroup = ({ mode, initialData }: InputGroupProps) => {
  const router = useRouter();
  const { mutate: createActivity, isPending: isCreating } = useCreateActivity();
  const { mutate: updateActivity, isPending: isUpdating } = useUpdateActivity();

  const isPending = isCreating || isUpdating;

  const initValues = {
    title: "",
    category: "",
    description: "",
    address: "",
    price: 0,
    schedules: [],
    bannerImageUrl: [],
    subImageUrls: [],
  } as MyActivityFormValues;

  const defaultValues =
    mode === "edit" && initialData
      ? {
          title: initialData.title,
          category: initialData.category,
          description: initialData.description,
          address: initialData.address,
          price: initialData.price,
          schedules: initialData.schedules,
          bannerImageUrl: [initialData.bannerImageUrl],
          subImageUrls: initialData.subImages.map((img) => {
            return img.imageUrl;
          }),
        }
      : initValues;

  const myActivityForm = useForm({
    mode: "onBlur",
    resolver: zodResolver(myActivityFormSchema),
    defaultValues,
  });

  if (mode === "edit" && !initialData) {
    return <div>데이터를 불러올 수 없습니다.</div>;
  }

  const onSubmit = (data: MyActivityFormValues) => {
    if (mode === "add") {
      const requestData = {
        ...data,
        bannerImageUrl: data.bannerImageUrl[0],
      };

      createActivity(requestData, {
        onSuccess: () => {
          alert("체험이 등록되었습니다.");
          router.push("/profile/myActivities");
        },
      });
    } else if (mode === "edit" && initialData) {
      // 기존 이미지 URL 목록
      const initialSubImageUrls = initialData.subImages.map((img) => {
        return img.imageUrl;
      });
      const currentSubImageUrls = data.subImageUrls;

      // 삭제할 이미지 ID 찾기 (기존에 있었는데 현재는 없는 것)
      const subImageIdsToRemove = initialData.subImages
        .filter((img) => {
          return !currentSubImageUrls.includes(img.imageUrl);
        })
        .map((img) => {
          return img.id;
        });

      // 추가할 이미지 URL 찾기 (현재 있는데 기존에 없던 것)
      const subImageUrlsToAdd = currentSubImageUrls.filter((url) => {
        return !initialSubImageUrls.includes(url);
      });

      // 기존 스케줄 ID 목록
      const initialScheduleIds = initialData.schedules.map((schedule) => {
        return schedule.id;
      });
      const currentScheduleIds = data.schedules
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
      const schedulesToAdd = data.schedules
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

      const updateRequestData = {
        title: data.title,
        category: data.category,
        description: data.description,
        price: data.price,
        address: data.address,
        bannerImageUrl: data.bannerImageUrl[0],
        subImageIdsToRemove,
        subImageUrlsToAdd,
        scheduleIdsToRemove,
        schedulesToAdd,
      };

      updateActivity(
        {
          activityId: initialData.id,
          data: updateRequestData,
        },
        {
          onSuccess: () => {
            alert("체험이 수정되었습니다.");
            router.push("/profile/myActivities");
          },
        },
      );
    }
  };

  return (
    <FormProvider {...myActivityForm}>
      <form onSubmit={myActivityForm.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-7.5">
          <div className="flex flex-col gap-6">
            <TextInput name="title" label="제목" placeholder="제목을 입력해 주세요." required />
            <FormSelectInput
              name="category"
              label="카테고리"
              placeholder="카테고리를 선택해 주세요."
              options={ACTIVITY_CATEGORIES}
              required
            />
            <TextareaInput
              name="description"
              label="설명"
              placeholder="체험에 대한 설명을 입력해 주세요."
              required
            />
            <PriceInput
              name="price"
              label="가격"
              placeholder="체험 금액을 숫자로 입력해 주세요."
              required
            />
            <TextInput name="address" label="주소" placeholder="주소를 입력해 주세요." required />
          </div>
          <ScheduleInput name="schedules" label="예약 가능한 시간대" required />
          <ImageInput name="bannerImageUrl" label="배너 이미지 등록" maxCount={1} required />
          <ImageInput name="subImageUrls" label="소개 이미지 등록" maxCount={4} />

          <Button type="submit" className="typo-14-b mx-auto h-10 w-30" disabled={isPending}>
            {isPending ? "처리 중..." : mode === "add" ? "등록하기" : "수정하기"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default InputGroup;
