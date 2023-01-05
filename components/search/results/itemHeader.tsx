import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";

export default function ItemHeader({ setShowDrawer, answer, canExpand }) {
  let styleClass = `text-2xl font-bold tracking-tight text-black dark:text-white text-left ${
    canExpand && "underline"
  }`;
  if (answer == undefined) return <></>;

  return (
    <div className="flex flex-col">
      <button onClick={() => setShowDrawer(answer)}>
        <h2 className={styleClass}>{answer.question}</h2>
      </button>
      {answer.link && (
        <a
          href={answer.link}
          target="_blank"
          rel="noreferrer"
          className={`flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400`}
        >
          <ArrowTopRightOnSquareIcon className="mr-1 w-4 h-4" />
          <span className="w-96 truncate">{answer.link}</span>
        </a>
      )}
    </div>
  );
}
