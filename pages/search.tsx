import SearchResults from "@components/search/results";
import Metatags from "@components/site/Metatags";
import { useRouter } from "next/router";

export default function Search() {
  const router = useRouter();

  let snippet =
    "Jul 10, 2019 ... JavaScript SDK for interacting with Cardano, providing various key management options including support for popular hardware wallets.";
  if (snippet.includes("...")) {
    let snippetArray = snippet.split("...");
    console.log(11, snippetArray);
    if (snippetArray.length == 3) {
      console.log(222, snippetArray[1].trim());
    }
    if (snippetArray.length == 2 && snippetArray[0].length==13) {
      console.log(222, snippetArray[1].trim());
    }
  }
  return (
    <>
      <Metatags title={router.query.q} />
      <SearchResults />
    </>
  );
}
