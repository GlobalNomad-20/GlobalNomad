import InputGroup from "../../_components/InputGroup";

import { fetchMyDetailActivityServer } from "@/api/activitiesServer";

interface MyActivityEditPageProps {
  params: Promise<{ id: string }>;
}

const MyActivityEditPage = async ({ params }: MyActivityEditPageProps) => {
  const { id } = await params;
  const activityId = Number(id);
  const detailActivityData = await fetchMyDetailActivityServer(activityId);

  return (
    <div>
      <h1 className="typo-18-b mb-6">내 체험 수정</h1>
      <InputGroup mode="edit" initialData={detailActivityData} />
    </div>
  );
};

export default MyActivityEditPage;
