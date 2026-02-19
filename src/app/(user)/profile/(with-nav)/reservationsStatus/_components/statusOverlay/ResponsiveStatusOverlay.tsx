"use client";

import StatusModal from "./StatusModal";
import StatusPopup from "./StatusPopup";

import { MEDIA_QUERY } from "@/constants/mediaQurery";
import { useReservedSchedule } from "@/hooks/queries/useMyActivities";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface ResponsiveStatusOverlayProps {
  activityId: number;
  date: string;
  anchorEl: HTMLElement;
  onClose: () => void;
}

const ResponsiveStatusOverlay = ({
  activityId,
  date,
  anchorEl,
  onClose: handleClose,
}: ResponsiveStatusOverlayProps) => {
  const { data } = useReservedSchedule(activityId, date);
  const isTablet = useMediaQuery(MEDIA_QUERY.MAX_TABLET);

  console.log(data);

  if (isTablet) {
    return <StatusModal activityId={activityId} date={date} onClose={handleClose} />;
  }

  return (
    <StatusPopup activityId={activityId} date={date} anchorEl={anchorEl} onClose={handleClose} />
  );
};

export default ResponsiveStatusOverlay;
