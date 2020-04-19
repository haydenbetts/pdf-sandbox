import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import handlebars from 'handlebars';
import { createStyles, withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {Grid, IconButton, Box, CircularProgress} from '@material-ui/core';
import {PictureAsPdf, ZoomIn, ZoomOut} from '@material-ui/icons';
import GetApp from '@material-ui/icons/GetApp';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

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
      height: 3000,
      cursor: 'move'
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
      json: string;
      filenames: any
  }

enum Tabs {
  pdf = 'pdf',
}

// const Outsider = () => (
//   ReactDOM.createPortal(document.getElementById('preview-container'), document.body)
// )

const Preview = ({ classes, html, css, json, filenames } : PreviewProps) => {

  const [state, setState] = useState({
    tab: Tabs.pdf,
    settings: {
      left_right: true
    }
  })
  const [loading, setLoading] = useState(true);

  const mergeHTMLJSON = () => {
    try {
      var template = handlebars.compile(html);
      return template(JSON.parse(json));
    } catch(err) {
      console.error('err', err);
      return html;
    }
  }

  const preview = useRef(null);

      const print = async () => {
          /* eslint-disable */
          var ifr = document.createElement('iframe');
          // ifr.style='height: 0px; width: 0px; position: absolute'
          
          document.body.appendChild(ifr);
        
           var scr = ifr.contentDocument!.createElement("script");
        
          scr.type = "text/javascript";
          scr.src = 'http://localhost:9090/dist/paged.polyfill.js'; // Use the IP       found above
          ifr!.contentDocument!.head.appendChild(scr);

          var style = ifr.contentDocument!.createElement("style");

          ifr.contentDocument!.head.appendChild(style);
          style.type = 'text/css';
          style.appendChild(ifr.contentDocument!.createTextNode(css + 'body { -webkit-print-color-adjust:exact; }'));

          var body = ifr.contentDocument!.createElement("body");
          body.innerHTML = mergeHTMLJSON();

          ifr.contentDocument!.body = body;

          await new Promise ((resolve) => setTimeout(resolve, 2000));
          ifr!.contentWindow!.print();

          document.body.removeChild(ifr);
        }

    useEffect(() => {
      if (!(window as any).frames) return;
      if (!(window as any).frames[0]) return;


      
      (window as any).frames[0].postMessage(JSON.stringify({ html: mergeHTMLJSON(), css }), '*');
    }, [html, css])
    
  return (
    <TransformWrapper
    defaultScale={1}
    defaultPositionX={200}
    defaultPositionY={100}
    pan={{
      disabled: false,
    }}
  >
{({ zoomIn, zoomOut, resetTransform, ...rest } : any) => (
    <div className={classes.bg}>
      <Grid className={classes.header}>
        <Tab active={state.tab === Tabs.pdf} name={filenames.pdf} tab={Tabs.pdf} onClick={() => {}} Icon={PictureAsPdf}/>
        <Grid className={classes.subhead} container alignItems="center" justify="space-between">
          <Grid container xs={3}>
            <Grid item container style={{width: 'unset'}}>
            <IconButton onClick={zoomIn} size="small">
              <ZoomIn fontSize="small"/>
            </IconButton>
            </Grid>
            <Grid item container style={{width: 'unset'}}>
            <IconButton onClick={zoomOut} size="small">
              <ZoomOut fontSize="small"/>
            </IconButton>
            </Grid>
          </Grid>
          <Box mr={2}>
          <IconButton onClick={() => print()} size="small">
            <GetApp fontSize="small"/>
          </IconButton>
          </Box>
        </Grid>
        <TransformComponent>
        <div style={{height: '100vh', visibility: loading ? 'hidden' : 'visible', width: '100%'}} ref={(ref) => {
          var preview = document.getElementById('preview-container');
          if (!ref || !preview || ref.contains(preview)) return;
          preview.style.width = '100%';
          preview.style.height = '100%';
          ref.appendChild(preview);
          window.addEventListener('message', (event) => {
            if (event.data === 'child_ready') {
              (window as any).frames[0].postMessage(JSON.stringify({ html , css }), '*');
              setLoading(false);
            }
          })
      }}></div>
              </TransformComponent>
      </Grid>
      <style>
        {`
        .react-transform-element {
          width: 100%;
        }
        .react-transform-component {
          width: 100%;
        }
        `}
      </style>
   </div>
     )}
  </TransformWrapper>
  )}
const mapStateToProps = (props: any) => ({ html: props.pdfs.html, css: props.pdfs.css, json: props.pdfs.json, filenames: props.pdfs.filenames })

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, null)(Preview))
