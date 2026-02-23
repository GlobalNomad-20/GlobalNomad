import ActivityBrowseSection from "./_components/sections/main/ActivityBrowseSection";
import BannerSection from "./_components/sections/main/BannerSection";
import PopularActivitySection from "./_components/sections/main/PopularActivitySection";
import SearchSection from "./_components/sections/main/SearchSection";

const Activities = () => {
  return (
    <div className="bg-white">
      <div className="relative h-200 md:h-350">
        <div className="absolute inset-0 z-0 bg-linear-to-b from-[#BBDDFF] via-[#F7FBFF] to-white" />
        <div className="absolute top-0 left-0 z-10 h-35 w-full overflow-hidden md:h-70 lg:h-105">
          <div
            className="h-full w-full transform-gpu animate-[cloud-float_6s_ease-in-out_infinite]
              will-change-transform"
          >
            <div
              className="h-full w-full animate-[cloud-scroll_120s_linear_infinite]
                [background-image:url('/image/cloud.svg')] bg-size-[var(--cloud-tile-w-scaled)_100%]
                bg-position-[0_100%] bg-repeat-x opacity-90 will-change-[background-position]"
            />
          </div>
        </div>
      </div>
      <div
        className="relative z-20 -mt-200 flex flex-col items-center pt-18.5 pb-34 md:-mt-350
          md:pt-25.75 md:pb-51 lg:pb-54.5"
      >
        <BannerSection />
        <SearchSection />
        <PopularActivitySection />
        <ActivityBrowseSection />
      </div>
    </div>
  );
};

export default Activities;
