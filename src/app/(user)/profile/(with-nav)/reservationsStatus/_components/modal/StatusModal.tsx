import Modal from "@/components/common/Modal";

interface StatusModalProps {
  activityId: number;
  date: string;
  onClose: () => void;
}

const StatusModal = ({ activityId, date, onClose: handleClose }: StatusModalProps) => {
  return (
    <Modal position="bottom" isOpen={true} onClose={handleClose}>
      <div>Activity ID: {activityId}</div>
      <div>Date: {date}</div>
    </Modal>
  );
};

export default StatusModal;
