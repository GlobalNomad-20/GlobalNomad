import EmptyReservationSection from "./_components/EmptyReservationSection";

const ReservationsStatusPage = () => {
  return (
    <div className="w-full">
      <div className="mb-11 py-2.5">
        <h2 className="typo-18-b mb-2.5">예약 현황</h2>
        <p className="typo-14-m text-gray-500">
          내 체험에 예약된 내역들을 한 눈에 확인할 수 있습니다.
        </p>
      </div>
      <EmptyReservationSection />
    </div>
  );
};

export default ReservationsStatusPage;
