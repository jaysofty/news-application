"use client";

import { useState } from "react";

import SearchInput from "./SearchInput";
import ArticleList from "./ArticleList";
import LoadingState from "./LoadingState";
import EmptyState from "./EmptyState";
import ErrorState from "./ErrorState";


import { useArticles } from "@/hooks/useArticles";
import { useArticleActions } from "@/hooks/useArticleActions";

import type {
  Article,
  CreateArticleInput,
} from "@/types/article";
import ArticleForm from "./CreateArticleForm";

export default function NewsDashboard() {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] =
    useState<Article | null>(null);

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useArticles(search);

  const {
    createArticle,
    updateArticle,
    deleteArticle,
    isSubmitting,
  } = useArticleActions();

  const articles = data?.data ?? [];

  function openCreateForm() {
    setEditingArticle(null);
    setShowForm(true);
  }

  function openEditForm(article: Article) {
    setEditingArticle(article);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingArticle(null);
  }

  async function handleSubmit(data: CreateArticleInput) {
    try {
      if (editingArticle) {
        await updateArticle(editingArticle, data);
      } else {
        await createArticle(data);
      }

      closeForm();
    } catch {
      // Toast is already handled inside the mutation hooks.
    }
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this article?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteArticle(id);
    } catch {
      // Toast is already handled inside the mutation hook.
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-blue-600">
                SuperBo
              </p>

              <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
                News Dashboard
              </h1>

              <p className="mt-2 text-sm text-gray-600">
                Browse the latest articles.
              </p>
            </div>

            <button
              type="button"
              onClick={openCreateForm}
              className="shrink-0 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              + Add Article
            </button>
          </div>
        </header>

        {/* Create / Edit */}
        {showForm && (
          <ArticleForm
            article={editingArticle}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
            onCancel={closeForm}
          />
        )}

        {/* Search */}
        <div className="mb-6">
          <SearchInput
            value={search}
            onChange={setSearch}
          />
        </div>

        {/* Content */}
        {isLoading && <LoadingState />}

        {isError && (
          <ErrorState
            message={error.message}
            onRetry={refetch}
          />
        )}

        {!isLoading &&
          !isError &&
          articles.length === 0 && (
            <EmptyState search={search} />
          )}

        {!isLoading &&
          !isError &&
          articles.length > 0 && (
            <ArticleList
              articles={articles}
              onEdit={openEditForm}
              onDelete={handleDelete}
            />
          )}
      </div>
    </main>
  );
}