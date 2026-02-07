import StarSvg from "@/assets/svg/StarSvg";

const ReviewCard = () => {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-[0px_4px_24px_0px_rgba(156,180,202,0.2)]">
      <div className="mb-1 flex gap-2">
        <div className="typo-14-b md:typo-16-b text-gray-950">김태현</div>
        <div className="typo-12-b md:typo-14-b text-[#A4A1AA]">2026.2.6</div>
      </div>
      <div className="mb-2 flex md:mb-3">
        <StarSvg className="h-4 w-4" />
        <StarSvg className="h-4 w-4" />
        <StarSvg className="h-4 w-4" />
        <StarSvg className="h-4 w-4" />
        <StarSvg className="h-4 w-4" />
      </div>
      <div className="typo-14-m md:typo-16-m leading-[1.8]! text-gray-950">
        저는 저희 스트릿 댄서 체험에 참가하게 된 지 얼마 안됐지만, 정말 즐거운 시간을 보냈습니다.
        새로운 스타일과 춤추기를 좋아하는 나에게 정말 적합한 체험이었고, 전문가가 직접 강사로
        참여하기 때문에 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있었습니다. 강사님께서 정말
        친절하게 설명해주셔서 정말 좋았고, 이번 체험을 거쳐 새로운 스타일과 춤추기에 대한 열정이
        더욱 생겼습니다. 저는 이 체험을 적극 추천합니다!
      </div>
    </div>
  );
};

export default ReviewCard;
