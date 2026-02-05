import { OAuthProvider } from "@/types/oauth";

export const API_ENDPOINTS = {
  ACTIVITIES: {
    LIST: "/activities",
    CREATE: "/activities",
    DETAIL: (activityId: number) => {
      return `/activities/${activityId}`;
    },
    AVAILABLE_SCHEDULE: (activityId: number) => {
      return `/activities/${activityId}/available-schedule`;
    },
    REVIEWS: (activityId: number) => {
      return `/activities/${activityId}/reviews`;
    },
    RESERVATIONS: (activityId: number) => {
      return `/activities/${activityId}/reservations`;
    },
    IMAGE: "/activities/image",
  },

  AUTH: {
    LOGIN: "/auth/login",
    TOKENS: "/auth/tokens",
    LOGOUT: "/auth/logout",
  },

  MY_ACTIVITIES: {
    LIST: "/my-activities",
    RESERVATION_DASHBOARD: (activityId: number) => {
      return `/my-activities/${activityId}/reservation-dashboard`;
    },
    RESERVED_SCHEDULE: (activityId: number) => {
      return `/my-activities/${activityId}/reserved-schedule`;
    },
    RESERVATIONS: (activityId: number) => {
      return `/my-activities/${activityId}/reservations`;
    },
    RESERVATION_STATUS_UPDATE: (activityId: number, reservationId: number) => {
      return `/my-activities/${activityId}/reservations/${reservationId}`;
    },
    DELETE: (activityId: number) => {
      return `/my-activities/${activityId}`;
    },
    UPDATE: (activityId: number) => {
      return `/my-activities/${activityId}`;
    },
  },

  MY_NOTIFICATIONS: {
    LIST: "/my-notifications",
    DELETE: (notificationId: number) => {
      return `/my-notifications/${notificationId}`;
    },
  },

  MY_RESERVATIONS: {
    LIST: "/my-reservations",
    UPDATE: (reservationId: number) => {
      return `/my-reservations/${reservationId}`;
    },
    REVIEWS: (reservationId: number) => {
      return `/my-reservations/${reservationId}/reviews`;
    },
  },

  OAUTH: {
    APPS: "/oauth/apps",
    SIGN_UP: (provider: OAuthProvider) => {
      return `/oauth/sign-up/${provider}`;
    },
    SIGN_IN: (provider: OAuthProvider) => {
      return `/oauth/sign-in/${provider}`;
    },
  },

  USERS: {
    SIGNUP: "/users",
    ME: "/users/me",
    ME_UPDATE: "/users/me",
    ME_IMAGE: "/users/me/image",
  },
} as const;

export const BASE_URL = "https://sp-globalnomad-api.vercel.app/20-2";
export const REFRESH_URL = BASE_URL + API_ENDPOINTS.AUTH.TOKENS;
