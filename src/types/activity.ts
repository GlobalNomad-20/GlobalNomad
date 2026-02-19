export interface ReservationStatus {
  completed: number;
  confirmed: number;
  pending: number;
}

export interface ReservationDashboardData {
  date: string;
  reservations: ReservationStatus;
}

export interface ReservedScheduleCount {
  declined: number;
  confirmed: number;
  pending: number;
}

export interface ReservedSchedule {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: ReservedScheduleCount;
}

export type ReservationDashboardResponse = ReservationDashboardData[];
export type ReservedScheduleResponse = ReservedSchedule[];
