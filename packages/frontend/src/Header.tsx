import React from 'react';
import { Grid, Typography, Box, CircularProgress, Button } from '@material-ui/core';
import { createStyles, withStyles, Theme } from '@material-ui/core/styles';
import {ImageSearch, PictureAsPdf} from '@material-ui/icons';
import { savePDF, setName } from './redux/actions/pdfs';
import { connect } from 'react-redux';
import Save from '@material-ui/icons/Save';
import GetAppIcon from '@material-ui/icons/GetApp';

const styles = (theme: Theme) => 
  createStyles({
    header: {
        width: '100%',
        height: 50,
        backgroundColor: (theme as any).palette.grey.one
    },
    headerIcon: {
        color: (theme as any).palette.grey.three,
        '&:hover': {
            transition: 'background-color .2s',
            color: (theme as any).palette.grey.three
        }
    },
    text: {
        color: (theme as any).palette.grey.three,
        textTransform: 'unset'
    },
    inputDefault: {
        backgroundColor: 'unset',  
        border: 'none',
        fontSize: '0.875rem',
        fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
        fontWeight: 500,
        lineHeight: 1.577,
        letterSpacing: '0.00714em',
        width: 100,
        color: '#737373',
        '&:focus': {
            backgroundColor: '#fff'
        }
    }
  });

type HeaderProps = {
    classes: any,
    saving: boolean;
    savePDF: () => void;
    setName: (name: string) => void;
    name: string;
}

const Header = ({classes = {}, name, savePDF, setName, saving}: HeaderProps) => {
    const handleSave = () => {
        savePDF();
    }
    const handleNameChange = (e: any) => {
        setName(e.target.value);
    }
    return (
        <>
            <header className={classes.header}>
                <Grid container direction="row" style={{height: '100%', alignItems: 'center'}}>
                    <PictureAsPdf className={classes.headerIcon} style={{width: 50}}/>
                    <Box mr={1}>
                        <input value={name} onChange={handleNameChange} className={classes.inputDefault} />
                    </Box>
                    <Box mr={1}>
                        <Button onClick={handleSave} className={classes.text} startIcon={saving ? 
                        (
                            <CircularProgress size={15}/>
                        ) : (
                            <Save style={{transform: 'translate(0px, -1px)'}}/>
                        )}>
                            Save
                        </Button>
                    </Box>
                    <Box mr={1}>
                        <Button className={classes.text} startIcon={<GetAppIcon />}>
                            Archive
                        </Button>
                    </Box>
                    <Box mr={1}>
                        <Button className={classes.text} startIcon={<ImageSearch  style={{transform: 'translate(0px, -1px)'}}/>}>
                        Templates
                        </Button>
                    </Box>
                </Grid>
            </header>
        </>
    )
}

export const mapStateToProps  = (props: any) => ({saving: props.pdfs.saving, name: props.pdfs.name})

const mapDispatchToProps = (dispatch: any) => ({
    setName: (name: string) => dispatch(setName(name)),
    savePDF: () => dispatch(savePDF())
})

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(Header))