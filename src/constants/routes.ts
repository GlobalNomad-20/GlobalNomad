export const ROUTES = {
  AUTH: {
    LOGIN: "/login",
    SIGNUP: "/signup",
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
      ADD: (id: string | number) => {
        return `/profile/myActivities/add/${id}`;
      },
      EDIT: (id: string | number) => {
        return `/profile/myActivities/edit/${id}`;
      },
    },

    RESERVATIONS_STATUS: "/profile/reservationsStatus",

    HIDE_NAV_PREFIXES: ["/profile/myActivities/add/", "/profile/myActivities/edit/"],
  },
} as const;
