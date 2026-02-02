import { RESERVATION_STATUS_BADGES } from "@/constants/reservationBadgeItem";

const baseStyle = `typo-16-m flex h-10 min-w-25 items-center justify-center rounded-4xl border border-[#D8D8D8]`;
const ReservationBadge = () => {
  return (
    <div className="mb-3 flex gap-2 overflow-x-auto md:mb-7.5 md:overflow-x-visible">
      <div className={baseStyle}>{RESERVATION_STATUS_BADGES.pending.label}</div>
      <div className={baseStyle}>{RESERVATION_STATUS_BADGES.canceled.label}</div>
      <div className={baseStyle}>{RESERVATION_STATUS_BADGES.confirmed.label}</div>
      <div className={baseStyle}>{RESERVATION_STATUS_BADGES.declined.label}</div>
      <div className={baseStyle}>{RESERVATION_STATUS_BADGES.completed.label}</div>
    </div>
  );
};

export default ReservationBadge;
