function MainContainer() {
  return (
    <div className="rounded-xl bg-gradient-to-br from-gray-400 via-gray-400 to-gray-700 p-6 shadow-2xl">
      <div className="rounded-md bg-black p-[4px]">
        <div className="grid aspect-[1/2] w-[500px] grid-cols-10 grid-rows-[repeat(20,minmax(0,1fr))] gap-[1px]">
          {Array.from({ length: 200 }).map((_, i) => (
            <div
              key={i}
              className={`h-full w-full ${
                (Math.floor(i / 10) + (i % 10)) % 2 === 0
                  ? "bg-neutral-800"
                  : "bg-neutral-900"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
