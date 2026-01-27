import Banner from "@/app/_components/Banner";

const Activities = () => {
  return (
    <div className="bg-white">
      <section
        className="relative h-[450px] overflow-hidden bg-gradient-to-b from-[#BBDDFF] via-[#F7FBFF]
          to-white md:h-[800px]"
      >
        <img
          src="/image/cloud.svg"
          alt="구름"
          className="absolute top-6 left-0 z-0 w-[200vw] max-w-none opacity-90 md:w-[1600px]"
        />
        <div
          className="relative z-10 mt-[74px] mb-[136px] flex justify-center md:mt-[103px]
            md:mb-[204px] lg:mb-[218px]"
        >
          <Banner />
        </div>
      </section>
    </div>
  );
};

export default Activities;
