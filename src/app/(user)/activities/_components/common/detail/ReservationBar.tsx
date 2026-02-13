import { motion } from "framer-motion";

import ReservationModal from "./ReservationModal";

import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { useModal } from "@/hooks/useModal";
import { ActivityDetailResponse } from "@/types/activityIdParams";

interface ReservationBarProps {
  data?: ActivityDetailResponse;
}

const ReservationBar = ({ data }: ReservationBarProps) => {
  const { isOpen, onOpen, onClose } = useModal();

  const handleOpen = () => {
    onOpen();
  };

  const handleCancel = () => {
    onClose();
  };

  const handleComplete = () => {
    onClose();
  };

  return (
    <div
      className="py flex h-31 w-full flex-col justify-center gap-3 border-t border-[#E6E6E6]
        bg-white px-6 py-4.5"
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-1.5">
          <div className="typo-18-b text-gray-950">₩ {data?.price}</div>
          <div className="typo-16-m text-[#79747E]">/ 1명</div>
        </div>
        <div
          className="typo-16-b text-primary-500 underline active:text-sky-600"
          onClick={handleOpen}
        >
          날짜 선택하기
        </div>
        {isOpen && (
          <Modal
            isOpen={isOpen}
            onClose={handleCancel}
            position="bottom"
            containerClassName="h-auto"
          >
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <ReservationModal onComplete={handleComplete} />
            </motion.div>
          </Modal>
        )}
      </div>
      <Button variant="disabled" className="typo-16-b w-full">
        예약하기
      </Button>
    </div>
  );
};

export default ReservationBar;
