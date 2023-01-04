// import { useCallback, useState } from "react";
import MediumEditor from "medium-editor";
import "medium-editor/dist/css/medium-editor.css";
import "medium-editor/dist/css/themes/beagle.css";
import { useEffect, useRef, useState } from "react";
// import Editor from "react-medium-editor";

export default function TextEditor({
  value,
  onChange,
  className = undefined,
  options = {},
}) {
  // const [editor, setEditor] = useState<any>();
  // console.log(editor);
  // const onRefChange = useCallback((node) => {
  //   if (node === null) {
  //     setEditor(null);
  //   } else {
  //     if (editor == null) {
  //       const et = new MediumEditor(node);
  //       setEditor(et);
  //     }
  //   }
  // }, []);

  // function handleChange(text, medium) {
  //   onChange(text);
  // }

  let [t, setT] = useState(value);
  let container = useRef();
  let medium = useRef();

  useEffect(() => {
    medium.current = new MediumEditor(container.current, options);
    medium.current.subscribe("editableInput", (e) => {
      change(container.current.innerHTML);
    });
    return () => {
      medium.current.destroy();
    };
  }, []);

  function change(text) {
    setT(t);
    if (onChange) onChange(text, medium);
  }

  useEffect(() => {
    setT(value);
  }, []);

  // if (medium && medium.current) {
  //   medium.current.saveSelection();
  // }

  let thisClassName = "outline-none";
  if (className) {
    thisClassName += ` ${className}`;
  }

  return (
    <>
      {/* <div
        className="px-0 w-full prose text-gray-900 bg-gray-50 border-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 outline-none h-48 overflow-y-auto"
        ref={onRefChange}
      ></div> */}
      {/* <div>
        <Editor
          // className="px-0 w-full prose text-gray-900 bg-gray-50 border-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 outline-none h-48 overflow-y-auto"
          className="outline-none"
          text={value}
          onChange={handleChange}
          options={options}
        />
      </div> */}
      <div
        className={thisClassName}
        dangerouslySetInnerHTML={{ __html: t }}
        ref={container}
      />
    </>
  );
}
