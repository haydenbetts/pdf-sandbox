import React, { useState } from 'react';
import { createStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SvgIcon from '@material-ui/core/SvgIcon';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Code from '@material-ui/icons/Code';
import sanitizeHtml from 'sanitize-html';
import { connect } from 'react-redux';
import JSON from './JSONIcon.svg';

import { setHTML, setCSS, setJSON } from '../redux/actions/pdfs';
import HTMLInput from './HTMLInput';
import CSSInput from './CSSInput';
import JSONInput from './JSONInput';
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
    setJSON: () => void;
    html: string;
    css: string;
    json: string;
}

enum Tabs {
    html = 'html',
    css = 'css',
    json = 'json'
}

const Editor = ({ classes, setCSS, setHTML, setJSON, html, css, json } : EditorProps) => {

    const [state, setState] = useState({
        tab: Tabs.html,
        files: {
            html: {
                name: 'index.html'
            },
            css: {
                name: 'styles.css'
            },
            json: {
                name: 'data.json'
            }
        }
    });

    const onTabClick = ((tab: Tabs) => {
        setState({...state, tab})
    })

    const GetEditor = () => {
        switch(state.tab) {
            case Tabs.html:
                return <HTMLInput html={html} setHTML={setHTML}/>
            case Tabs.css:
                return <CSSInput css={css} setCSS={setCSS}/>
            case Tabs.json:
                return <JSONInput json={json} setJSON={setJSON}/>
            default:
                return <HTMLInput html={html} setHTML={setHTML}/>
        }
    }
    
    return (
        <div className={classes.editor}>
            <Grid container direction="row" className={classes.tab_row}>
                <Grid item>
                     <Tab active={state.tab === Tabs.html} name={state.files.html.name} tab={Tabs.html} onClick={onTabClick} Icon={Code}/>
                </Grid>
                <Grid item>
                 <Tab active={state.tab === Tabs.css} name={state.files.css.name} tab={Tabs.css} onClick={onTabClick} Icon={Code}/>
                </Grid>
                <Grid item>
                 <Tab active={state.tab === Tabs.json} name={state.files.json.name} tab={Tabs.json} onClick={onTabClick} Icon={Code}/>
                </Grid>
            </Grid>
            <div style={{maxHeight: '90vh', overflow: 'scroll'}}>
                {GetEditor()}
            </div>
        </div>
    )
  }
  const mapStateToProps = (props: any) => ({ 
      html: props.pdfs.html, 
      css: props.pdfs.css,
      json: props.pdfs.json
})

  export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, { setHTML, setCSS, setJSON })(Editor));