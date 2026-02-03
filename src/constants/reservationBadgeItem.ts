export const RESERVATION_STATUS_BADGES = {
  pending: {
    label: "예약 요청",
    textColor: "text-[#1790A0]",
    bgColor: "bg-[#DDF9F9]",
  },
  canceled: {
    label: "예약 취소",
    textColor: "text-[#383D41]",
    bgColor: "bg-[#E2E3E5]",
  },
  confirmed: {
    label: "예약 완료",
    textColor: "text-[#2BA90D]",
    bgColor: "bg-[#E9FBE4]",
  },
  declined: {
    label: "예약 거절",
    textColor: "text-[#F96767]",
    bgColor: "bg-[#FCECEA]",
  },
  completed: {
    label: "체험 완료",
    textColor: "text-[#0D6CD1]",
    bgColor: "bg-[#DAF0FF]",
  },
} as const;
