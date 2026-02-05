import { redirect } from "next/navigation";

import { ROUTES } from "@/constants/routes";

const Home = () => {
  redirect(ROUTES.ACTIVITIES.ROOT);
};

export default Home;
