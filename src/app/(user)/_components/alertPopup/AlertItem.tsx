const AlertItem = () => {
  return (
    <div className="bg-primary-100 px-5 py-4">
      <div className="mb-2 flex justify-between">
        <div className="typo-14-b text-gray-950">예약 승인</div>
        <div className="typo-12-m text-gray-400">1분 전</div>
      </div>
      <div className="typo-14-body-m">
        <div>함께하면 즐거운 스트릿 댄스</div>
        <div>{`(2023-01-14 15:00~18:00)`}</div>
        <div>
          {" "}
          예약이 <span className="text-primary-500">승인</span>되었어요.
        </div>
      </div>
    </div>
  );
};

export default AlertItem;
