import Image from "next/image";

const Banner = () => {
  return (
    <div
      className="relative h-[181px] w-[327px] shadow-[0px_4px_24px_0px_rgba(156,180,202,0.2)]
        md:h-[375px] md:w-[684px] lg:h-[500px] lg:w-[1120px]"
    >
      <Image
        src="/image/banner.jpg"
        alt="배너 이미지"
        fill
        className="h-full w-full rounded-xl object-cover"
      />
      <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-black/0 to-black/40" />
      <div
        className="absolute bottom-[36px] left-1/2 flex w-max -translate-x-1/2 flex-col items-center
          gap-2 text-[color:var(--color-white)] md:bottom-18 md:gap-[13px] lg:bottom-[101px]
          lg:gap-[19px]"
      >
        {" "}
        <div className="typo-18-b md:typo-24-b lg:typo-32-b">함께 배우면 즐거운 스트릿 댄스</div>
        <div className="typo-14-m md:typo-16-b lg:typo-18-b">1월의 인기 체험 BEST🔥</div>
      </div>
    </div>
  );
};

export default Banner;
