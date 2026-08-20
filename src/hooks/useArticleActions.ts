// src/hooks/useArticleActions.ts

import {
  useCreateArticle,
  usePatchArticle,
  useDeleteArticle,
} from "@/hooks/useArticles";

import type {
  Article,
  CreateArticleInput,
  UpdateArticleInput,
} from "@/types/article";

export function useArticleActions() {
  const createMutation = useCreateArticle();
  const updateMutation = usePatchArticle();
  const deleteMutation = useDeleteArticle();

  function createArticle(data: CreateArticleInput) {
    return createMutation.mutateAsync(data);
  }

  function updateArticle(
    article: Article,
    data: UpdateArticleInput
  ) {
    return updateMutation.mutateAsync({
      id: article.id,
      data,
    });
  }

  function deleteArticle(id: string) {
    return deleteMutation.mutateAsync(id);
  }

  return {
    createArticle,
    updateArticle,
    deleteArticle,

    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,

    isSubmitting:
      createMutation.isPending ||
      updateMutation.isPending,

    isLoading:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  };
}