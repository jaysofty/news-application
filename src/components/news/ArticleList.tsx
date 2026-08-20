import type { Article } from "@/types/article";
import ArticleCard from "./ArticleCard";

type ArticleListProps = {
  articles: Article[];
  onEdit: (article: Article) => void;
  onDelete: (id: string) => void;
};

export default function ArticleList({
  articles,
  onEdit,
  onDelete,
}: ArticleListProps) {
  return (
    <div className="grid gap-4">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          onEdit={() => onEdit(article)}
          onDelete={() => onDelete(article.id)}
        />
      ))}
    </div>
  );
}