import Highlight from "react-highlight";

export default function Codeblock({
  data,
  language = "language-js",
  isJson = true,
}) {
  return (
    <div className="max-h-screen overflow-auto relative not-format mb-4">
      <pre>
        <Highlight className={language}>
          {isJson ? JSON.stringify(data, null, 2) : data}
        </Highlight>
      </pre>
    </div>
  );
}
