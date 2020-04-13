import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './paged.css';

class Frame extends React.Component {
  iframeHead: any;
  iframeRoot: any;
  node: any;

  componentDidMount() {
    this.iframeHead = this.node.contentDocument.head
    this.iframeRoot = this.node.contentDocument.body
    this.forceUpdate()
  }

  render() {
    const { children, ...rest } = this.props
    return (
      <iframe {...rest} ref={node => (this.node = node)} style={{width: '100%', height: '100vh', transform: 'translate(0px, 50px)' }}>
        {this.iframeRoot && createPortal(children, this.iframeRoot)}
      </iframe>
    )
  }
}

const Preview = ({ html, css, Paged } : { html: string, css: string, Paged: any}) => {
  
    let paged = new Paged.Previewer();

    const preview = useRef(null);
  
     useEffect(() => {
          if (preview.current && paged) {
              if (paged.polisher) {
                paged.polisher.destroy();
                paged.polisher = new Paged.Polisher(false);
              }
  
              const placeholder = document.createElement('div');
              placeholder.innerHTML = html;
              let flow = paged.preview(placeholder, css, preview.current).then((flow: any) => {
                const container = document.querySelector('.pagedjs_pages');
                if (container) {
                  (container as any).style.transformOrigin = 'top';
                  (container as any).style.transform = 'scale(.5) translate(0px, 100px)';
                }
                const pages = Array.from(document.querySelectorAll('.pagedjs_page'));
                pages.forEach((page) => {
                  (page as any).style.backgroundColor = '#fdfdfd';
                  (page as any).style.marginBottom = '16px';
                })
              }).catch((err: any) => console.error(err))
          }
      }, [html, css])
      
    return (
      <div>
        <script type="text/javascript" src="https://unpkg.com/pagedjs/dist/paged.polyfill.js">
        </script>
        <style>
          {`
          :root {
            --color-mbox : rgba(0,0,0,0.2);
            --margin: 4px; 
          }
          
          [contenteditable]:focus {
              outline: 0px solid transparent;
          }
          
          #controls {
            display: none;
          }
          
          @media screen {
          
            body {
              background-color: whitesmoke;
            }
          
            .pagedjs_page {
              background-color: #fdfdfd;
              margin: calc(var(--margin) * 4) var(--margin);
              flex: none;
              box-shadow: 0 0 0 1px var(--color-mbox);
            }
          
            .pagedjs_pages {
              display: flex;
              flex-direction: column;
              align-items: center;
              flex-wrap: wrap;
              justify-content: flex-start;
              transform-origin: top;
              transform: scale(.5) translate(100px, 0px);
              margin: 0 auto;
            }
          
            #controls {
              margin: 20px 0;
              text-align: center;
              display: block;
            }
          
            .pagedjs_first_page {
              /* margin-left: calc(50% + var(--margin)); */
            }
          }
          
          @media screen {
            .debug .pagedjs_margin-top .pagedjs_margin-top-left-corner,
            .debug .pagedjs_margin-top .pagedjs_margin-top-right-corner {
              box-shadow: 0 0 0 1px inset var(--color-mbox);
            }
          
            .debug .pagedjs_margin-top > div {
              box-shadow: 0 0 0 1px inset var(--color-mbox);
            }
          
            .debug .pagedjs_margin-right > div {
              box-shadow: 0 0 0 1px inset var(--color-mbox);
            }
          
            .debug .pagedjs_margin-bottom .pagedjs_margin-bottom-left-corner,
            .debug .pagedjs_margin-bottom .pagedjs_margin-bottom-right-corner {
              box-shadow: 0 0 0 1px inset var(--color-mbox);
            }
          
            .debug .pagedjs_margin-bottom > div {
              box-shadow: 0 0 0 1px inset var(--color-mbox);
            }
          
            .debug .pagedjs_margin-left > div {
              box-shadow: 0 0 0 1px inset var(--color-mbox);
            }
          }`}
        </style>
        <Frame>
         <div ref={preview}></div>
         </Frame>
      </div>
    )
  }
  
export default Preview;