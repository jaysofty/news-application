type ErrorStateProps = {
  message?: string;
  onRetry: () => void;
};

export default function ErrorState({
  message = "Unable to load articles.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
      <h2 className="font-semibold text-red-700">
        Something went wrong
      </h2>

      <p className="mt-2 text-sm text-red-600">
        {message}
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white"
      >
        Try again
      </button>
    </div>
  );
}