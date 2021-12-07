import { useRouter } from "next/router";

type IPage = "/board" | "/market" | "/mypage";

export function useMoveToPage() {
  const router = useRouter();

  const moveToPage = (page: IPage) => () => {
    router.push(page);
  };

  return {
    moveToPage,
  };
}
