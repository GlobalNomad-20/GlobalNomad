export type ReservationStatus = "pending" | "confirmed" | "declined" | "canceled" | "completed";

export interface GetMyReservationsParams {
  cursorId?: number;
  size?: number;
  status?: ReservationStatus;
}
