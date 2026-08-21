"use client";

import { useState } from "react";

import SearchInput from "./SearchInput";
import ArticleList from "./ArticleList";
import LoadingState from "./LoadingState";
import EmptyState from "./EmptyState";
import ErrorState from "./ErrorState";

import { useArticles } from "@/hooks/useArticles";
import { useArticleActions } from "@/hooks/useArticleActions";

import type { Article, CreateArticleInput } from "@/types/article";
import ArticleForm from "./CreateArticleForm";

export default function NewsDashboard() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  const { data, isLoading, isError, error, refetch } = useArticles(search);

  const { createArticle, updateArticle, deleteArticle, isSubmitting } =
    useArticleActions();

  const articles = data?.data ?? [];

  function openCreateModal() {
    setEditingArticle(null);
    setShowModal(true);
  }

  function openEditModal(article: Article) {
    setEditingArticle(article);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingArticle(null);
  }

  async function handleSubmit(data: CreateArticleInput) {
    try {
      if (editingArticle) {
        await updateArticle(editingArticle, data);
      } else {
        await createArticle(data);
      }
      closeModal();
    } catch {
      // Toast is handled inside the mutation hooks.
    }
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this article?"
    );
    if (!confirmed) return;

    try {
      await deleteArticle(id);
    } catch {
      // Toast is handled inside the mutation hook.
    }
  }

  return (
    <main className="min-h-screen bg-gradient from-slate-50 via-gray-50 to-slate-100 text-slate-900 selection:bg-blue-600 selection:text-white">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Top Header Section */}
        <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-200/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse"></span>
              Editorial Suite
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              News Dashboard
            </h1>
            <p className="mt-1.5 text-sm text-gray-500">
              Manage, publish, and curate your platform&apos;s latest articles seamlessly.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md hover:shadow-blue-500/20 active:scale-95"
          >
            <svg className="h-4 w-4 transition-transform group-hover:rotate-90 duration-300" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add New Article
          </button>
        </header>

        {/* Modal Overlay & Dialog */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div 
              className="relative w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="text-lg font-bold text-gray-900">
                  {editingArticle ? "Edit Article" : "Create New Article"}
                </h3>
                <button 
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                  aria-label="Close modal"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="max-h-[80vh] overflow-y-auto pr-1">
                <ArticleForm
                  article={editingArticle}
                  isSubmitting={isSubmitting}
                  onSubmit={handleSubmit}
                  onCancel={closeModal}
                />
              </div>
            </div>
          </div>
        )}

        {/* Search Bar Section */}
        <div className="mb-8">
          <div className="rounded-2xl bg-white p-2 shadow-sm border border-gray-200/80 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all">
            <SearchInput
              value={search}
              onChange={setSearch}
            />
          </div>
        </div>

        {/* Content Section */}
        <section className="transition-all duration-300">
          {isLoading && <LoadingState />}

          {isError && (
            <ErrorState
              message={error.message}
              onRetry={refetch}
            />
          )}

          {!isLoading && !isError && articles.length === 0 && (
            <EmptyState search={search} />
          )}

          {!isLoading && !isError && articles.length > 0 && (
            <ArticleList
              articles={articles}
              onEdit={openEditModal}
              onDelete={handleDelete}
              itemsPerPage={2}
            />
          )}
        </section>

      </div>
    </main>
  );
}