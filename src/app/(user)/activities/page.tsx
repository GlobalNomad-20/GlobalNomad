import ActivityCard from "@/app/_components/ActivityCard";
import Banner from "@/app/_components/Banner";
import SearchBar from "@/app/_components/SearchBar";

const Activities = () => {
  return (
    <div className="bg-white">
      <section className="relative bg-linear-to-b from-[#BBDDFF] via-[#F7FBFF] to-white">
        <div className="relative overflow-hidden">
          <img
            src="/image/cloud.svg"
            alt="구름"
            className="absolute top-6 left-0 z-0 w-[200vw] max-w-none opacity-90 md:w-[1600px]"
          />
        </div>
        <div
          className="relative z-10 mt-[74px] flex flex-col items-center justify-center md:mt-[103px]
            md:mb-[204px] lg:mb-[218px]"
        >
          <Banner />
          <div
            className="justify-center·gap-3 mb-10 flex h-29 w-81.75 flex-col items-center md:mt-7.5
              md:mb-15 md:h-52 md:w-171 md:gap-9 lg:mt-12.5 lg:w-260"
          >
            <div className="typo-16-b md:typo-32-b mt-[33px] mb-3 text-gray-950">
              무엇을 체험하고 싶으신가요?
            </div>
            <SearchBar />
          </div>
          <div className="flex w-[327px] flex-col gap-3.5 md:w-171 md:gap-4 md:gap-5 lg:w-280">
            <div className="typo-18-b md:typo-32-b">🔥 인기 체험</div>
            <div className="flex gap-3 overflow-hidden overflow-scroll md:gap-5 lg:gap-6">
              <ActivityCard />
              <ActivityCard />
              <ActivityCard />
              <ActivityCard />
              <ActivityCard />
              <ActivityCard />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Activities;
