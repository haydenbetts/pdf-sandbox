import React, { useState, useEffect } from 'react';
import ReactEditor from "react-ace"
import beautify from 'js-beautify';

import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-github";

import prettier from "prettier/standalone";
import parserHTML from "prettier/parser-html";

import UseDebounce from '../hooks/UseDebounce';

console.log(parserHTML)


type EditorProps = {
    setHTML: Function,
    html: string
}


const Editor = (props : EditorProps) => {

  const [state, setState] = useState(props.html);
  const debouncedState = UseDebounce(state, 500);
  
  useEffect(() => {
    props.setHTML(state);
  }, [debouncedState])
  
    const editorProps = {
      mode: 'html',
      value: state,
      theme: "github",
      onChange: (val: string) => setState(val),
      name: 'id',
      fontSize: 12,
      showPrintMargin: false,
      showGutter: false,
      highlightActiveLine: false,
      setAutoScrollEditorIntoView: true,
      height: '100vh',
      width: '100%',
      setOptions: {
        showLineNumbers: false,
        tabSize: 2,
        useWorker: false
      },
      editorProps: {
        $blockScrolling: true
      }
    };
  
    return (
        <div >
           <ReactEditor {...editorProps} />
        </div>
    );
  }
  
export default Editor;