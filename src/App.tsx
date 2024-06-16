import { useEffect, useRef, useState } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

const codeBlock = (text: string) => {
  return `<span class="code-block">${text}</span>`;
};

const App = () => {
  const [html, setHtml] = useState("");
  const contentEditableRef = useRef(null);

  const handleChange = (e: ContentEditableEvent) => {
    const text: string = e.target.value;

    // Replace text surrounded by backticks with the Code component
    const updatedContent: string = text.replace(
      /`([^`]+)`/g,
      (match: string, p1: string) => {
        return codeBlock(p1);
      }
    );

    setHtml(updatedContent);

    // Adjust cursor position to the end of the content
    const contentEditableElement = contentEditableRef.current;
    if (contentEditableElement) {
      const range = document.createRange();
      console.log("range", range);
      const selection = window.getSelection();
      console.log("selection", selection);

      range.selectNodeContents(contentEditableElement);
      range.collapse(false); // Collapse the range to the end of the content

      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  };

  return (
    <ContentEditable
      innerRef={contentEditableRef}
      html={html}
      onChange={handleChange}
    />
  );
};

export default App;