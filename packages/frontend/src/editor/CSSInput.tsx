import React from 'react';
import ReactEditor from "react-ace"

import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/theme-github";

type CSSProps = {
    setCSS: Function,
    css: string
}

const Editor = (props : CSSProps) => {
  
    const editorProps = {
      mode: 'css',
      value: props.css,
      theme: "github",
      onChange: (val: string) => props.setCSS(val,  
        {
            "indent_size": 4,
            "html": {
                "end_with_newline": true,
                "js": {
                    "indent_size": 2
                },
                "css": {
                    "indent_size": 2
                }
            },
            "css": {
                "indent_size": 1
            },
            "js": {
               "preserve-newlines": true
            }
        }
        ),
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