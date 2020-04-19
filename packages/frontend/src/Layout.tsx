import React, { useState, useEffect, useRef } from 'react';
import { createStyles, withStyles } from '@material-ui/core/styles';
import { matchPath } from 'react-router';
import { RouterState } from 'connected-react-router';
import Grid from '@material-ui/core/Grid';
import { fetchPDF } from './redux/actions/pdfs';
import { connect } from 'react-redux';


import Header from './Header';
import Sidebar from './sidebar'
import Editor from './editor';
import Preview from './preview'
import SplitPane from './components/SplitPane';
import { CircularProgress, StepIconClasskey } from '@material-ui/core';

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
    classes: any;
    pathname: string;
    fetching: boolean;
    fetchPDF: (id: string) => void;
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


const Layout = ({classes, pathname, fetching, fetchPDF}: LayoutProps) => {
    const persisted = localStorage.getItem('state');
    const [state, setState] = useState(persisted ? JSON.parse(persisted) : {
        width: 50,
    })

    useEffect(() => {
        type RouteParams = { params: { id?: string }};
        const {
            params
          } : RouteParams = matchPath(pathname, {
            path: '/:id',
            exact: true,
            strict: false
          }) || { params: {} };

          if (params.id) {
              console.log('about to fetch', params.id);
            fetchPDF(params.id);
          }
    }, []);

    console.log('feetching', fetching)

    return (
        <div style={{maxHeight: '100vh', overflow: 'hidden'}}>
            <Header />
            <Grid id="outside" container direction="row" style={{flexWrap: 'nowrap'}}>
                <Sidebar></Sidebar>
                    <div style={{position: 'relative', width: '100%'}}>
                    {fetching && <CircularProgress />}
                        <SplitPane vertical={false} className="test" onResize={() => {}}>
                            <Grid item>
                                <Editor />
                            </Grid>
                            <Grid item style={{overflow: 'scroll'}}>
                                <Preview />
                            </Grid>
                        </SplitPane>
                    </div>
            </Grid>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    pathname: (state.router as RouterState).location.pathname,
    fetching: (state.pdfs.fetching)
});

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, { fetchPDF })(Layout));