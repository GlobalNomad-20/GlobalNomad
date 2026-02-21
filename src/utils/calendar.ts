export interface CalendarDay {
  year: number;
  month: number;
  date: number;
  isCurrentMonth: boolean;
  dateStr: string;
}

export const getDynamicCalendarData = (year: number, month: number): CalendarDay[] => {
  const result: CalendarDay[] = [];
  const firstDateOfMonth = new Date(year, month, 1);
  const startDayIndex = firstDateOfMonth.getDay();
  const lastDateOfMonth = new Date(year, month + 1, 0);
  const lastDayIndex = lastDateOfMonth.getDay();

  const startDate = new Date(firstDateOfMonth);
  startDate.setDate(startDate.getDate() - startDayIndex);

  const remainingDays = 6 - lastDayIndex;
  const endDate = new Date(lastDateOfMonth);
  endDate.setDate(endDate.getDate() + remainingDays);

  const current = new Date(startDate);

  while (current <= endDate) {
    result.push({
      year: current.getFullYear(),
      month: current.getMonth(),
      date: current.getDate(),
      isCurrentMonth: current.getMonth() === month,
      dateStr: `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, "0")}-${String(current.getDate()).padStart(2, "0")}`,
    });
    current.setDate(current.getDate() + 1);
  }

  return result;
};
