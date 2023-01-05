import SearchResults from "@components/search/results";
import Metatags from "@components/site/Metatags";
import { useRouter } from "next/router";

export default function Search() {
  const router = useRouter();

  return (
    <>
      <Metatags title={router.query.q} />
      <SearchResults />
    </>
  );
}
