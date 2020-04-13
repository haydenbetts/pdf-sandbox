import React, { useState, useRef, useEffect } from 'react';
import { createStyles, withStyles } from '@material-ui/core/styles';
import {Grid, IconButton, Box} from '@material-ui/core';
import { createPortal } from 'react-dom';
import PictureAsPdf from '@material-ui/icons/PictureAsPdf';
import GetApp from '@material-ui/icons/GetApp';
// import * as Paged from '@pdf-sandbox/paged-js';
import PreviewFrame from '@pdf-sandbox/preview';

import Tab from '../components/Tab';

const styles = (theme: any) => 
  createStyles({
    preview: {
        backgroundColor: theme.palette.grey.one
    },
    header: {
      height: 40,
      backgroundColor: theme.palette.grey.one
    },
    bg: {
      backgroundColor: theme.palette.grey.one,
      overflow: 'scroll',
      height: 3000
    },
    subhead: {
      height: 36,
      width: '100%',
      backgroundColor: '#ffffff'
    }
  });

  type PreviewProps = {
      classes: any;
      html: string;
      css: string;
  }

// let paged = new Paged.Previewer();

enum Tabs {
  pdf = 'pdf',
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


const Preview = ({ classes, html, css } : PreviewProps) => {

  const [state, setState] = useState({
    tab: Tabs.pdf,
    settings: {
      left_right: true
    },
    files: {
      pdf: {
        name: 'untitled.pdf'
      }
    }
  })

  const preview = useRef(null);

      const print = async () => {
          /* eslint-disable */
          var ifr = document.createElement('iframe');
          // ifr.style='height: 0px; width: 0px; position: absolute'
          
          document.body.appendChild(ifr);
        
           var scr = ifr.contentDocument!.createElement("script");
        
          scr.type = "text/javascript";
          scr.src = 'https://unpkg.com/pagedjs/dist/paged.polyfill.js'; // Use the IP       found above
          ifr!.contentDocument!.head.appendChild(scr);

          var style = ifr.contentDocument!.createElement("style");

          ifr.contentDocument!.head.appendChild(style);
          style.type = 'text/css';
          style.appendChild(ifr.contentDocument!.createTextNode(css + 'body { -webkit-print-color-adjust:exact; }'));

          var body = ifr.contentDocument!.createElement("body");
          body.innerHTML = html;

          ifr.contentDocument!.body = body;

          await new Promise ((resolve) => setTimeout(resolve, 500));
          ifr!.contentWindow!.print();

          document.body.removeChild(ifr);
        }
  //  useEffect(() => {
  //       if (preview.current && paged) {
  //           if (paged.polisher) {
  //             paged.polisher.destroy();
  //             paged.polisher = new Paged.Polisher(false);
  //           }

  //           const placeholder = document.createElement('div');
  //           placeholder.innerHTML = html;
  //           let flow = paged.preview(placeholder, css, preview.current).then((flow: any) => {
  //             const container = document.querySelector('.pagedjs_pages');
  //             if (container) {
  //               (container as any).style.transformOrigin = 'top';
  //               (container as any).style.transform = 'scale(.5) translate(0px, 100px)';
  //             }
  //             const pages = Array.from(document.querySelectorAll('.pagedjs_page'));
  //             pages.forEach((page) => {
  //               (page as any).style.backgroundColor = '#fdfdfd';
  //               (page as any).style.marginBottom = '16px';
  //             })
  //           }).catch((err: any) => console.error(err))
  //       }
  //   }, [html, css])
    
  return (
    <div className={classes.bg}>
      <Grid className={classes.header}>
        <Tab active={state.tab === Tabs.pdf} name={state.files.pdf.name} tab={Tabs.pdf} onClick={() => {}} Icon={PictureAsPdf}/>
        <Grid className={classes.subhead} container alignItems="center" justify="space-between">
          <Grid item container style={{width: 'unset'}}>
          <Box ml={1}>
          <input type="checkbox" id="scales" name="scales"checked={!state.settings.left_right} />
          </Box>
          <Box ml={1}>
             Left/Right Pages
          </Box>
          </Grid>
          <Box mr={2}>
          <IconButton onClick={() => print()} size="small">
            <GetApp fontSize="small"/>
          </IconButton>
          </Box>
        </Grid>
      </Grid>
       <PreviewFrame html={html} css={css}/>
   </div>
  )
}

  export default withStyles(styles, { withTheme: true })(Preview);;