import type {
  ArticlesResponse,
  CreateArticleInput,
  UpdateArticleInput,
  ArticleResponse,
  DeleteArticleResponse,

} from "@/types/article";

async function getErrorMessage(response: Response) {
  try {
    const body = await response.json();

    return body.message || "Something went wrong";
  } catch {
    return "Something went wrong";
  }
}

export async function getArticles(
  search?: string
): Promise<ArticlesResponse> {
  const params = new URLSearchParams();

  if (search?.trim()) {
    params.set("search", search.trim());
  }

  const query = params.toString();

  const response = await fetch(
    `/api/articles${query ? `?${query}` : ""}`
  );

  if (!response.ok) {
     throw new Error(await getErrorMessage(response));
  }

  return response.json();
}

export async function createArticle(
  data: CreateArticleInput
): Promise<ArticleResponse> {
  const response = await fetch("/api/articles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  return result;
}

export async function patchArticle(
  id: string,
  data: UpdateArticleInput
): Promise<ArticleResponse> {
  const response = await fetch(
    `/api/articles/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
     throw new Error(await getErrorMessage(response));
  }

  return result;
}

export async function updateArticle(
  id: string,
  data: CreateArticleInput
): Promise<ArticleResponse> {
  const response = await fetch(
    `/api/articles/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  return result;
}

export async function deleteArticle(
  id: string
): Promise<DeleteArticleResponse> {
  const response = await fetch(
    `/api/articles/${id}`,
    {
      method: "DELETE",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  return result;
}