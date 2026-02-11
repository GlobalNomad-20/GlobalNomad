import Image from "next/image";
import Link from "next/link";

import Button from "@/components/common/Button";

const ReservationEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative mb-6 h-40 w-40">
        <Image src="/image/emptyEarth.png" alt="예약 내역 없음" fill className="object-contain" />
      </div>
      <p className="typo-18-m mb-7.5 text-gray-600">아직 예약한 체험이 없습니다.</p>
      <Button className="w-46">
        <Link href={"/activities"}>둘러보기</Link>
      </Button>
    </div>
  );
};

export default ReservationEmpty;
