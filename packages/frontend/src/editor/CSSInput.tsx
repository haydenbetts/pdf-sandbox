import React from 'react';
import ReactEditor from "react-ace"

import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/theme-eclipse";
import "ace-builds/src-min-noconflict/ext-searchbox"

type CSSProps = {
    setCSS: Function,
    css: string
}

const Editor = (props : CSSProps) => {

    const editorProps = {
      mode: 'css',
      value: props.css,
      theme: 'eclipse',
      onChange: (val: string) => props.setCSS((val)),
      name: 'id',
      fontSize: 13,
      showPrintMargin: false,
      showGutter: true,
      highlightActiveLine: true,
      setAutoScrollEditorIntoView: true,
      height: '100vh',
      width: '100%',
      setOptions: {
        showLineNumbers: true,
        highlightActiveLine: true,
        enableBasicAutocompletion: true,
        tabSize: 4,
        useWorker: false,
        displayIndentGuides: true
      },
      editorProps: {
        $blockScrolling: true
      }
    };
  
    return (
      <>
        <div >
           <ReactEditor {...editorProps} />
        </div>
        <style>
           {`.ace_editor {
             font-family: 'Source Code Pro', monospace !important;,
           }`}
        </style>
      </>
    );
  }
  
export default Editor;