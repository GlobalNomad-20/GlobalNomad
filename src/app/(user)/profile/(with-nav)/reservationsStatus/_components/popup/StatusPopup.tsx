interface StatusPopupProps {
  activityId: number;
  date: string;
  onClose: () => void;
}

const StatusPopup = ({ activityId, date, onClose: handleClose }: StatusPopupProps) => {
  return (
    <button
      // eslint-disable-next-line react/jsx-handler-names
      onClick={() => {
        return handleClose();
      }}
    >
      {activityId}
      {date}
    </button>
  );
};

export default StatusPopup;
