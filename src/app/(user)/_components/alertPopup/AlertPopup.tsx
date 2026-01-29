import clsx from "clsx";

import AlertItem from "./AlertItem";

import AlertBellSvg from "@/assets/svg/AlertBellSvg";
import DeleteSvg from "@/assets/svg/DeleteSvg";
import { usePopup } from "@/hooks/usePopup";

const AlertPopup = () => {
  const { popupRef, triggerRef, open, handleToggle, handleClose } = usePopup();

  return (
    <div className="static md:relative">
      <button ref={triggerRef} onClick={handleToggle}>
        <AlertBellSvg className={clsx(open && "text-primary-500")} />
      </button>
      {open && (
        <div
          ref={popupRef}
          className={clsx(
            `absolute top-15.5 right-6 left-6 z-50 flex flex-col rounded-lg bg-white pb-2
            shadow-[0_4px_24px_0_rgba(156,180,202,0.2)] md:top-10 md:-right-1.25 md:left-auto
            md:w-57.75`,
          )}
        >
          <div className="mb-3.5 flex items-center justify-between px-5 pt-4">
            <h4 className="typo-16-b h-fit">알림 6개</h4>
            <button className="cursor-pointer" onClick={handleClose}>
              <DeleteSvg />
            </button>
          </div>
          <AlertItem />
          <AlertItem />
        </div>
      )}
    </div>
  );
};

export default AlertPopup;
