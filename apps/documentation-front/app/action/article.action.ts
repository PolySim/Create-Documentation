"use server";

import { config } from "@/config";
import { Article } from "@repo/ui/models/article.models";

export const getArticles = async () => {
  try {
    const res = await fetch(`${config.apiUrl}/articles`);
    return res.json() as Promise<Article[]>;
  } catch (error) {
    console.error(error);
    return [] as Article[];
  }
};

export const createArticle = async (
  article: Omit<Article, "id" | "createdAt" | "updatedAt">
) => {
  try {
    const res = await fetch(`${config.apiUrl}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(article),
    });
    return res.json() as Promise<Article>;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateArticle = async (
  id: string,
  article: Partial<Omit<Article, "id" | "createdAt" | "updatedAt">>
) => {
  try {
    const res = await fetch(`${config.apiUrl}/articles/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(article),
    });
    return res.json() as Promise<Article>;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteArticle = async (id: string) => {
  try {
    const res = await fetch(`${config.apiUrl}/articles/${id}`, {
      method: "DELETE",
    });
    return res.ok;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
