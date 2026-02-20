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

export interface SubImage {
  id: number;
  imageUrl: string;
}

export interface Schedule {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

export interface MyActivityDetailResponse {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: CategoryValue;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImages: SubImage[];
  schedules: Schedule[];
  reviewCount: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}
export interface UploadActivityImageResponse {
  activityImageUrl: string;
}

export interface CreateActivitySchedule {
  date: string;
  startTime: string;
  endTime: string;
}

export interface CreateActivityRequest {
  title: string;
  category: string;
  description: string;
  address: string;
  price: number;
  schedules: CreateActivitySchedule[];
  bannerImageUrl: string;
  subImageUrls: string[];
}

export interface UpdateActivitySchedule {
  date: string;
  startTime: string;
  endTime: string;
}

export interface UpdateActivityRequest {
  title: string;
  category: string;
  description: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImageIdsToRemove: number[];
  subImageUrlsToAdd: string[];
  scheduleIdsToRemove: number[];
  schedulesToAdd: UpdateActivitySchedule[];
}

export interface ActivityResponseScheduleTime {
  endTime: string;
  startTime: string;
  id: number;
}

export interface ActivityResponseSchedule {
  times: ActivityResponseScheduleTime[];
  date: string;
}

export interface ActivityResponseSubImage {
  imageUrl: string;
  id: number;
}

export interface ActivityResponse {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  subImages: ActivityResponseSubImage[];
  schedules: ActivityResponseSchedule[];
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
