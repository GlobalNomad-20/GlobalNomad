/**
 * createdAt을 "방금 전", "n분 전" 등으로 변환
 */
export const getRelativeTime = (dateString: string): string => {
  const now = new Date();
  const past = new Date(dateString);
  const diffMS = now.getTime() - past.getTime();

  const diffMin = Math.floor(diffMS / (1000 * 60));
  const diffHour = Math.floor(diffMS / (1000 * 60 * 60));
  const diffDay = Math.floor(diffMS / (1000 * 60 * 60 * 24));

  if (diffMin < 1) return "방금 전";
  if (diffMin < 60) return `${diffMin}분 전`;
  if (diffHour < 24) return `${diffHour}시간 전`;

  return `${diffDay}일 전`;
};

/**
 * 날짜 포맷팅: Date 객체를 "YYYY-MM-DD" 또는 "HH:mm" 형태로 변환하는 내부 함수
 */
const formatDatePart = (date: Date, type: "date" | "time") => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");

  if (type === "date") return `${year}-${month}-${day}`;
  return `${hour}:${min}`;
};

/**
 * "2023-01-14 15:00~18:00" 형태로 변환
 */
export const formatScheduleRange = (startDateStr: string, endDateStr?: string) => {
  const start = new Date(startDateStr);

  const dateStr = formatDatePart(start, "date");
  const startTimeStr = formatDatePart(start, "time");

  if (!endDateStr) {
    return `${dateStr} ${startTimeStr}`;
  }

  const end = new Date(endDateStr);
  const endTimeStr = formatDatePart(end, "time");

  return `${dateStr} ${startTimeStr}~${endTimeStr}`;
};

/**
 * "2023. 02. 14 / 11:00 - 12:30 (10명)" 형태로 변환
 */
export const formatReservationDisplay = (
  startDateStr: string,
  endDateStr?: string,
  headCount?: number,
): string => {
  const start = new Date(startDateStr);
  const year = start.getFullYear();
  const month = String(start.getMonth() + 1).padStart(2, "0");
  const day = String(start.getDate()).padStart(2, "0");
  const dateStr = `${year}. ${month}. ${day}`;
  const startTimeStr = formatDatePart(start, "time");

  let timePart = startTimeStr;
  if (endDateStr) {
    const end = new Date(endDateStr);
    const endTimeStr = formatDatePart(end, "time");
    timePart = `${startTimeStr} - ${endTimeStr}`;
  }

  const headPart = headCount != null ? ` (${headCount}명)` : "";

  return `${dateStr} / ${timePart}${headPart}`;
};
