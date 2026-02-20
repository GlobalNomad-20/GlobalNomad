import { useEffect } from "react";

import ReservationStatusContent from "../statusContent/ReservationStatusContent";

import Modal from "@/components/common/Modal";
import { useModal } from "@/hooks/useModal";

interface StatusModalProps {
  activityId: number;
  date: string;
  onClose: () => void;
}

const StatusModal = ({ activityId, date, onClose: handleParentClose }: StatusModalProps) => {
  const { isOpen, onClose: handleHookClose } = useModal(true);

  useEffect(() => {
    if (!isOpen) {
      handleParentClose();
    }
  }, [isOpen, handleParentClose]);

  const handleClose = () => {
    handleHookClose();
  };

  return (
    <Modal position="bottom" isOpen={isOpen} onClose={handleClose}>
      <ReservationStatusContent activityId={activityId} date={date} onClose={handleClose} />
    </Modal>
  );
};

export default StatusModal;
