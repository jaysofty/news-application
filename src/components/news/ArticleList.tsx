import { useState } from "react";
import type { Article } from "@/types/article";
import ArticleCard from "./ArticleCard";

type ArticleListProps = {
  articles: Article[];
  onEdit: (article: Article) => void;
  onDelete: (id: string) => void;
  itemsPerPage?: number; // Optional prop to control items per page (defaults to 6)
};

export default function ArticleList({
  articles,
  onEdit,
  onDelete,
  itemsPerPage = 6,
}: ArticleListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination values
  const totalPages = Math.ceil(articles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentArticles = articles.slice(startIndex, startIndex + itemsPerPage);

  // Handle page change actions
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Optional: scroll back to top of list smoothly
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (articles.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 p-12 text-center">
        <p className="text-sm font-medium text-gray-500">No articles found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Articles Grid / List */}
      <div className="grid gap-4">
        {currentArticles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            onEdit={() => onEdit(article)}
            onDelete={() => onDelete(article.id)}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <nav
          className="flex items-center justify-between border-t border-gray-200 px-4 py-4 sm:px-0"
          aria-label="Pagination"
        >
          <div className="hidden sm:block">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
              <span className="font-medium">
                {Math.min(startIndex + itemsPerPage, articles.length)}
              </span>{" "}
              of <span className="font-medium">{articles.length}</span> results
            </p>
          </div>

          <div className="flex flex-1 justify-between sm:justify-end gap-2">
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}