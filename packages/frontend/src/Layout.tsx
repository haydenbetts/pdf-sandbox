import React, { useState, useEffect } from 'react';
import { createStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import sanitizeHtml from 'sanitize-html';

import Header from './Header';
import Sidebar from './sidebar'
import Editor from './editor';
import Preview from './preview'

const styles = (theme: any) => 
  createStyles({
    header: {
        width: '100%',
        height: 50,
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
    })

    const setHTML = (html: string) => {
        console.log('sanitizeHtml(html)', sanitizeHtml(html, {
            allowedTags: [ 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
            'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
            'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'iframe', 'img', 'table', 'link' ],
            allowedAttributes: {
                div: ['class'],
                img: ['href']
            }
        }))
        setState({...state, html: sanitizeHtml(html, {
            allowedTags: [ 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
            'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
            'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'iframe', 'img', 'link' ],
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

    console.log('state', state)


    useEffect(() => {
        localStorage.setItem('state', JSON.stringify(state));
    }, [state])

    return (
        <div style={{maxHeight: '100vh', overflow: 'hidden'}}>
            <Header name={state.name}/>
            <Grid container direction="row" style={{flexWrap: 'nowrap'}}>
                <Sidebar></Sidebar>
                <Grid item style={{width: '50%'}}>
                 <Editor setHTML={setHTML} setCSS={setCSS} parentState={state}/>
                </Grid>
                <Grid item style={{width: '50%', overflow: 'scroll'}}>
                    <Preview html={state.html} css={state.css}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default withStyles(styles, { withTheme: true })(Layout);;