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
      <div>Activity ID: {activityId}</div>
      <div>Date: {date}</div>
    </Modal>
  );
};

export default StatusModal;
