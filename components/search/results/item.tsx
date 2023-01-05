import Button from "@components/ui/button";
import useSearch from "@contexts/search";
import {
  ArrowTopRightOnSquareIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/solid";
import { userVoteAnswer } from "@lib/supabase";
import { useSession } from "@supabase/auth-helpers-react";
import { useState } from "react";
import DisplayMeshAnswer from "./displayMeshAnswer";
import ItemHeader from "./itemHeader";

export default function SearchResultItem({ answer }) {
  const session = useSession();
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [voted, setVoted] = useState(undefined);
  const { setShowDrawer } = useSearch();

  let canVote = false;
  if (session && answer.category != "mesh") {
    canVote = true;
  }
  let canExpand = false;
  if (answer.category != "mesh") {
    canExpand = true;
  }

  async function vote(vote) {
    if (session && canVote) {
      const res = await userVoteAnswer({
        answerId: answer.id,
        vote: vote,
        uid: session.user.id,
      });
      setVoted(vote);
    }
  }

  return (
    <article
      className="px-2 py-6"
      onMouseEnter={() => setShowSubmenu(true)}
      onMouseLeave={() => setShowSubmenu(false)}
    >
      <div className="flex justify-between items-center mb-5 text-gray-500">
        {/* {answer.category ? (
          <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
            {answer.category}
          </span>
        ) : (
          <span></span>
        )} */}

        {/* <span className="text-sm">24 days ago</span> */}
        {/* <div className="flex items-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {answer.question}
          </h2>
        </div> */}

        <div>
          {/* {canExpand ? (
            <button onClick={() => setShowDrawer(answer)}>
              <h2
                className={`text-2xl font-bold tracking-tight text-black dark:text-white mb-4 text-left underline`}
              >
                {answer.question}
              </h2>
            </button>
          ) : (
            <h2
              className={`text-2xl font-bold tracking-tight text-black dark:text-white mb-4 text-left`}
            >
              {answer.question}
            </h2>
          )} */}
          <ItemHeader
            setShowDrawer={setShowDrawer}
            answer={answer}
            canExpand={canExpand}
          />
        </div>
        {canVote && (
          <div
            className={`flex items-center gap-2 ${!showSubmenu && "invisible"}`}
          >
            <Button
              onClick={() => vote(true)}
              style={voted === true && "success"}
            >
              <HandThumbUpIcon className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => vote(false)}
              style={voted === false && "success"}
            >
              <HandThumbDownIcon className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <div className="mb-5 font-light text-gray-500 dark:text-gray-400">
        {answer.category == "mesh" ? (
          <DisplayMeshAnswer answer={answer} />
        ) : (
          // <p className="text-lg">{answer.answer}</p>
          <div
            className="text-lg"
            dangerouslySetInnerHTML={{ __html: answer.answer }}
          />
        )}
      </div>
    </article>
  );
}
