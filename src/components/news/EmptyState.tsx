type EmptyStateProps = {
  search?: string;
};

export default function EmptyState({
  search,
}: EmptyStateProps) {
  return (
    <div className="rounded-xl border border-dashed p-10 text-center">
      <h2 className="text-lg font-semibold text-gray-900">
        No articles found
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        {search
          ? `No articles matched "${search}".`
          : "There are no articles available yet."}
      </p>
    </div>
  );
}