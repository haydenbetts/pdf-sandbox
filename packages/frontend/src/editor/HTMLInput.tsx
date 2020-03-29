import React from 'react';
import ReactEditor from "react-ace"
import beautify from 'js-beautify';

import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-github";

import prettier from "prettier/standalone";
import parserHTML from "prettier/parser-html";

console.log(parserHTML)


type EditorProps = {
    setHTML: Function,
    html: string
}


const Editor = (props : EditorProps) => {
  
    const editorProps = {
      mode: 'html',
      value: props.html,
      theme: "github",
      onChange: (val: string) => {


        // console.log(
        //   prettier.format(val, {
        //     parser: "html",
        //     plugins: [parserHTML],
        //   })
        // )

        props.setHTML(val)
       },
      name: 'id',
      fontSize: 12,
      showPrintMargin: false,
      showGutter: false,
      highlightActiveLine: false,
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