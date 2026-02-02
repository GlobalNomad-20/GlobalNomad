import SearchBar from "../common/SearchBar";

const SearchSection = () => {
  return (
    <div
      className="justify-center·gap-3 mb-10 flex h-29 w-81.75 flex-col items-center md:mt-7.5
        md:mb-15 md:h-52 md:w-171 md:gap-9 lg:mt-12.5 lg:w-260"
    >
      <div className="typo-16-b md:typo-32-b mt-[33px] mb-3 text-gray-950">
        무엇을 체험하고 싶으신가요?
      </div>
      <SearchBar />
    </div>
  );
};

export default SearchSection;
