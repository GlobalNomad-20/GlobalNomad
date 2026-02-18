import { CategoryValue } from "./activityCategory";

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
