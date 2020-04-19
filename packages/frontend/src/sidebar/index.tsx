import React from 'react';
import { createStyles, withStyles } from '@material-ui/core/styles';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const styles = (theme: any) => 
  createStyles({
    bar: {
        height: '100vh',
        width: 50,
        backgroundColor: theme.palette.grey.two
    },
    barButton: {
      height: 48,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: '#ffffff',
        transition: 'background-color .2s',
        '& svg': {
          color: 'white',
          transition: 'color .2s',
        }
      }
    },
    barIcon: {
      color: theme.palette.grey.three,
      height: 30,
      '&:hover': {
        transition: 'background-color .2s'
      }
    }
  });

type SidebarProps = {
  classes: any;
}

const Sidebar = ({ classes } : SidebarProps) => {
    return <div className={classes.bar}>
      {/* <div className={classes.barButton}>
        <HelpOutlineIcon className={classes.barIcon}></HelpOutlineIcon>
      </div> */}
    </div>
}

export default withStyles(styles, { withTheme: true })(Sidebar);;