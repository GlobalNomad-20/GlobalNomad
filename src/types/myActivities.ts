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
