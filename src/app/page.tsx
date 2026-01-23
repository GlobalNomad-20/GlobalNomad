const Home = () => {
  return (
    <main className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Pretendard 적용 테스트</h1>
      <section className="space-y-3">
        <p className="text-sm opacity-80">
          아래는 <b>font-sans</b> 기준으로 렌더링돼. 굵기별로 Pretendard 파일이 잘 매칭되면 글자
          굵기가 자연스럽게 바뀌어야 해.
        </p>

        <button className="bg-primary-500 rounded-lg px-4 py-2">Primary 버튼</button>
        <p className="text-gray-600">서브 텍스트</p>

        <p className="text-red-500">에러 텍스트</p>
        <div className="space-y-2 rounded-xl border p-4">
          <p className="font-sans text-xl font-thin">
            100 Thin — 다람쥐 헌 쳇바퀴에 타고파 123 ABC abc
          </p>
          <p className="font-sans text-xl font-extralight">
            200 ExtraLight — 다람쥐 헌 쳇바퀴에 타고파 123 ABC abc
          </p>
          <p className="font-sans text-xl font-light">
            300 Light — 다람쥐 헌 쳇바퀴에 타고파 123 ABC abc
          </p>
          <p className="font-sans text-xl font-normal">
            400 Regular — 다람쥐 헌 쳇바퀴에 타고파 123 ABC abc
          </p>
          <p className="font-sans text-xl font-medium">
            500 Medium — 다람쥐 헌 쳇바퀴에 타고파 123 ABC abc
          </p>
          <p className="font-sans text-xl font-semibold">
            600 SemiBold — 다람쥐 헌 쳇바퀴에 타고파 123 ABC abc
          </p>
          <p className="font-sans text-xl font-bold">
            700 Bold — 다람쥐 헌 쳇바퀴에 타고파 123 ABC abc
          </p>
          <p className="font-sans text-xl font-extrabold">
            800 ExtraBold — 다람쥐 헌 쳇바퀴에 타고파 123 ABC abc
          </p>
          <p className="font-sans text-xl font-black">
            900 Black — 다람쥐 헌 쳇바퀴에 타고파 123 ABC abc
          </p>
        </div>
      </section>
    </main>
  );
};

export default Home;
