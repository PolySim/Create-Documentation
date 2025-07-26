import {
  getArticle,
  getArticles,
  updateArticle,
} from "@/action/article.action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
