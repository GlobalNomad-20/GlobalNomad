import clsx from "clsx";

import AlertBellSvg from "@/assets/svg/AlertBellSvg";
import { usePopup } from "@/hooks/usePopup";

const AlertPopup = () => {
  const { popupRef, triggerRef, open, handleToggle } = usePopup();

  return (
    <div className="relative">
      <button ref={triggerRef} onClick={handleToggle}>
        <AlertBellSvg className={clsx(open && "text-primary-500")} />
      </button>
      {open && (
        <div
          ref={popupRef}
          className={clsx(
            "absolute top-full right-0 z-50 flex flex-col rounded-md border px-1 py-1.5",
            `bg-white shadow-[0_8px_24px_rgba(0,0,0,0.15)] dark:border-neutral-600
            dark:bg-neutral-800`,
          )}
        >
          <button>내부 컨텐츠</button>
        </div>
      )}
    </div>
  );
};

export default AlertPopup;
