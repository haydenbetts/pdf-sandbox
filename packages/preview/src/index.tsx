import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import * as Paged from '@pdf-sandbox/paged-js';
import styles from './styles';

interface Props {
  html: string;
  css: string;
}

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

function Header({ html, css }: Props) {
    const preview = useRef(null);

    let paged = null;

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
      <Frame>
      <style>
          {styles}
      </style>
      <div ref={(p) => {
        preview.current = p;
        if (!paged) {
          paged = new Paged.Previewer();
        }
      }}></div>
     </Frame>
  );
}

export default Header;
