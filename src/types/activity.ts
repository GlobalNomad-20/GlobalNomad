export interface ReservationStatus {
  completed: number;
  confirmed: number;
  pending: number;
}

export interface ReservationDashboardData {
  date: string;
  reservations: ReservationStatus;
}

export type ReservationDashboardResponse = ReservationDashboardData[];
