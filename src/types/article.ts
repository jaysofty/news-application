export type Article = {
  id: string;
  title: string;
  source: string;
  description: string | null;
  publishedAt: string;
  createdAt: string;
};

export type ArticlesResponse = {
  success: boolean;
  data: Article[];
};

export type ArticleResponse = {
  success: boolean;
  data: Article;
  message?: string;
};

export type DeleteArticleResponse = {
  success: boolean;
  data: null;
  message?: string;
};

export type CreateArticleInput = {
  title: string;
  source: string;
  description?: string;
  publishedAt: string;
};

export type UpdateArticleInput = {
  title?: string;
  source?: string;
  description?: string;
  publishedAt?: string;
};