// 알람과 관련된 모든 키를 여기서 관리합니다.
export const myNotificationsKeys = {
  all: ["myNotifications"] as const,
  count: () => {
    return [...myNotificationsKeys.all, "count"]; // 알람 개수
  },
  list: () => {
    return [...myNotificationsKeys.all, "list"]; // 알람 리스트
  },
};

// 예약과 관련된 모든 키를 여기서 관리합니다.
export const myReservationsKeys = {
  all: ["myReservations"] as const,
  list: (status?: string) => {
    return [...myReservationsKeys.all, "list", { status }]; // 예약 내역 리스트
  },
};
