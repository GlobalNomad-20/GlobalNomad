import Image from "next/image";
import { useState } from "react";
import { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";

import ActivityDeleteConfirmModal from "./ActivityDeleteConfirmModal";

import Button from "@/components/common/Button";
import { cn } from "@/utils/cn";
import Modal from "@/components/common/Modal";
import { useDeleteActivity } from "@/hooks/queries/useMyActivities";
import { myActivitiesKeys, activityIdKeys } from "@/lib/query/queryKeys";

interface ActivityDeleteModalProps {
  activityId: number;
  isOpen: boolean;
  onClose: () => void;
  onBackgroundClick?: () => void;
}

const ActivityDeleteModal = ({
  activityId,
  isOpen,
  onClose: handleClose,
  onBackgroundClick: handleBackgroundClick,
}: ActivityDeleteModalProps) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { mutate: deleteActivity, isPending } = useDeleteActivity();
  const queryClient = useQueryClient();

  const handleConfirmClose = () => {
    queryClient.invalidateQueries({ queryKey: myActivitiesKeys.list() });
    queryClient.invalidateQueries({ queryKey: activityIdKeys.detail(activityId) });
    setIsSuccess(false);
    handleClose();
  };

  const handleSafeClose = () => {
    if (isPending) return;
    if (isSuccess) {
      handleConfirmClose();
      return;
    }
    setIsSuccess(false);
    handleClose();
  };

  const handleSafeBackgroundClick = () => {
    if (isPending) return;
    if (isSuccess) {
      handleConfirmClose();
      return;
    }
    if (handleBackgroundClick) handleBackgroundClick();
    else handleSafeClose();
  };

  const handleRequest = () => {
    deleteActivity(activityId, {
      onSuccess: () => {
        setIsSuccess(true);
      },
      onError: (error: Error) => {
        let errorMessage = "내 체험 삭제 중 오류가 발생했습니다.";

        if (error instanceof AxiosError) {
          errorMessage = error.response?.data?.message || error.message || errorMessage;
        } else {
          errorMessage = error.message || errorMessage;
        }

        alert(errorMessage);
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleSafeClose}
      onBackgroundClick={handleSafeBackgroundClick}
      containerClassName="h-46 w-80 md:h-60.5 md:w-100 m-5"
    >
      {isSuccess ? (
        <ActivityDeleteConfirmModal onClose={handleConfirmClose} />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-5 md:gap-6">
          <div className="flex flex-col items-center justify-center">
            <Image
              width={88}
              height={88}
              src="/image/warning.png"
              alt="경고 이미지"
              className="h-12 w-12 md:h-22 md:w-22"
            />
            <div className="typo-16-b md:typo-18-b">내 체험을 삭제하시겠어요?</div>
          </div>
          <div className="flex gap-2 md:gap-3">
            <Button
              onClick={handleSafeClose}
              variant="outline"
              className="typo-14-m md:typo-16-m h-10 w-28 md:h-12 md:w-34"
            >
              아니오
            </Button>
            <Button
              onClick={handleRequest}
              disabled={isPending}
              className={cn(
                "typo-14-m md:typo-16-m h-10 w-28 md:h-12 md:w-34",
                "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400",
                "disabled:border-none disabled:shadow-none",
              )}
            >
              {isPending ? "삭제 중..." : "삭제하기"}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ActivityDeleteModal;
