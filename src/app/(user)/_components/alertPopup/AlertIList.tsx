import { InfiniteData } from "@tanstack/react-query";
import { FreeMode, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { extractStatus } from "../../_utils/string";

import AlertItem from "./AlertItem";

import { NotificationResponse } from "@/types/notification";
import { getRelativeTime } from "@/utils/date";

interface NotificationListProps {
  isEmpty: boolean;
  data: InfiniteData<NotificationResponse, unknown> | undefined;
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
                content={noti.content}
                status={extractStatus(noti.content)}
                createdAt={getRelativeTime(noti.createdAt)}
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
