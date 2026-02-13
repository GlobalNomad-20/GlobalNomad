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

// 내 체험과 관련된 모든 키를 여기서 관리합니다.
export const myActivitiesKeys = {
  all: ["myActivities"] as const,
  list: () => {
    return [...myActivitiesKeys.all, "list"]; // 등록한 내 체험 리스트
  },
};

// 유저 정보와 관련된 모든 키를 여기서 관리합니다.
export const userKeys = {
  all: ["users"] as const,
  // 내 정보 조회 키
  me: () => {
    return [...userKeys.all, "me"] as const;
  },
};

// 체험 상세 페이지(activityId 기준)와 관련된 모든 쿼리 키를 여기서 관리합니다.
export const activityIdKeys = {
  all: ["activities"] as const,

  // 상세페이지 데이터 조회 키
  detail: (activityId: number) => {
    return [...activityIdKeys.all, "detail", activityId] as const;
  },

  // 상세페이지 체험에 해당하는 체험리뷰 조회 키
  reviews: (activityId: number, page: number, size: number) => {
    return [...activityIdKeys.all, "reviews", activityId, page, size] as const;
  },
};

// 체험 리스트 조회와 관련된 모든 키를 여기서 관리합니다.
export const activitiesKeys = {
  all: ["activities"] as const,

  // 인기 체험 리스트 (무한스크롤)
  popular: (sort?: string, method?: string) => {
    return [...activitiesKeys.all, "popular", sort, method];
  },

  // 전체 체험 리스트 (검색/필터/페이지네이션)
  list: (
    category?: string,
    keyword?: string,
    sort?: string,
    page?: number,
    size?: number,
    method?: string,
  ) => {
    return [
      ...activitiesKeys.all,
      "list",
      { category, keyword, sort, page, size, method },
    ] as const;
  },
};

// 체험 상세/스케줄 관련 키 관리
export const activityScheduleKeys = {
  all: ["availableSchedule"] as const,

  list: (activityId?: number, year?: string, month?: string) => {
    return [...activityScheduleKeys.all, { activityId, year, month }] as const;
  },
};
