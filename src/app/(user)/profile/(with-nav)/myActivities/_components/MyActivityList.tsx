"use client";

import { motion } from "framer-motion";

import useMyActivityList from "../_hook/useMyActivityList";

import MyActivityCard from "./card/MyActivityCard";
import MyActivityEmpty from "./card/MyActivityEmpty";
import MyActivitySkeleton from "./card/MyActivitySkeleton";

import { cn } from "@/utils/cn";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const MyActivityList = () => {
  const {
    handleReachEnd,
    isInitialEmpty,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    error,
    pages,
  } = useMyActivityList();

  const { targetRef } = useIntersectionObserver({
    onIntersect: handleReachEnd,
    enabled: !!hasNextPage && !isFetchingNextPage,
  });

  if (isLoading) {
    return (
      <div className="mb-10 space-y-7.5">
        {Array.from({ length: 3 }).map((_, i) => {
          return <MyActivitySkeleton key={i} />;
        })}
      </div>
    );
  }

  if (isInitialEmpty) return <MyActivityEmpty />;

  if (error) {
    return (
      <div className="py-20 text-center text-red-500">에러가 발생했습니다: {error.message}</div>
    );
  }

  return (
    <section className={cn("flex flex-col", { "mb-55": isFetchingNextPage })}>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {pages?.map((page) => {
          return page.activities.map((myActivity) => {
            return <MyActivityCard key={myActivity.id} myActivity={myActivity} />;
          });
        })}

        <div ref={targetRef} className="h-10 w-full">
          {isFetchingNextPage && <MyActivitySkeleton />}
        </div>
      </motion.div>
    </section>
  );
};

export default MyActivityList;
