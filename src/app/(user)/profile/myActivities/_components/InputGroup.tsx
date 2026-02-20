"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { myActivityFormSchema, MyActivityFormValues } from "../_schema/myActivityFormSchema";
import { buildUpdateData } from "../_utils/buildUpdateData";

import TextInput from "./inputs/TextInput";
import TextareaInput from "./inputs/TextareaInput";
import PriceInput from "./inputs/PriceInput";
import ScheduleInput from "./inputs/ScheduleInput";
import ImageInput from "./inputs/ImageInput";
import { FormSelectInput } from "./inputs/select/FormSelectInput";
import AddressInput from "./inputs/AddressInput";
import ActivityConfirmModal from "./modals/ActivityConfirmModal";
import FormExitConfirmModal from "./modals/FormExitConfirmModal";

import Button from "@/components/common/Button";
import { ACTIVITY_CATEGORIES } from "@/constants/categoryOption";
import { MyActivityDetailResponse } from "@/types/myActivities";
import { useCreateActivity, useUpdateActivity } from "@/hooks/queries/useMyActivities";
import { useModal } from "@/hooks/useModal";
import { usePreventNavigation } from "@/app/(user)/profile/myActivities/_hooks/usePreventNavigation";

interface InputGroupProps {
  mode: "add" | "edit";
  initialData?: MyActivityDetailResponse | null;
}

const InputGroup = ({ mode, initialData }: InputGroupProps) => {
  const router = useRouter();
  const activityConfirmModal = useModal();
  const formExitConfirmModal = useModal();

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

  const handleOpenActivityConfirmModal = () => {
    activityConfirmModal.onOpen();
  };

  const handleCloseActivityConfirmModal = () => {
    activityConfirmModal.onClose();
    router.push("/profile/myActivities");
  };

  const { isDirty } = myActivityForm.formState;
  const { handleAllowNavigation, handleCancelNavigation, disableProtection } = usePreventNavigation(
    {
      isDirty,
      onNavigationAttempt: formExitConfirmModal.onOpen,
    },
  );

  const handleAllowFormExitConfirmModal = () => {
    formExitConfirmModal.onClose();
    handleAllowNavigation();
  };

  const handleCancelFormExitConfirmModal = () => {
    handleCancelNavigation();
    formExitConfirmModal.onClose();
  };

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
          disableProtection();
          handleOpenActivityConfirmModal();
        },
      });
    } else if (mode === "edit" && initialData) {
      const updateRequestData = buildUpdateData(initialData, data);

      updateActivity(
        {
          activityId: initialData.id,
          data: updateRequestData,
        },
        {
          onSuccess: () => {
            disableProtection();
            handleOpenActivityConfirmModal();
          },
        },
      );
    }
  };

  return (
    <div>
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
              <AddressInput
                name="address"
                label="주소"
                placeholder="주소를 입력해 주세요."
                required
              />
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
      {activityConfirmModal.isOpen && (
        <ActivityConfirmModal
          isOpen={!!activityConfirmModal.isOpen}
          onClose={handleCloseActivityConfirmModal}
          onBackgroundClick={handleCloseActivityConfirmModal}
          message={mode === "add" ? "체험 등록이 완료되었습니다." : "체험 수정이 완료되었습니다."}
        />
      )}
      {formExitConfirmModal.isOpen && (
        <FormExitConfirmModal
          isOpen={!!formExitConfirmModal.isOpen}
          onClose={handleCancelFormExitConfirmModal}
          onConfirm={handleAllowFormExitConfirmModal}
          onBackgroundClick={handleCancelFormExitConfirmModal}
        />
      )}
    </div>
  );
};

export default InputGroup;
