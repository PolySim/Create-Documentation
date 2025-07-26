import { getArticles } from "@/app/action/article.action";
import { useQuery } from "@tanstack/react-query";

export const useArticles = () =>
  useQuery({
    queryKey: ["articles"],
    queryFn: getArticles,
  });
