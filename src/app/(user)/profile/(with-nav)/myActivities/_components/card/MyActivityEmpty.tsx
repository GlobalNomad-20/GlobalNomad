import Image from "next/image";

const MyActivityEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative mb-6 h-40 w-40">
        <Image src="/image/emptyEarth.png" alt="예약 내역 없음" fill className="object-contain" />
      </div>
      <p className="typo-18-m mb-7.5 text-gray-600">아직 등록한 체험이 없습니다.</p>
    </div>
  );
};

export default MyActivityEmpty;
