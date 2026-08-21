// import type { Article } from "@/types/article";

// type ArticleCardProps = {
//   article: Article;
//   onEdit: () => void;
//   onDelete: () => void;
// };

// export default function ArticleCard({
//   article,
//   onEdit,
//   onDelete,
// }: ArticleCardProps) {
//   return (
//     <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
//       <div className="flex items-start justify-between gap-4">
//         <div className="min-w-0">
//           <h2 className="text-lg font-semibold text-gray-900">
//             {article.title}
//           </h2>

//           <p className="mt-1 text-sm font-medium text-blue-600">
//             {article.source}
//           </p>
//         </div>

//         <div className="flex shrink-0 gap-2">
//           <button
//             type="button"
//             onClick={onEdit}
//             className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
//           >
//             Edit
//           </button>

//           <button
//             type="button"
//             onClick={onDelete}
//             className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
//           >
//             Delete
//           </button>
//         </div>
//       </div>

//       {article.description && (
//         <p className="mt-3 text-sm leading-6 text-gray-600">
//           {article.description}
//         </p>
//       )}

//       <div className="mt-4 border-t border-gray-100 pt-3">
//         <time
//           dateTime={article.publishedAt}
//           className="text-xs text-gray-500"
//         >
//           {new Date(article.publishedAt).toLocaleString()}
//         </time>
//       </div>
//     </article>
//   );
// }

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
  // Optional: Simple reading time calculation helper (approx 200 words per minute)
  const calculateReadingTime = (text?: string) => {
    if (!text) return "1 min read";
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  return (
    <article className="group relative flex flex-col justify-between rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow-md">
      <div>
        {/* Top Header: Source Badge & Action Buttons */}
        <div className="flex items-center justify-between gap-4">
          <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10">
            {article.source}
          </span>

          <div className="flex items-center gap-1.5 opacity-90 transition-opacity group-hover:opacity-100">
            <button
              type="button"
              onClick={onEdit}
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
              aria-label="Edit article"
            >
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.862 4.487zm0 0L19.5 7.125"
                />
              </svg>
              Edit
            </button>

            <button
              type="button"
              onClick={onDelete}
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
              aria-label="Delete article"
            >
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
              Delete
            </button>
          </div>
        </div>

        {/* Title */}
        <h2 className="mt-3 text-lg font-bold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">
          {article.title}
        </h2>

        {/* Description */}
        {article.description && (
          <p className="mt-2 text-sm leading-relaxed text-gray-600 line-clamp-2">
            {article.description}
          </p>
        )}
      </div>

      {/* Footer Meta (Date & Reading Time) */}
      <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4 text-xs text-gray-500">
        <time dateTime={article.publishedAt}>
          {new Date(article.publishedAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })}
        </time>
        <span className="font-medium text-gray-400">
          {calculateReadingTime(article.description ?? undefined)}
        </span>
      </div>
    </article>
  );
}
