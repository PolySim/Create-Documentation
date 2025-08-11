import {
  createArticle,
  getArticle,
  getArticles,
  updateArticle,
} from "@/action/article.action";
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
