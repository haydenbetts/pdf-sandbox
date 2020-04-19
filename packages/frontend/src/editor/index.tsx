import React, { useState } from 'react';
import { createStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Code from '@material-ui/icons/Code';
import sanitizeHtml from 'sanitize-html';
import { connect } from 'react-redux';

import { setHTML, setCSS } from '../redux/actions/pdfs';
import HTMLInput from './HTMLInput';
import CSSInput from './CSSInput';
import Tab from '../components/Tab';

const styles = (theme: any) => 
  createStyles({
    editor: {
        height: '100vh'
    },
    tab_row: {
        flexWrap: 'nowrap',
        backgroundColor: theme.palette.grey.one
    }
  });

type EditorProps = {
    classes: any;
    setCSS: () => void;
    setHTML: () => void;
    html: string;
    css: string;
}

enum Tabs {
    html = 'html',
    css = 'css'
}

const Editor = ({ classes, setCSS, setHTML, html, css } : EditorProps) => {

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
                     <Tab active={state.tab === Tabs.html} name={state.files.html.name} tab={Tabs.html} onClick={onTabClick} Icon={Code}/>
                </Grid>
                <Grid item>
                 <Tab active={state.tab === Tabs.css} name={state.files.css.name} tab={Tabs.css} onClick={onTabClick} Icon={Code}/>
                </Grid>
            </Grid>
            <div style={{maxHeight: '90vh', overflow: 'scroll'}}>
                {state.tab === Tabs.html ? (
                    <HTMLInput html={html} setHTML={setHTML}/>
                ) : (
                    <CSSInput css={css} setCSS={setCSS}/>
                )}
            </div>
        </div>
    )
  }
  const mapStateToProps = (props: any) => ({ html: props.pdfs.html, css: props.pdfs.css })

  export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, { setHTML, setCSS })(Editor));