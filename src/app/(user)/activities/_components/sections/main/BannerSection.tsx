import Image from "next/image";

const BannerSection = () => {
  return (
    <div
      className="relative h-45.25 w-81.75 shadow-[0px_4px_24px_0px_rgba(156,180,202,0.2)] md:h-93.75
        md:w-171 lg:h-125 lg:w-280"
    >
      <Image
        src="/image/banner.jpg"
        alt="배너 이미지"
        fill
        className="h-full w-full rounded-xl object-cover"
      />
      <div className="absolute inset-0 rounded-xl bg-linear-to-b from-black/0 to-black/40" />
      <div
        className="absolute bottom-9 left-1/2 flex w-max -translate-x-1/2 flex-col items-center
          gap-2 text-white md:bottom-18 md:gap-3.25 lg:bottom-25.25 lg:gap-4.75"
      >
        <div className="typo-18-b md:typo-24-b lg:typo-32-b">함께 배우면 즐거운 스트릿 댄스</div>
        <div className="typo-14-m md:typo-16-b lg:typo-18-b">2월의 인기 체험 BEST🔥</div>
      </div>
    </div>
  );
};

export default BannerSection;
