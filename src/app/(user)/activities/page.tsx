import Banner from "@/app/_components/Banner";
import SearchBar from "@/app/_components/SearchBar";

const Activities = () => {
  return (
    <div className="bg-white">
      <section
        className="relative h-[450px] overflow-hidden bg-linear-to-b from-[#BBDDFF] via-[#F7FBFF]
          to-white md:h-300"
      >
        <img
          src="/image/cloud.svg"
          alt="구름"
          className="absolute top-6 left-0 z-0 w-[200vw] max-w-none opacity-90 md:w-[1600px]"
        />
        <div
          className="relative z-10 mt-[74px] mb-[136px] flex flex-col items-center justify-center
            md:mt-7.5 md:mb-15 lg:mb-[218px]"
        >
          <Banner />
          <div
            className="justify-center·gap-3 flex h-29 w-81.75 flex-col items-center md:mt-7.5
              md:mb-15 md:h-52 md:w-171 md:gap-9 lg:mt-12.5 lg:w-260"
          >
            <div className="typo-16-b md:typo-32-b mt-[33px] mb-3 text-gray-950">
              무엇을 체험하고 싶으신가요?
            </div>
            <SearchBar />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Activities;
