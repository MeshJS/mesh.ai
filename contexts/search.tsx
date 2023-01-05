import React, { createContext, useState, useContext, useMemo } from "react";
import { searchQuery } from "@backend/search";
import { useRouter } from "next/router";
import { Answer } from "types";
import { searchAnswers } from "@lib/supabase";

const SearchContext = createContext<{
  loading: boolean;
  searchResults: Answer[];
  lastSearchQuery: string;
  numberAnswers: number;
  currentPage: number;
  showDrawer: undefined | Answer;
  setShowDrawer: (answer: {}) => boolean;
  performQuery: (query: string) => boolean;
  browseAnswerPage: (page: number) => boolean;
}>({
  loading: false,
  searchResults: [],
  lastSearchQuery: "",
  numberAnswers: 0,
  currentPage: 0,
  showDrawer: undefined,
  setShowDrawer: (answer: any) => true,
  performQuery: (query: string) => true,
  browseAnswerPage: (page: number) => true,
});

export const SearchProvider = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<Answer[]>([]);
  const [lastSearchQuery, setLastSearchQuery] = useState<string>("");
  const [numberAnswers, setNumberAnswers] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [showDrawer, setShowDrawer] = useState<undefined | Answer>(undefined);
  const [pageAnswers, setPageAnswers] = useState<{}>({});

  const router = useRouter();

  async function performQuery(query) {
    if (query && !loading && query.length > 0) {
      // console.log(999999999, "performQuery", query);

      router.push({
        pathname: "/search",
        query: { q: query },
      });

      setShowDrawer(undefined);
      setLoading(true);
      setLastSearchQuery(query);
      setPageAnswers({});

      const res = await searchQuery({ query });
      setSearchResults(res.answers);
      setNumberAnswers(res.numberAnswers);
      setCurrentPage(0);
      setPageAnswers({ 0: res.answers });
      setLoading(false);
    }

    return true;
  }

  async function browseAnswerPage(page = 0) {
    setLoading(true);
    if (page in pageAnswers) {
      setSearchResults(pageAnswers[page]);
    } else {
      const answers = await searchAnswers({
        query: lastSearchQuery,
        page: page,
      });
      setSearchResults(answers);
      setPageAnswers({ ...pageAnswers, [page]: answers });
    }
    setCurrentPage(page);
    setLoading(false);
    return true;
  }

  const memoedValue = useMemo(
    () => ({
      loading,
      searchResults,
      lastSearchQuery,
      numberAnswers,
      currentPage,
      showDrawer,
      performQuery,
      browseAnswerPage,
      setShowDrawer,
    }),
    [
      loading,
      searchResults,
      lastSearchQuery,
      numberAnswers,
      currentPage,
      showDrawer,
    ]
  );

  return (
    //@ts-ignore
    <SearchContext.Provider value={memoedValue}>
      {children}
    </SearchContext.Provider>
  );
};

export default function useSearch() {
  return useContext(SearchContext);
}
