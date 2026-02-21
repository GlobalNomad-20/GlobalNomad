export interface GetAvailableScheduleParams {
  activityId: number;
  year: string;
  month: string;
}

export interface UseAvailableScheduleParams {
  activityId?: number;
  year?: string;
  month?: string;
}

export interface AvailableTimeSlot {
  id: number; // scheduleId
  startTime: string;
  endTime: string;
}

export interface AvailableScheduleByDate {
  date: string;
  times: AvailableTimeSlot[];
}

export interface TimeSelectorProps {
  schedules?: AvailableScheduleByDate[];
  selectedDate?: string;
}

export type AvailableScheduleResponse = AvailableScheduleByDate[];
