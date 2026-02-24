import axios from "axios";

import WarningSvg from "@/assets/svg/WarningSvg";
import Button from "@/components/common/Button";
import { useDeleteActivity } from "@/hooks/queries/useMyActivities";

interface ActivityDeleteModalProps {
  onCancel: () => void;
  onComplete: () => void;
  activityId?: number;
}

const ActivityDeleteModal = ({
  onCancel: handleClose,
  onComplete,
  activityId,
}: ActivityDeleteModalProps) => {
  const { mutate, isPending } = useDeleteActivity();

  const handleClickDelete = () => {
    if (!activityId) return;

    mutate(activityId, {
      onSuccess: () => {
        onComplete();
      },
      onError: (err: unknown) => {
        if (axios.isAxiosError(err)) {
          const status = err.response?.status;
          const message = err.response?.data?.message;

          if (status === 403) {
            alert(message ?? "본인의 체험만 삭제할 수 있습니다.");
            return;
          }
        }
        alert("삭제 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      },
    });
  };
  return (
    <div className="flex h-full flex-col items-center justify-center p-6">
      <div>
        <WarningSvg className="h-12.25 w-12.25 md:h-22 md:w-22" />
      </div>
      <p className="typo-16-b md:typo-18-b mb-4 text-center leading-normal md:mb-6">
        체험을 삭제하시겠습니까?
      </p>
      <div className="flex gap-3">
        <Button onClick={handleClose} variant="outline">
          아니오
        </Button>
        <Button onClick={handleClickDelete}>{isPending ? "삭제 중..." : "네"}</Button>
      </div>
    </div>
  );
};

export default ActivityDeleteModal;
