import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import ListItemText from '@material-ui/core/ListItemText';
import TimelineIcon from '@material-ui/icons/Timeline';
import DraftsIcon from '@material-ui/icons/Drafts';
import PersonIcon from '@material-ui/icons/Person';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import '../../App.css';
const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appFrame: {
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
  'appBar-left': {
    marginLeft: drawerWidth,
  },
  'appBar-right': {
    marginRight: drawerWidth,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});


class Layout extends Component {
  state = {
    anchor: 'left',
  };

  render() {
    const { classes } = this.props;
    const { anchor } = this.state;

    const drawer = (
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor={anchor}
      >
        <div className={classes.toolbar} />
        <Divider />
        <MenuList>
          <Link to="/players">
            <MenuItem className={classes.menuItem}>
              <PersonIcon className={classes.icon}>
                <SendIcon />
              </PersonIcon>
              <ListItemText classes={{ primary: classes.primary }} inset primary="Players" />
            </MenuItem>
          </Link>
          <Link to="/plans">
            <MenuItem className={classes.menuItem}>
              <FormatListNumberedIcon className={classes.icon}>
                <DraftsIcon />
              </FormatListNumberedIcon>
              <ListItemText classes={{ primary: classes.primary }} inset primary="Plans" />
            </MenuItem>
          </Link>
          <Link to="/activities">
            <MenuItem className={classes.menuItem}>
              <AvTimerIcon className={classes.icon}>
                <InboxIcon />
              </AvTimerIcon>
              <ListItemText classes={{ primary: classes.primary }} inset primary="Activities" />
            </MenuItem>
          </Link>
          <Link to="/reports">
            <MenuItem className={classes.menuItem}>
              <TimelineIcon className={classes.icon}>
                <InboxIcon />
              </TimelineIcon>
              <ListItemText classes={{ primary: classes.primary }} inset primary="Reports" />
            </MenuItem>
          </Link>
        </MenuList>
      </Drawer>
    );

    let before = null;
    let after = null;

    if (anchor === 'left') {
      before = drawer;
    } else {
      after = drawer;
    }

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, classes[`appBar-${anchor}`])}
          >
            <Toolbar>
              <Typography variant="title" color="inherit" className={classes.flex}>
                Title
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
          {before}
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {this.props.children}
          </main>
          {after}
        </div>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Layout));