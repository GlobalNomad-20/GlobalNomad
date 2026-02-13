"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { myActivityFormSchema, MyActivityFormValues } from "../_schema/myActivityFormSchema";

import TextInput from "./inputs/TextInput";
import SelectInput from "./inputs/SelectInput";
import TextareaInput from "./inputs/TextareaInput";
import PriceInput from "./inputs/PriceInput";

import Button from "@/components/common/Button";
import { ACTIVITY_CATEGORIES } from "@/constants/categoryOption";

interface InputGroupProps {
  mode: "add" | "edit";
}

const InputGroup = ({ mode }: InputGroupProps) => {
  const myActivityForm = useForm<MyActivityFormValues>({
    resolver: zodResolver(myActivityFormSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      address: "",
      price: 0,
      schedules: [],
      bannerImageUrl: "",
      subImageUrls: [],
    },
  });

  return (
    <FormProvider {...myActivityForm}>
      <form
        onSubmit={myActivityForm.handleSubmit((data) => {
          return console.log(data);
        })}
      >
        <TextInput name="title" label="제목" placeholder="제목을 입력해 주세요." required />
        <SelectInput
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

        <Button type="submit" className="typo-14-b mx-auto h-10 w-30">
          {mode === "add" ? "등록하기" : "수정하기"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default InputGroup;
