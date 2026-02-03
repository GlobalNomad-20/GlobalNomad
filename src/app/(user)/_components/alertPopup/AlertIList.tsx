import { InfiniteData } from "@tanstack/react-query";
import { FreeMode, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import AlertItem from "./AlertItem";

import { NotificationResponse } from "@/types/notification";
import { formatScheduleRange, getRelativeTime } from "@/utils/date";
// 필요한 다른 import들 (AlertItem, getRelativeTime 등)은 상위에서 가져왔다고 가정합니다.

interface NotificationListProps {
  isEmpty: boolean;
  data: InfiniteData<NotificationResponse, unknown> | undefined; // 실제 데이터 타입으로 교체 필요 (예: InfiniteData<Page>)
  isFetchingNextPage: boolean;
  onReachEnd: () => void;
  onDelete: (id: number) => void;
}

const NotificationList = ({
  isEmpty,
  data,
  isFetchingNextPage,
  onReachEnd: handleReachEnd,
  onDelete: handleDeleteNoti,
}: NotificationListProps) => {
  if (isEmpty) {
    return (
      <div className="typo-14-m flex h-40 flex-col items-center justify-center text-gray-400">
        <p>새로운 알림이 없습니다.</p>
      </div>
    );
  }

  return (
    <Swiper
      onReachEnd={handleReachEnd}
      direction="vertical"
      slidesPerView="auto"
      freeMode={true}
      mousewheel={true}
      observer={true}
      observeParents={true}
      modules={[FreeMode, Mousewheel]}
      className="h-64 w-full"
    >
      {data?.pages.map((page) => {
        return page.notifications.map((noti) => {
          return (
            <SwiperSlide key={noti.id} className="h-auto!">
              <AlertItem
                id={noti.id}
                title={noti.content}
                status={noti.content}
                createdAt={getRelativeTime(noti.createdAt)}
                scheduleDate={formatScheduleRange(noti.updatedAt)}
                onDelete={handleDeleteNoti}
              />
            </SwiperSlide>
          );
        });
      })}
      {isFetchingNextPage && (
        <SwiperSlide className="h-auto!">
          <div className="flex items-center justify-center py-4">
            <div
              className="border-t-primary-500 h-5 w-5 animate-spin rounded-full border-2
                border-gray-300"
            />
          </div>
        </SwiperSlide>
      )}
    </Swiper>
  );
};

export default NotificationList;
