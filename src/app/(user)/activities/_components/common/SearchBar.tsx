"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import SearchSvg from "@/assets/svg/SearchSvg";
import Button from "@/components/common/Button";

const SearchBar = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/activities/search?q=${value}`);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-13.25 w-full items-center rounded-2xl bg-white pt-1.5 pr-2 pb-1.5 pl-5
        shadow-[0_6px_10px_rgba(13,153,255,0.05)] focus-within:shadow-lg focus-within:shadow-sky-100
        md:h-17.5 md:pt-2.5 md:pr-3 md:pb-2.5 md:pl-8 lg:rounded-3xl"
    >
      <SearchSvg className="h-4 w-4 text-gray-500" />
      <input
        type="text"
        placeholder="내가 원하는 체험은"
        className="typo-14-m md:typo-18-m mx-2 flex-1 px-2 text-gray-500 outline-none"
        value={value}
        onChange={handleChange}
      />
      <Button
        type="submit"
        variant="primary"
        className="md:typo-16-b h-10.25 w-21.25 active:bg-sky-600 md:h-12.5 md:w-30"
      >
        검색하기
      </Button>
    </form>
  );
};

export default SearchBar;
