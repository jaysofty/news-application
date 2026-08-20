export default function LoadingState() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="animate-pulse rounded-xl border bg-white p-5"
        >
          <div className="mb-4 h-4 w-24 rounded bg-gray-200" />

          <div className="mb-2 h-6 w-3/4 rounded bg-gray-200" />

          <div className="h-4 w-full rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}