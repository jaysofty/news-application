"use client";

import { useState } from "react";
import type { Article } from "@/types/article";

type ArticleFormProps = {
  article?: Article | null;
  isSubmitting?: boolean;
  onSubmit: (data: {
    title: string;
    source: string;
    description?: string;
    publishedAt: string;
  }) => void;
  onCancel: () => void;
};

export default function ArticleForm({
  article,
  isSubmitting = false,
  onSubmit,
  onCancel,
}: ArticleFormProps) {
  const [title, setTitle] = useState(article?.title ?? "");
  const [source, setSource] = useState(article?.source ?? "");
  const [description, setDescription] = useState(
    article?.description ?? ""
  );

  const [publishedAt, setPublishedAt] = useState(
    article
      ? new Date(article.publishedAt).toISOString().slice(0, 16)
      : new Date().toISOString().slice(0, 16)
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSubmit({
      title: title.trim(),
      source: source.trim(),
      description: description.trim() || undefined,
      publishedAt: new Date(publishedAt).toISOString(),
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
    >
      <h2 className="text-lg font-semibold text-gray-900">
        {article ? "Edit Article" : "Create Article"}
      </h2>

      <div className="mt-4 grid gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Title
          </label>

          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none placeholder:text-gray-400 focus:border-blue-500"
            placeholder="Article title"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Source
          </label>

          <input
            value={source}
            onChange={(event) => setSource(event.target.value)}
            required
           className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none placeholder:text-gray-400 focus:border-blue-500"
            placeholder="BBC"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Description
          </label>

          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={4}
            className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none placeholder:text-gray-400 focus:border-blue-500"
            placeholder="Article description"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Published date
          </label>

          <input
            type="datetime-local"
            value={publishedAt}
            onChange={(event) => setPublishedAt(event.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {isSubmitting
            ? "Saving..."
            : article
              ? "Update Article"
              : "Create Article"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}