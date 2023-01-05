// import { useCallback, useState } from "react";
import MediumEditor from "medium-editor";
import "medium-editor/dist/css/medium-editor.css";
import "medium-editor/dist/css/themes/beagle.css";
import { useEffect, useRef, useState } from "react";
// import Editor from "react-medium-editor";

export default function TextEditor({
  value,
  onChange,
  className,
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
    //@ts-ignore
    medium.current.subscribe("editableInput", (e) => {
      //@ts-ignore
      change(container.current.innerHTML);
    });
    return () => {
      //@ts-ignore
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
      <div
        className={thisClassName}
        dangerouslySetInnerHTML={{ __html: t }}
        //@ts-ignore
        ref={container}
      />
    </>
  );
}
