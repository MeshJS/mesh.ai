import Spinner from "@components/ui/spinner";
import useSearch from "@contexts/search";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { pageSize } from "config/search";
import AnswerDrawer from "./drawer";
import SearchResultItem from "./item";

export default function SearchResults() {
  const { searchResults, loading, setShowDrawer } = useSearch();

  if (loading) {
    return (
      <div className="text-center w-full">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-row mb-8">
      <div className="hidden lg:block flex-none w-48"></div>
      <div className="flex-1 w-64">
        <AnswerDrawer />
        <div className="divide-y divide-gray-200 dark:divide-gray-700 w-full">
          {searchResults.map((answer, i) => {
            return <SearchResultItem answer={answer} key={i} />;
          })}
          <Pagination />
        </div>
        {searchResults.length == 0 && (
          <p>
            Your search query did not match any documents, the AI doesn't know
            what you are searching for.
          </p>
        )}
      </div>
      <div className="hidden lg:block flex-1"></div>
    </div>
  );

  // return (
  //   <>
  //     <div className="flex justify-between mx-auto max-w-screen-sm">
  //       <AnswerDrawer answer={showDrawer} setShowDrawer={setShowDrawer} />
  //       <div className="divide-y divide-gray-200 dark:divide-gray-700 w-full">
  //         {searchResults.map((answer, i) => {
  //           return (
  //             <SearchResultItem
  //               answer={answer}
  //               expandAnswer={expandAnswer}
  //               key={i}
  //             />
  //           );
  //         })}

  //         <Pagination />
  //       </div>
  //     </div>
  //   </>
  // );
}

function Pagination() {
  const { numberAnswers, currentPage, browseAnswerPage } = useSearch();
  const totalPages = Math.ceil(numberAnswers / pageSize);

  return (
    <div className="pt-4">
      {totalPages > 0 && (
        <nav aria-label="Page navigation example">
          <ul className="inline-flex items-center -space-x-px">
            <li>
              <button
                onClick={() => browseAnswerPage(currentPage - 1)}
                className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                disabled={currentPage == 0}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
            </li>
            {Array.from(Array(totalPages).keys()).map((page, i) => {
              return (
                <li key={i}>
                  <button
                    className={
                      currentPage == page
                        ? "z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                        : "px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    }
                    onClick={() => browseAnswerPage(page)}
                    key={i}
                  >
                    {page + 1}
                  </button>
                </li>
              );
            })}

            {/* <li>
          <a
            href="#"
            className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            1
          </a>
        </li>
        <li>
          <a
            href="#"
            className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            2
          </a>
        </li>
        <li>
          <a
            href="#"
            aria-current="page"
            className="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
          >
            3
          </a>
        </li>
        <li>
          <a
            href="#"
            className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            4
          </a>
        </li>
        <li>
          <a
            href="#"
            className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            5
          </a>
        </li> */}
            <li>
              <button
                onClick={() => browseAnswerPage(currentPage + 1)}
                className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                disabled={totalPages == currentPage + 1}
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
