export const RESERVATION_STATUS_BADGES = {
  pending: {
    label: "예약 요청",
    textColor: "#1790A0",
    bgColor: "#DDF9F9",
  },
  canceled: {
    label: "예약 취소",
    textColor: "text-gray-600",
    bgColor: "bg-gray-100",
  },
  confirmed: {
    label: "예약 완료",
    textColor: "#2BA90D",
    bgColor: "#E9FBE4",
  },
  declined: {
    label: "예약 거절",
    textColor: "#F96767",
    bgColor: "#FCECEA",
  },
  completed: {
    label: "체험 완료",
    textColor: "#0D6CD1",
    bgColor: "#DAF0FF",
  },
} as const;
