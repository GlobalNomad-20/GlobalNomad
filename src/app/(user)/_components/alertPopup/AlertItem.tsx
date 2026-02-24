import RenderHighlightedText from "./RenderHighlightedText";

import { cn } from "@/utils/cn";

interface AlertItemProps {
  id: number;
  content: string;
  status: string;
  createdAt: string;
  isRead?: boolean;
  onDelete: (id: number) => void;
}

const AlertItem = ({ id, status, content, createdAt, onDelete }: AlertItemProps) => {
  const isApproved = status === "승인";

  return (
    <button
      // eslint-disable-next-line react/jsx-handler-names
      onClick={() => {
        return onDelete(id);
      }}
      className="group w-full text-left hover:cursor-pointer"
    >
      <div
        className={cn("px-5 py-4 transition-colors", isApproved ? "bg-primary-100" : "bg-white")}
      >
        <div className="mb-2 flex justify-between">
          <div className={cn("typo-14-b")}>예약 {status}</div>
          <div className="typo-12-m text-gray-400">{createdAt}</div>
        </div>
        <div className="typo-14-body-m text-gray-950">
          <p>{RenderHighlightedText(content)}</p>
        </div>
      </div>
    </button>
  );
};

export default AlertItem;
