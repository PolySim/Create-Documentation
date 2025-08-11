import { useParams } from "next/navigation";

export const useAppParams = () => {
  const params = useParams();

  return {
    articleId: params.articleId as string,
  };
};
