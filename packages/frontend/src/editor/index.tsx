import React, { useState } from 'react';
import { createStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Code from '@material-ui/icons/Code';

import HTMLInput from './HTMLInput';
import CSSInput from './CSSInput';

const styles = (theme: any) => 
  createStyles({
    editor: {
        height: '100vh'
    },
    tab_row: {
        flexWrap: 'nowrap',
        backgroundColor: theme.palette.grey.one
    },
    tab_active: {
        height: 40,
        width: 250,
        backgroundColor: '#ffffff',
        color: theme.palette.primary.main,
        alignItems: 'center',
        position: 'relative',
        zIndex: 10,
        boxShadow: '3px 0px 0px 0px hsla(0, 0%, 0%, .1)',
        cursor: 'pointer'
    },
    tab_inactive: {
        height: 40,
        width: 250,
        backgroundColor: theme.palette.grey.four,
        alignItems: 'center',
        boxShadow: 'inset -1px 0px 2px 0px hsla(0, 0%, 0%, .1)',
        cursor: 'pointer'
    }
  });


type TabProps = {
    classes: any,
    active?: Boolean,
    name: string,
    tab: Tabs,
    onClick: Function;
}

const Tab = withStyles(styles, { withTheme: true })(({ classes, active, name, tab, onClick } : TabProps) => {

    return (
    <Grid container direction="row" className={active ? classes.tab_active : classes.tab_inactive} onClick={() => onClick(tab)}>
        <Box ml={2}></Box>
        <Code fontSize="small"/>
        <Box ml={1}></Box>
        <Typography style={{fontWeight: 200}}>{name}</Typography>
    </Grid>
    )
})


type EditorProps = {
    classes: any;
    parentSet: Function;
    parentState: any;
}

enum Tabs {
    html = 'html',
    css = 'css'
}


const Editor = ({ classes, parentSet, parentState } : EditorProps) => {

    const [state, setState] = useState({
        tab: Tabs.html,
        files: {
            html: {
                name: 'index.html'
            },
            css: {
                name: 'styles.css'
            }
        }
    });

    const onTabClick = ((tab: Tabs) => {
        setState({...state, tab})
    })
    
    return (
        <div className={classes.editor}>
            <Grid container direction="row" className={classes.tab_row}>
                <Grid item>
                     <Tab active={state.tab === Tabs.html} name={state.files.html.name} tab={Tabs.html} onClick={onTabClick}/>
                </Grid>
                <Grid item>
                 <Tab active={state.tab === Tabs.css} name={state.files.css.name} tab={Tabs.css} onClick={onTabClick}/>
                </Grid>
            </Grid>
            <div style={{maxHeight: '90vh', overflow: 'scroll'}}>
                {state.tab === Tabs.html ? (
                    <HTMLInput html={parentState.html} setHTML={(html: string) => parentSet({...state, html})}/>
                ) : (
                    <CSSInput css={parentState.css} setCSS={(css: string) => parentSet({...state, css})}/>
                )}
            </div>
        </div>
    )
  }

  export default withStyles(styles, { withTheme: true })(Editor);;