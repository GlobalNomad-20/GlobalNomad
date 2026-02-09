import { SearchParams } from "next/dist/server/request/search-params";

import { ErrorContent } from "@/app/(auth)/auth/error/_components/ErrorContent";

const Page = async ({ searchParams }: { searchParams: Promise<SearchParams> }) => {
  const params = await searchParams;
  const message = params["message"] as string | undefined;
  return <ErrorContent message={message} />;
};

export default Page;
