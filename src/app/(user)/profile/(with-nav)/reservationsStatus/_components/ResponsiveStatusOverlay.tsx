"use client";

import StatusModal from "./modal/StatusModal";
import StatusPopup from "./popup/StatusPopup";

import { MEDIA_QUERY } from "@/constants/mediaQurery";
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
  const isTablet = useMediaQuery(MEDIA_QUERY.MAX_TABLET);

  if (isTablet) {
    return <StatusModal activityId={activityId} date={date} onClose={handleClose} />;
  }

  return (
    <StatusPopup activityId={activityId} date={date} anchorEl={anchorEl} onClose={handleClose} />
  );
};

export default ResponsiveStatusOverlay;
