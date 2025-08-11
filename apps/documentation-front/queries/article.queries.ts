import {
  createArticle,
  deleteArticle,
  getArticle,
  getArticles,
  updateArticle,
} from "@/action/article.action";
import { Article } from "@repo/ui/models/article.models";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useArticles = () =>
  useQuery({
    queryKey: ["articles"],
    queryFn: getArticles,
  });

export const useArticle = (id: string) =>
  useQuery({
    queryKey: ["article", id],
    queryFn: () => getArticle(id),
    enabled: !!id,
  });

export const useUpdateArticle = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => updateArticle(id, { content }),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["article", id] });
      const previousArticle = queryClient.getQueryData(["article", id]);
      queryClient.setQueryData(["article", id], data);
      return { previousArticle };
    },
  });
};

export const useCreateArticle = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: { title: string }) => createArticle(data),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["articles"] });
    },
    onSuccess: (data) => {
      if (!data.success) {
        toast.error("Failed to create article");
        return;
      }
      router.push(`/${data.data.id}/editor`);
    },
    onError: () => {
      toast.error("Failed to create article");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};

export const useDeleteArticle = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteArticle(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["articles"] });
      const previousArticles = queryClient.getQueryData(["articles"]);
      queryClient.setQueryData(["articles"], (old: Article[]) =>
        old.filter((article) => article.id !== id)
      );
      return { previousArticles };
    },
    onSuccess: (data, variables, context) => {
      if (!data.success) {
        toast.error("Failed to delete article");
        queryClient.setQueryData(["articles"], context?.previousArticles);
      }
    },
    onError: (error, data, context) => {
      toast.error("Failed to delete article");
      queryClient.setQueryData(["articles"], context?.previousArticles);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};
