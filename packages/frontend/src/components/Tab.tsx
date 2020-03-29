import React from 'react';
import { createStyles, withStyles } from '@material-ui/core/styles';
import { Typography, Box, Grid } from '@material-ui/core';

const styles = (theme: any) => 
  createStyles({
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
    tab: any,
    onClick: Function;
    Icon: any;
}


const Tab = ({ classes, active, name, tab, onClick, Icon } : TabProps) => {

    return (
    <Grid container direction="row" className={active ? classes.tab_active : classes.tab_inactive} onClick={() => onClick(tab)}>
        <Box ml={2}></Box>
        <Icon fontSize="small"/>
        <Box ml={1}></Box>
        <Typography style={{fontWeight: 200}}>{name}</Typography>
    </Grid>
    )
}

export default  withStyles(styles, { withTheme: true })(Tab);