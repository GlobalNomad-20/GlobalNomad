import KebabMenuSvg from "@/assets/svg/KebabMenuSvg";
import MapSvg from "@/assets/svg/MapSvg";
import StarSvg from "@/assets/svg/StarSvg";
import { cn } from "@/utils/cn";

interface ActivityHeaderSectionProps {
  isNotDesktop?: boolean;
}

const ActivityHeaderSection = ({ isNotDesktop = false }: ActivityHeaderSectionProps) => {
  return (
    <div
      className={cn(
        `flex w-81.75 items-start justify-between border-b border-gray-100 py-5 md:w-171 md:py-6
        lg:w-102.5`,
        isNotDesktop && "lg:hidden",
      )}
    >
      <div>
        <div
          className="typo-13-m md:typo-14-m mb-1 text-gray-700 md:mb-2.5 md:text-gray-950 lg:mb-2"
        >
          문화 · 예술
        </div>
        <div className="typo-18-b md:typo-24-b mb-4 text-gray-950 lg:mb-4.25">
          함께 배우면 즐거운 스트릿 댄스
        </div>
        <div className="mb-2.5 flex items-center justify-start gap-1.5">
          <StarSvg className="h-4 w-4" />
          <div className="typo-14-m flex gap-0.75 text-gray-700">
            <span>4.9 </span>
            <span>(293)</span>
          </div>
        </div>
        <div className="flex items-center justify-start gap-0.5">
          <MapSvg className="h-4 w-4" />
          <div className="typo-14-m text-gray-700">서울 중구 청계천로 100 10F</div>
        </div>
      </div>
      <div className="flex h-7 w-7 items-center justify-center">
        <KebabMenuSvg className="h-4 w-1" />
      </div>
    </div>
  );
};

export default ActivityHeaderSection;
