import Button from "@components/ui/button";
import ProfileImage from "@components/user/profileImage";
import useSearch from "@contexts/search";
import {
  CheckIcon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import {
  getDiscussions,
  insertDiscussion,
} from "@lib/supabase/answers_discussions";
import { useSession } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { dateToString } from "utils/dateToString";
import DisplayMeshAnswer from "./displayMeshAnswer";
import dynamic from "next/dynamic";
import { insertAnswerEdited } from "@lib/supabase/answers_edited";
import Drawer from "@components/ui/drawer";
import useUser from "@contexts/user";
import ItemHeader from "./itemHeader";
var TextEditor = dynamic(() => import("@components/ui/textEditor"), {
  ssr: false,
});

export default function AnswerDrawer() {
  const { showDrawer, setShowDrawer } = useSearch();

  return (
    <>
      <Drawer showDrawer={showDrawer}>
        {/* <h2 className="text-2xl font-bold tracking-tight text-black dark:text-white mb-4">
          {showDrawer?.question}
        </h2> */}

        <ItemHeader setShowDrawer={{}} answer={showDrawer} canExpand={false} />

        <div className="absolute top-2.5 right-2.5">
          <button
            type="button"
            onClick={() => setShowDrawer(false)}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <XMarkIcon className="w-5 h-5" />
            <span className="sr-only">Close menu</span>
          </button>
        </div>

        <div className="mb-5 font-light text-gray-500 dark:text-gray-400">
          {showDrawer?.category == "mesh" ? (
            <DisplayMeshAnswer answer={showDrawer} />
          ) : (
            <div className="prose lg:prose-xl">
              <AnswerBody answer={showDrawer} />
            </div>
          )}
        </div>
        <Discussion />
      </Drawer>
    </>
  );
}

function AnswerBody({ answer }) {
  const session = useSession();
  const [editing, setEditing] = useState<boolean>(false);
  const [editedContent, setEditedContent] = useState<string | undefined>(
    undefined
  );
  const [showEditing, setshowEditing] = useState<boolean>(false);
  const [showSubmitted, setShowSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (answer) {
      setEditing(false);
      setShowSubmitted(false);
    }
  }, [answer]);

  function editThisAnswer() {
    setEditedContent(answer.answer);
    setEditing(true);
  }

  async function submitEditedAnswer() {
    if (session) {
      const editedAnswer = {
        answer_id: answer.id,
        text: editedContent,
        user_id: session?.user.id,
      };
      const res = await insertAnswerEdited(editedAnswer);
      if (res) {
        setShowSubmitted(true);
      }
    }
  }

  if (answer == undefined) {
    return <></>;
  }

  return (
    <div
      onMouseEnter={() => setshowEditing(true)}
      onMouseLeave={() => setshowEditing(false)}
    >
      {editedContent && editing ? (
        <>
          <TextEditor
            value={editedContent}
            onChange={setEditedContent}
            className="text-gray-900 bg-gray-50 border-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
          />
          {/* <Button onClick={() => submitEditedAnswer()}>
            Submit your changes
          </Button> */}

          {showSubmitted ? (
            <span className="mt-4 flex text-sm">
              <CheckIcon className="mr-1 w-4 h-4" /> Your answer has been
              submitted for review.
            </span>
          ) : (
            <button
              type="button"
              className={`mt-4 flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400`}
              onClick={() => submitEditedAnswer()}
            >
              <PencilSquareIcon className="mr-1 w-4 h-4" />
              Submit your changes for review
            </button>
          )}
        </>
      ) : (
        <>
          <div
            className="text-lg"
            dangerouslySetInnerHTML={{ __html: answer.answer }}
          />
          {session && (
            <button
              type="button"
              className={`mt-4 flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 ${
                !showEditing && "invisible"
              }`}
              onClick={() => editThisAnswer()}
            >
              <PencilSquareIcon className="mr-1 w-4 h-4" />
              Edit this answer
            </button>
          )}
        </>
      )}
    </div>
  );

  //
}

function Discussion() {
  const { showDrawer } = useSearch();
  const session = useSession();
  const [userComment, setUserComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [replies, setReplies] = useState<[]>([]);

  async function doInsertDiscussion() {
    if (!loading && userComment.length > 0) {
      setLoading(true);
      let newDiscussion = {
        answer_id: showDrawer?.id,
        text: userComment,
        user_id: session?.user.id,
      };
      console.log("newDiscussion", newDiscussion);
      const res = await insertDiscussion(newDiscussion);
      if (res) {
        //@ts-ignore
        setReplies([...replies, res[0]]);
        setUserComment("");
      }
      setLoading(false);
    }
  }

  useEffect(() => {
    setReplies([]);
    async function get() {
      const res = await getDiscussions(showDrawer?.id);
      //@ts-ignore
      setReplies(res);
    }
    if (showDrawer) {
      get();
    }
  }, [showDrawer]);

  return (
    <section className="bg-white dark:bg-gray-900 lg:py-4">
      <div className="max-w-2xl mx-auto px-4">
        {(session || (replies && replies.length > 0)) && (
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
              Discussion ({replies.length})
            </h2>
          </div>
        )}

        {session && (
          <div className="mb-6">
            <div className="mb-4 w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
              <div className="py-2 px-4 bg-gray-50 rounded-t-lg dark:bg-gray-800">
                <label className="sr-only">Your comment</label>
                <textarea
                  rows={6}
                  className="px-0 w-full text-sm text-gray-900 bg-gray-50 border-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 outline-none"
                  placeholder="Write a comment..."
                  value={userComment}
                  onChange={(e) => setUserComment(e.target.value)}
                ></textarea>
              </div>
              <div className="flex justify-between items-center py-2 px-3 border-t dark:border-gray-600">
                <Button onClick={() => doInsertDiscussion()}>
                  Post comment
                </Button>
              </div>
            </div>
          </div>
        )}

        {replies
          .sort((a, b) => {
            //@ts-ignore
            return new Date(b.created_at) - new Date(a.created_at);
          })
          .map((reply, i) => {
            return <Reply reply={reply} key={i} />;
          })}
      </div>
    </section>
  );
}

function Reply({ reply }) {
  const { getUser, allUsers } = useUser();

  return (
    <article
      className={`p-6 mb-6 text-base bg-gray-50 rounded-lg dark:bg-gray-700 ${
        reply.discussion_id && "ml-12"
      }`}
    >
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
            <ProfileImage
              className="mr-2 w-6 h-6 rounded-full"
              id={getUser(reply.user_id)?.full_name}
            />
            <span>{getUser(reply.user_id)?.full_name}</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <time dateTime="2022-02-08" title="February 8th, 2022">
            {dateToString(reply.created_at)}
          </time>
        </p>
      </footer>
      <p className="text-gray-500 dark:text-gray-400">{reply.text}</p>
      <div className="flex items-center mt-4 space-x-4">
        {/* <button
              type="button"
              className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
            >
              <svg
                aria-hidden="true"
                className="mr-1 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              11 Likes
            </button> */}
        {/* <button
          type="button"
          className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
        >
          <ChatBubbleLeftEllipsisIcon className="mr-1 w-4 h-4" />
          Reply
        </button> */}
      </div>
    </article>
  );
}
