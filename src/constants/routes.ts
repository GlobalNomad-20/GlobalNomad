export const ROUTES = {
  HOME: "/",

  AUTH: {
    LOGIN: "/login",
    SIGNUP: "/register",
    KAKAO: (state: "signin" | "signup") => {
      return `/api/auth/kakao?state=${state}`;
    },
  },

  ACTIVITIES: {
    ROOT: "/activities",
    DETAIL: (id: string | number) => {
      return `/activities/${id}`;
    },
  },

  PROFILE: {
    ROOT: "/profile",
    EDIT: "/profile/edit",
    RESERVATIONS: "/profile/reservations",

    MY_ACTIVITIES: {
      ROOT: "/profile/myActivities",
      ADD: "/profile/myActivities/add",
      EDIT: (id: string | number) => {
        return `/profile/myActivities/edit/${id}`;
      },
    },

    RESERVATIONS_STATUS: "/profile/reservationsStatus",

    HIDE_NAV_PREFIXES: ["/profile/myActivities/add/", "/profile/myActivities/edit/"],
  },
} as const;
