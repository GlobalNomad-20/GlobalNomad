import ReservationStatusContent from "./ReservationStatusContent";

import Modal from "@/components/common/Modal";
import { useKeyPress } from "@/hooks/useKeyPress";

interface StatusModalProps {
  activityId: number;
  date: string;
  onClose: () => void;
}

const StatusModal = ({ activityId, date, onClose: handleClose }: StatusModalProps) => {
  useKeyPress("Escape", handleClose);

  return (
    <Modal position="bottom" isOpen={true} onClose={handleClose}>
      <ReservationStatusContent activityId={activityId} date={date} onClose={handleClose} />
    </Modal>
  );
};

export default StatusModal;
