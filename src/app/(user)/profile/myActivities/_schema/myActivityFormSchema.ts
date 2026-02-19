import { z } from "zod";

const scheduleSchema = z
  .object({
    id: z.number().optional(),
    date: z
      .string({
        message: "날짜를 입력해 주세요.",
      })
      .regex(/^\d{4}-\d{2}-\d{2}$/, "날짜는 YYYY-MM-DD 형식으로 입력해 주세요."),
    startTime: z
      .string({
        message: "시작 시간을 입력해 주세요.",
      })
      .regex(/^\d{2}:\d{2}$/, "시작 시간 형식이 올바르지 않습니다."),
    endTime: z
      .string({
        message: "종료 시간을 입력해 주세요.",
      })
      .regex(/^\d{2}:\d{2}$/, "종료 시간 형식이 올바르지 않습니다."),
  })
  .refine(
    (data) => {
      return data.startTime < data.endTime;
    },
    {
      message: "종료 시간은 시작 시간보다 나중이어야 합니다.",
      path: ["endTime"],
    },
  );

export const myActivityFormSchema = z
  .object({
    title: z
      .string({
        message: "제목을 입력해 주세요.",
      })
      .min(1, "제목을 입력해 주세요."),
    category: z
      .string({
        message: "카테고리를 선택해 주세요.",
      })
      .min(1, "카테고리를 선택해 주세요."),
    description: z
      .string({
        message: "설명을 입력해 주세요.",
      })
      .min(1, "설명을 입력해 주세요."),
    address: z
      .string({
        message: "주소를 입력해 주세요.",
      })
      .min(1, "주소를 입력해 주세요."),
    price: z.preprocess(
      (val) => {
        if (val === "" || val === undefined) return undefined;
        const num = Number(val);
        return isNaN(num) ? undefined : num;
      },
      z
        .number({
          message: "가격은 숫자로 입력해 주세요.",
        })
        .min(0, "가격은 0원 이상이어야 합니다.")
        .refine((val) => {
          return val > 0;
        }, "가격을 입력해 주세요."),
    ),
    schedules: z
      .array(scheduleSchema, {
        message: "예약 가능한 시간대를 등록해 주세요.",
      })
      .min(1, "예약 가능한 시간대는 최소 1개 이상 등록해 주세요."),
    bannerImageUrl: z
      .array(z.string(), {
        message: "배너 이미지를 등록해 주세요.",
      })
      .min(1, "배너 이미지를 등록해 주세요.")
      .max(1, "배너 이미지는 1개만 등록할 수 있습니다."),
    subImageUrls: z
      .array(z.string(), {
        message: "소개 이미지를 등록해 주세요.",
      })
      .max(4, "소개 이미지는 최대 4개까지 등록할 수 있습니다."),
  })
  .refine(
    (data) => {
      const schedules = data.schedules;
      for (let i = 0; i < schedules.length; i++) {
        for (let j = i + 1; j < schedules.length; j++) {
          if (schedules[i].date === schedules[j].date) {
            const start1 = schedules[i].startTime;
            const end1 = schedules[i].endTime;
            const start2 = schedules[j].startTime;
            const end2 = schedules[j].endTime;

            if ((start1 < end2 && end1 > start2) || (start2 < end1 && end2 > start1)) {
              return false;
            }
          }
        }
      }
      return true;
    },
    {
      message: "겹치는 예약 가능 시간대가 존재합니다.",
      path: ["schedules"],
    },
  );

export type MyActivityFormValues = z.infer<typeof myActivityFormSchema>;
