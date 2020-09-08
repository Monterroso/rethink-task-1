import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import css from "./style.css";

function PlaintextEditor({ file, write }) {
  console.log(file, write);

  const [text, setText] = useState("");

  useEffect(() => {
    (async () => {
      setText(await file.text());
    })();
  }, [file]);

  const handleChange = (event) => {
    setText(event.target.value)
    write(new File(
      [text],
      "/plain.txt",
      {
        type: "text/plain",
        lastModified: new Date()
      }
    ))
  } 

  const textStyle = {
    whiteSpace: "pre-wrap", 
    width: "90%", 
    display: "inline-block"
  }

  return (
    <div className={css.editor}>
      <h3>{file.name}</h3>
      <i>
        <textarea style={textStyle} value={text} onChange={handleChange}/>
      </i>
    </div>
  );
}

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PlaintextEditor;
