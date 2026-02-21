import CreateMyActivityButton from "./_components/CreateMyActivityButton";
import MyActivityList from "./_components/MyActivityList";

const MyActivitiesPage = () => {
  return (
    <div className="w-full px-6 pt-8.75 pb-8.75 md:p-0">
      <div className="mb-7.5 flex items-center justify-between py-2.5">
        <div>
          <h3 className="typo-18-b mb-2.5">내 체험 관리</h3>
          <p className="typo-14-m text-gray-500">체험을 등록하거나 수정 및 삭제가 가능합니다.</p>
        </div>
        <CreateMyActivityButton />
      </div>
      <MyActivityList />
    </div>
  );
};

export default MyActivitiesPage;
