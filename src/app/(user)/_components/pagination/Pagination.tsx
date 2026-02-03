import PaginationNext from "@/assets/svg/PaginationNext";
import PaginationPrev from "@/assets/svg/PaginationPrev";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
  const handleClickPrev = () => {
    onPageChange(Math.max(currentPage - 1, 1));
  };

  const handleClickNext = () => {
    onPageChange(Math.min(currentPage + 1, totalPages));
  };

  const handleClick = (num: number) => {
    onPageChange(num);
  };

  return (
    <div className="mt-4 flex justify-center">
      <div className="flex items-center gap-2">
        <button
          onClick={handleClickPrev}
          disabled={currentPage === 1}
          className="mr-3.5 cursor-pointer disabled:text-gray-300"
        >
          <PaginationPrev />
        </button>

        {Array.from({ length: totalPages }, (_, i) => {
          return i + 1;
        }).map((num) => {
          return (
            <button
              key={num}
              // eslint-disable-next-line react/jsx-handler-names
              onClick={() => {
                return handleClick(num);
              }}
              className={`typo-14-b h-6 w-6 cursor-pointer leading-6 hover:text-gray-600
              ${num === currentPage ? "border-b-primary-500 border-b-2 text-gray-950" : "text-gray-300"}`}
            >
              {num}
            </button>
          );
        })}

        <button
          onClick={handleClickNext}
          disabled={currentPage >= totalPages}
          className="ml-3.5 cursor-pointer disabled:text-gray-300"
        >
          <PaginationNext />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
