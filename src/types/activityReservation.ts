export interface CreateActivityReservationPathParams {
  //   teamId: string;
  activityId: number;
}

export interface CreateActivityReservationRequestBody {
  scheduleId: number;
  headCount: number;
}

export type CreateActivityReservationParams = CreateActivityReservationPathParams & {
  body: CreateActivityReservationRequestBody;
};

export type ReservationStatus = "pending" | string;

export interface ActivityReservation {
  id: number;
  teamId: string;
  userId: number;
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
