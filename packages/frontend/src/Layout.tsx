import React, { useState, useEffect, useRef } from 'react';
import { createStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import sanitizeHtml from 'sanitize-html';
import Draggable from "react-draggable";

import Header from './Header';
import Sidebar from './sidebar'
import Editor from './editor';
import Preview from './preview'
import SplitPane from './components/SplitPane';

const styles = (theme: any) => 
  createStyles({
    header: {
        width: '100%',
        height: 50,
        backgroundColor: theme.palette.grey.one
    },
    spacer: {
        height: '40px',
        backgroundColor: theme.palette.grey.one
    }
  });

type LayoutProps = {
    classes: any
}

const dCSS = `
@page { 
    marks: crop cross; 
    margin: 20mm;  
    @top-right {
       content: "My title";
     }
     @bottom-left {
       content: counter(page);
     }

}`

const dHTML =
`
<div>
    Gonna be an invoice
</div>
`


const Layout = ({classes}: LayoutProps) => {
    const persisted = localStorage.getItem('state');
    console.log('persisted', persisted)
    const [state, setState] = useState(persisted ? JSON.parse(persisted) : {
        name: 'Untitled PDF',
        html: dHTML,
        css: dCSS,
        width: 50,
        activeDrags: 0
    })
    const [deltaPosition, setDeltaPosition] = useState({
        x: 0, y: 0
    });

    const setHTML = (html: string) => {
        console.log('sanitizeHtml(html)', sanitizeHtml(html, {
            allowedTags: [ 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
            'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
            'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'iframe', 'img', 'table', 'link', 'span' ],
            allowedAttributes: {
                div: ['class'],
                img: ['href']
            }
        }))
        setState({...state, html: sanitizeHtml(html, {
            allowedTags: [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
            'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
            'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'iframe', 'img', 'link', 'svg' , 'span'],
            allowedAttributes: {
                img: ['href', 'src'],
                '*': [ 'style', 'class', 'align', 'alt', 'center', 'bgcolor', 'href' ]
            }
        })});
    }

    const setCSS = (css: string) => {
        console.log('css', css)
        setState({...state, css: sanitizeHtml(css)});
    }

    const draggableExtent = useRef(null);

    const dragHandlers = {
        onStart: () => setState({...state, activeDrags: ++state.activeDrags}), 
        onStop: () => setState({...state, activeDrags: --state.activeDrags}),
        handleDrag: (e: any, ui: any) => {
            console.log(state.width)
            let inital = state.width + (ui.deltaX / 50);
            if (inital < 20) inital = 20;
            if (inital > 80) inital = 80;
            setState({...state, width: inital})
            // console.log('x', x);
            setDeltaPosition({
                x: 0,
                y: 0
              });
        }
    };


    useEffect(() => {
        localStorage.setItem('state', JSON.stringify(state));
    }, [state])

    return (
        <div style={{maxHeight: '100vh', overflow: 'hidden'}}>
            <Header name={state.name}/>
            <Grid id="outside" container direction="row" style={{flexWrap: 'nowrap'}}>
                <Sidebar></Sidebar>
                    <div style={{position: 'relative', width: '100%'}}>
                        <SplitPane vertical={false} className="test" onResize={() => {}}>
                            <Grid item>
                                <Editor setHTML={setHTML} setCSS={setCSS} parentState={state}/>
                            </Grid>
                            <Grid item style={{overflow: 'scroll'}}>
                                <Preview html={state.html} css={state.css}/>
                            </Grid>
                        </SplitPane>
                    </div>
            </Grid>
        </div>
    )
}

export default withStyles(styles, { withTheme: true })(Layout);;