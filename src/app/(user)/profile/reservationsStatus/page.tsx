import ReservationContent from "./_components/ReservationContent";

import { CalendarEvent } from "@/components/calenderView/CalendarEventItem";

const ReservationsStatusPage = () => {
  const myEvents: Record<string, CalendarEvent[]> = {
    "2026-02-14": [{ id: 1, title: "예약 2", type: "예약" }],
  };

  return (
    <div className="mb-3.5 w-full pt-7.5 md:mb-24 md:p-0">
      <div className="mb-11 px-6 py-2.5 md:px-0">
        <h2 className="typo-18-b mb-2.5">예약 현황</h2>
        <p className="typo-14-m text-gray-500">
          내 체험에 예약된 내역들을 한 눈에 확인할 수 있습니다.
        </p>
      </div>
      <ReservationContent reservations={myEvents} />
    </div>
  );
};

export default ReservationsStatusPage;
