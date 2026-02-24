import ReservationList from "./_components/ReservationList";

const ReservationsPage = () => {
  return (
    <div className="w-full min-w-0 px-6 pt-8.75 pb-8.75 md:p-0">
      <div className="mb-5 py-2.5">
        <h3 className="typo-18-b mb-2.5">예약 내역</h3>
        <p className="typo-14-m text-gray-500">예약내역 변경 및 취소할 수 있습니다.</p>
      </div>
      <ReservationList />
    </div>
  );
};

export default ReservationsPage;
