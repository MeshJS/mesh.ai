import Codeblock from "@components/ui/codeblock";

export default function DisplayMeshAnswer({ answer }) {
  let type = 0;
  let p1 = "";
  let p2 = "";
  let c1 = "";

  function getIndicesOf(searchStr, str) {
    var searchStrLen = searchStr.length;
    if (searchStrLen == 0) {
      return [];
    }
    var startIndex = 0,
      index,
      indices = [];
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
      // @ts-ignore
      indices.push(index);
      startIndex = index + searchStrLen;
    }
    return indices;
  }

  function formatMeshOutput() {
    let indices = [];
    if (answer.answer) {
      indices = getIndicesOf("```", answer.answer);
    }

    if (indices.length == 0) {
      if (answer.answer) {
        type = 1;
        p1 = answer.answer;
      }
    }
    if (indices.length == 2) {
      type = 2;
      p1 = answer.answer.substring(0, indices[0]);
      c1 = answer.answer.substring(indices[0] + 3, indices[1]);
      p2 = answer.answer.substring(indices[1] + 3, answer.answer.length);
    }
  }

  if (answer.category == "mesh") {
    formatMeshOutput();
  }

  return (
    <>
      {type === 1 && p1.length > 0 && <p>{p1}</p>}
      {type === 2 && (
        <>
          <p>{p1}</p>
          <Codeblock data={c1} isJson={false} />
          <p>{p2}</p>
          {/* <div className="">
            {connected && (
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                onClick={() => runCode()}
                disabled={loadingTx}
              >
                Run Code
              </button>
            )}
          </div> */}
        </>
      )}
    </>
  );
}
