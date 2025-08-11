"use server";

import { config } from "@/config/config";
import { auth } from "@clerk/nextjs/server";
import { Article } from "@repo/ui/models/article.models";

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
      return [];
    }

    const res = await fetch(`${config.API_URL}/articles/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json() as Promise<Article>;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createArticle = async (
  article: Omit<Article, "id" | "createdAt" | "updatedAt">
) => {
  try {
    const { getToken } = await auth();
    const token = await getToken();
    if (!token) {
      console.error("Unauthorized");
      return [];
    }

    const res = await fetch(`${config.API_URL}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
    const { getToken } = await auth();
    const token = await getToken();
    if (!token) {
      console.error("Unauthorized");
      return [];
    }

    const res = await fetch(`${config.API_URL}/articles/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
    const { getToken } = await auth();
    const token = await getToken();
    if (!token) {
      console.error("Unauthorized");
      return [];
    }

    const res = await fetch(`${config.API_URL}/articles/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.ok;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
