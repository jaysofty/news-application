import type { Article } from "@/types/article";

type ArticleCardProps = {
  article: Article;
  onEdit: () => void;
  onDelete: () => void;
};

export default function ArticleCard({
  article,
  onEdit,
  onDelete,
}: ArticleCardProps) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-gray-900">
            {article.title}
          </h2>

          <p className="mt-1 text-sm font-medium text-blue-600">
            {article.source}
          </p>
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={onEdit}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </div>

      {article.description && (
        <p className="mt-3 text-sm leading-6 text-gray-600">
          {article.description}
        </p>
      )}

      <div className="mt-4 border-t border-gray-100 pt-3">
        <time
          dateTime={article.publishedAt}
          className="text-xs text-gray-500"
        >
          {new Date(article.publishedAt).toLocaleString()}
        </time>
      </div>
    </article>
  );
}