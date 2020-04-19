import React from 'react';
import { Grid, Typography, Box, CircularProgress } from '@material-ui/core';
import { createStyles, withStyles, Theme } from '@material-ui/core/styles';
import PictureAsPdf from '@material-ui/icons/PictureAsPdf';
import { savePDF } from './redux/actions/pdfs';
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
        color: (theme as any).palette.grey.three
    }
  });

type HeaderProps = {
    classes: any,
    name: any;
    saving: boolean;
    savePDF: () => void;
}

const Header = ({classes = {}, name, savePDF, saving}: HeaderProps) => {
    const handleSave = () => {
        savePDF();
    }
    return (
        <>
            <header className={classes.header}>
                <Grid container direction="row" style={{height: '100%', alignItems: 'center'}}>
                    <PictureAsPdf className={classes.headerIcon} style={{width: 50}}/>
                    <Box mr={1}>
                        <Typography variant="subtitle1" className={classes.text}>{name}</Typography>
                    </Box>
                    <Box mr={2}> </Box>
                    <Box mr={1}>
                        {saving ? 
                        (
                            <CircularProgress size={10}/>
                        ) : (
                            <Save className={classes.headerIcon} fontSize="small"/>
                        )}
                    </Box>
                    <Box mr={1}>
                    <Typography variant="subtitle2" className={classes.text} style={{cursor: 'pointer'}} onClick={handleSave}>Save</Typography>
                    </Box>
                    <Box mr={1}>
                        <GetAppIcon className={classes.headerIcon} fontSize="small"/>
                    </Box>
                    <Typography variant="subtitle2" className={classes.text}>Archive</Typography>
                </Grid>
            </header>
        </>
    )
}

export const mapStateToProps  = (props: any) => ({saving: props.pdfs.saving})

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, { savePDF })(Header))