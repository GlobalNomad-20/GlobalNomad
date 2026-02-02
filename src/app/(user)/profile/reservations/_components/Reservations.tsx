import ReservationBadge from "./badge/ReservationBadge";
import ReservationCard from "./card/ReservationCard";

const Reservations = () => {
  return (
    <section>
      <div className="mb-5 py-2.5">
        <h3 className="typo-18-b mb-2.5">예약 내역</h3>
        <p className="typo-14-m text-gray-500">예약내역 변경 및 취소할 수 있습니다.</p>
      </div>
      <ReservationBadge />
      <ReservationCard />
    </section>
  );
};

export default Reservations;
