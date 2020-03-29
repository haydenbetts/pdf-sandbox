import React, { useState, useRef, useEffect } from 'react';
import { createStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import * as Paged from '@pdf-sandbox/paged-js';

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
    }
  });

  type PreviewProps = {
      classes: any;
      html: string;
      css: string;
  }

let paged = new Paged.Previewer();


const Preview = ({ classes, html, css } : PreviewProps) => {
  const preview = useRef(null);

   useEffect(() => {
        if (preview.current && paged) {

            const placeholder = document.createElement('div');
            placeholder.innerHTML = html;
            let flow = paged.preview(placeholder, css, preview.current).then((flow: any) => {
              const container = document.querySelector('.pagedjs_pages');
              if (container) {
                (container as any).style.transformOrigin = 'top';
                (container as any).style.transform = 'scale(.5)';
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
    <div className={classes.bg}>
      <Grid className={classes.header}></Grid>
     <div ref={preview}></div>
   </div>
  )
}

  export default withStyles(styles, { withTheme: true })(Preview);;