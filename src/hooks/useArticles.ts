// src/hooks/useArticles.ts

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import {
  createArticle,
  deleteArticle,
  getArticles,
  patchArticle,
  updateArticle,
} from "@/lib/articles/articles";

import type {
  CreateArticleInput,
  UpdateArticleInput,
} from "@/types/article";

export function useArticles(search: string) {
  return useQuery({
    queryKey: ["articles", search],
    queryFn: () => getArticles(search),
  });
}

export function useCreateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateArticleInput) =>
      createArticle(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["articles"],
      });

      toast.success("Article created successfully");
    },

    onError: (error: Error) => {
      toast.error(error.message || "Failed to create article");
    },
  });
}

export function usePatchArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateArticleInput;
    }) => patchArticle(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["articles"],
      });

      toast.success("Article updated successfully");
    },

    onError: (error: Error) => {
      toast.error(error.message || "Failed to update article");
    },
  });
}

export function useUpdateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: CreateArticleInput;
    }) => updateArticle(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["articles"],
      });

      toast.success("Article replaced successfully");
    },

    onError: (error: Error) => {
      toast.error(error.message || "Failed to replace article");
    },
  });
}

export function useDeleteArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteArticle(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["articles"],
      });

      toast.success("Article deleted successfully");
    },

    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete article");
    },
  });
}