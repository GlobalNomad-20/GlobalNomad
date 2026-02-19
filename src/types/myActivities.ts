import { CategoryValue } from "./activityCategory";
import { ReservationStatus } from "./reservations";

export interface GetMyActivitiesParams {
  cursorId?: number;
  size?: number;
}

export interface MyActivity {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: CategoryValue;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface MyActivitiesResponse {
  cursorId: number;
  totalCount: number;
  activities: MyActivity[];
}

export interface ActivityReservation {
  id: number;
  nickname: string;
  userId: number;
  teamId: string;
  activityId: number;
  scheduleId: number;
  status: ReservationStatus;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityReservationsResponse {
  cursorId: number | null;
  totalCount: number;
  reservations: ActivityReservation[];
}

export interface FetchReservationsParams {
  activityId: number;
  scheduleId: number;
  status: ReservationStatus;
  size?: number;
  cursorId?: number;
}
