export type ReservationStatus = "pending" | "confirmed" | "declined" | "canceled" | "completed";

export interface GetReservationsParams {
  cursorId?: number;
  size?: number;
  status?: ReservationStatus;
}

export interface ReservationActivity {
  bannerImageUrl: string;
  title: string;
  id: number;
}

export interface Reservation {
  id: number;
  teamId: string;
  userId: number;
  activity: ReservationActivity;
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

export interface ReservationsResponse {
  cursorId: number;
  reservations: Reservation[];
  totalCount: number;
}

export interface ReservationReviewRequest {
  rating: number;
  content: string;
}
