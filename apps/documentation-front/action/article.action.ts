"use server";

import { config } from "@/config/config";
import { auth } from "@clerk/nextjs/server";
import { Article } from "@repo/ui/models/article.models";
import { revalidateTag } from "next/cache";

export const getArticles = async () => {
  try {
    const { getToken } = await auth();
    const token = await getToken();
    if (!token) {
      console.error("Unauthorized");
      return [];
    }

    const res = await fetch(`${config.API_URL}/articles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "force-cache",
      next: {
        tags: ["articles"],
      },
    });
    return res.json() as Promise<Article[]>;
  } catch (error) {
    console.error(error);
    return [] as Article[];
  }
};

export const getArticle = async (id: string) => {
  try {
    const { getToken } = await auth();
    const token = await getToken();
    if (!token) {
      console.error("Unauthorized");
      return {} as Article;
    }

    const res = await fetch(`${config.API_URL}/articles/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "force-cache",
      next: {
        tags: [`article-${id}`],
      },
    });
    return res.json() as Promise<Article>;
  } catch (error) {
    console.error(error);
    return {} as Article;
  }
};

export const createArticle = async (article: { title: string }) => {
  try {
    const { getToken } = await auth();
    const token = await getToken();
    if (!token) {
      console.error("Unauthorized");
      return { success: false, data: {} as Article };
    }

    const res = await fetch(`${config.API_URL}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(article),
    });
    const data = (await res.json()) as Article;
    revalidateTag("articles");
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, data: {} as Article };
  }
};

export const updateArticle = async (
  id: string,
  article: Partial<Omit<Article, "id" | "createdAt" | "updatedAt">>
) => {
  try {
    const { getToken } = await auth();
    const token = await getToken();
    if (!token) {
      console.error("Unauthorized");
      return { success: false, data: {} as Article };
    }

    const res = await fetch(`${config.API_URL}/articles/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(article),
    });
    revalidateTag(`article-${id}`);
    const data = (await res.json()) as Article;
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, data: {} as Article };
  }
};

export const deleteArticle = async (id: string) => {
  try {
    const { getToken } = await auth();
    const token = await getToken();
    if (!token) {
      console.error("Unauthorized");
      return { success: false };
    }

    const res = await fetch(`${config.API_URL}/articles/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    revalidateTag("articles");
    return { success: res.ok };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};
