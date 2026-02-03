import "swiper/css";
import "swiper/css/free-mode";

import NotificationList from "./AlertIList";

import AlertBellSvg from "@/assets/svg/AlertBellSvg";
import DeleteSvg from "@/assets/svg/DeleteSvg";
import {
  useDeleteMyNotification,
  useMyNotifications,
  useUnreadCount,
} from "@/hooks/queries/useNotifications";
import { usePopup } from "@/hooks/usePopup";
import { cn } from "@/utils/cn";

const AlertPopup = () => {
  const { data: unreadCount = 0 } = useUnreadCount();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useMyNotifications(5);
  const { mutate: handleDeleteNoti } = useDeleteMyNotification();
  const { popupRef, triggerRef, open, handleToggle, handleClose } = usePopup();

  const isEmpty = !data?.pages || data.pages[0]?.notifications.length === 0;

  const handleReachEnd = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <div className="static md:relative">
      <button ref={triggerRef} onClick={handleToggle} className="relative p-1 text-gray-600">
        <AlertBellSvg
          className={cn("transition-colors", open && "text-primary-500")}
          activeColor={unreadCount === 0 ? "currentColor" : "#FF2727"}
        />
      </button>
      {open && (
        <div
          ref={popupRef}
          className={cn(
            `absolute z-50 flex flex-col rounded-lg bg-white pb-2
            shadow-[0_4px_24px_0_rgba(156,180,202,0.2)]`,
            "top-16 right-6 left-6",
            "md:top-10 md:right-0 md:left-auto md:w-92",
          )}
        >
          <div className="flex items-center justify-between border-b border-gray-100 px-5 pt-4 pb-2">
            <h4 className="typo-16-b text-gray-900">
              알림 <span className="text-primary-500">{unreadCount}</span>
            </h4>
            <button
              className="text-gray-400 transition-colors hover:text-gray-600"
              onClick={handleClose}
            >
              <DeleteSvg />
            </button>
          </div>
          <NotificationList
            isEmpty={isEmpty}
            data={data}
            isFetchingNextPage={isFetchingNextPage}
            onReachEnd={handleReachEnd}
            onDelete={handleDeleteNoti}
          />
        </div>
      )}
    </div>
  );
};

export default AlertPopup;
