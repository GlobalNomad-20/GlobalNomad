import Image from "next/image";

const EmptyReservationSection = () => {
  return (
    <section className="flex w-full flex-col items-center">
      <div className="relative size-45.5">
        <Image src="/image/emptyEarth.png" className="absolute object-cover" fill alt="빈 지구" />
      </div>
      <p className="typo-18-m text-gray-600">아직 등록된 체험이 없어요</p>
    </section>
  );
};

export default EmptyReservationSection;
