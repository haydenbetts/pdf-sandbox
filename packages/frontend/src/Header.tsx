import React from 'react';
import { Grid, Typography, Box } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import PictureAsPdf from '@material-ui/icons/PictureAsPdf';
import Save from '@material-ui/icons/Save';
import GetAppIcon from '@material-ui/icons/GetApp';

const styles = (theme: any) => 
  createStyles({
    header: {
        width: '100%',
        height: 50,
        backgroundColor: theme.palette.grey.one
    },
    headerIcon: {
        color: theme.palette.grey.three,
        '&:hover': {
            transition: 'background-color .2s',
            color: theme.palette.grey.three
        }
    },
    text: {
        color: theme.palette.grey.three
    }
  });

type HeaderProps = {
    classes: any,
    name: string;
}

const Header = ({classes, name}: HeaderProps) => {
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
                     <Save className={classes.headerIcon} fontSize="small"/>
                    </Box>
                    <Box mr={1}>
                    <Typography variant="subtitle2" className={classes.text}>Save</Typography>
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

export default withStyles(styles, { withTheme: true })(Header);;