import React, { useState } from 'react';
import { createStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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
    const [state, setState] = useState({
        name: 'Untitled PDF',
        html: dHTML,
        css: dCSS,
    })

    return (
        <div style={{maxHeight: '100vh', overflow: 'hidden'}}>
            <Header name={state.name}/>
            <Grid container direction="row" style={{flexWrap: 'nowrap'}}>
                <Sidebar></Sidebar>
                <Grid item style={{width: '50%'}}>
                 <Editor parentSet={setState} parentState={state}/>
                </Grid>
                <Grid item style={{width: '50%', overflow: 'scroll'}}>
                    <Preview html={state.html} css={state.css}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default withStyles(styles, { withTheme: true })(Layout);;