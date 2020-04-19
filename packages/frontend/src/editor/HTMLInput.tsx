import React, { useState, useEffect } from 'react';
import ReactEditor from "react-ace"
import beautify from 'js-beautify';

import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-eclipse";
import "ace-builds/src-min-noconflict/ext-language_tools"

import prettier from "prettier/standalone";
import parserHTML from "prettier/parser-html";
import sanHTML from 'sanitize-html';

import UseDebounce from '../hooks/UseDebounce';

console.log(parserHTML)


type EditorProps = {
    setHTML: Function,
    html: string
}

const sanitizeHtml = (html: string) => sanHTML(html, {
  allowedTags: [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
  'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
  'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'iframe', 'img', 'link', 'svg' , 'span'],
  allowedAttributes: {
      img: ['href', 'src'],
      '*': [ 'style', 'class', 'align', 'alt', 'center', 'bgcolor', 'href' ]
  }
})

const Editor = (props : EditorProps) => {

    const [state, setState] = useState(props.html);
    const debouncedState = UseDebounce(state, 500);

    useEffect(() => {
      if (!state) setState(props.html);
    }, [props.html])

    useEffect(() => {
      props.setHTML(sanitizeHtml(state))
    }, [debouncedState])

    const editorProps = {
      mode: 'html',
      value: state,
      theme: 'eclipse',
      onChange: (val: string) => {
        setState(val);
      },
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