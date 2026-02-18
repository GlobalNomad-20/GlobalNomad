"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

interface InputGroupProps {
  mode: "add" | "edit";
  initialData?: MyActivityDetailResponse | null;
}

const InputGroup = ({ mode, initialData }: InputGroupProps) => {
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

  return (
    <FormProvider {...myActivityForm}>
      <form
        onSubmit={myActivityForm.handleSubmit((data) => {
          // TODO: mode에 따라 post/patch
          return console.log(data);
        })}
      >
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

          <Button type="submit" className="typo-14-b mx-auto h-10 w-30">
            {mode === "add" ? "등록하기" : "수정하기"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default InputGroup;
