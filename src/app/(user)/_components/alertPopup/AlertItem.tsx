interface AlertItemProps {
  id: number;
  title: string;
  status: string;
  createdAt: string;
  scheduleDate: string;
  isRead?: boolean;
  onDelete: (id: number) => void;
}

const AlertItem = ({ id, status, title, createdAt, scheduleDate, onDelete }: AlertItemProps) => {
  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <button onClick={handleDelete} className="group w-full text-left">
      <div className="bg-primary-100 px-5 py-4">
        <div className="mb-2 flex justify-between">
          <div className="typo-14-b text-gray-950">예약 {status}</div>
          <div className="typo-12-m text-gray-400">{createdAt}</div>
        </div>
        <div className="typo-14-body-m">
          <h4>{title}</h4>
          <div>{scheduleDate}</div>
          <div>
            예약이 <span className="text-primary-500">{status}</span>되었어요.
          </div>
        </div>
      </div>
    </button>
  );
};

export default AlertItem;
