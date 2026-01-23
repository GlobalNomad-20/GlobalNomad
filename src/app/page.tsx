const Home = () => {
  return (
    <main className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Pretendard 적용 테스트</h1>
      <section className="space-y-3">
        <div className="space-y-4 p-6">
          <h1 className="typo-32-b">메인 타이틀</h1>
          <h2 className="typo-20-b text-primary-500">섹션 타이틀</h2>
          <p className="typo-14-m text-gray-600">이 텍스트는 보조 설명용 문구입니다.</p>
        </div>
      </section>
      <article className="space-y-6 p-6">
        <h1 className="typo-24-b">서비스 소개</h1>
        <p className="typo-14-body-m text-gray-700">다람쥐 헌 쳇바퀴에 타고파 123 ABC abc</p>
        <p className="typo-16-body-m text-gray-700">다람쥐 헌 쳇바퀴에 타고파 123 ABC abc</p>
      </article>
    </main>
  );
};

export default Home;
