import useSearch from "@contexts/search";
import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";

export default function SearchInputNavbar() {
  const { loading, performQuery, lastSearchQuery } = useSearch();
  const [userquery, setuserquery] = useState<string>("");
  const router = useRouter();

  function search() {
    if (!loading && userquery.length) {
      performQuery(userquery);
    }
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      search();
    }
  }

  useEffect(() => {
    setuserquery(router.query.q ? router.query.q.toString() : "");
    if (router.query.q && lastSearchQuery != router.query.q && !loading) {
      performQuery(router.query.q);
    }
  }, [router.isReady]);

  return (
    <div className="mx-auto flex items-center rounded-full border hover:shadow-md">
      <div className="pl-5">
        <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
      </div>
      <input
        type="text"
        className="w-full bg-transparent rounded-full py-[10px] pl-4 pr-4 outline-none"
        placeholder="Search"
        onChange={(e) => setuserquery(e.target.value)}
        value={userquery}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
}
