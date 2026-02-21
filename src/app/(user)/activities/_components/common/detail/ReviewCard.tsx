import { formatDate } from "@/app/(user)/_utils/formatDate";
import StarSvg from "@/assets/svg/StarSvg";
import { Review } from "@/types/activityIdReviews";

interface ReviewCardProps {
  data?: Review;
}

const ReviewCard = ({ data }: ReviewCardProps) => {
  const formattedDate = formatDate(data?.createdAt);

  const rating = Math.trunc(data?.rating ?? 0);
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<StarSvg key={i} className="h-4 w-4" />);
  }

  return (
    <div className="w-full rounded-3xl bg-white p-5 shadow-[0px_4px_24px_0px_rgba(156,180,202,0.2)]">
      <div className="mb-1 flex gap-2">
        <div className="typo-14-b md:typo-16-b text-gray-950">{data?.user.nickname}</div>
        <div className="typo-12-b md:typo-14-b text-[#A4A1AA]">{formattedDate}</div>
      </div>
      <div className="mb-2 flex md:mb-3">{stars}</div>
      <div className="typo-14-m md:typo-16-m leading-[1.8]! text-gray-950">{data?.content}</div>
    </div>
  );
};

export default ReviewCard;
