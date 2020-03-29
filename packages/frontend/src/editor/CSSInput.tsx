import React, { useState, useEffect} from 'react';
import ReactEditor from "react-ace"

import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/theme-github";

import UseDebounce from '../hooks/UseDebounce';

type CSSProps = {
    setCSS: Function,
    css: string
}

const Editor = (props : CSSProps) => {
  
  const [state, setState] = useState(props.css);
  const debouncedState = UseDebounce(state, 500);

  useEffect(() => {
    props.setCSS(state);
  }, [debouncedState])

    const editorProps = {
      mode: 'css',
      value: state,
      theme: "github",
      onChange: (val: string) => setState(val),
      name: 'id',
      fontSize: 12,
      height: '100vh',
      width: '100%',
      showPrintMargin: false,
      showGutter: false,
      highlightActiveLine: false,
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