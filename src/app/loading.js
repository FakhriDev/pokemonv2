export default function Loading() {
  return (
    <>
      <article className="flex flex-col max-w-5xl bg-slate-50 mx-auto h-screen p-2 lg:p-4 rounded-lg text-center overflow-hidden">
        <div className="my-auto">
          <span className="font-bold text-3xl loading loading-spinner loading-lg"></span>
          <h1 className="text-center">Loading...</h1>
        </div>
      </article>
    </>
  );
}
