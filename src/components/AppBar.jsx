import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import CreatePurchaseDialog from './CreatePurchaseDialog';

const styles = {
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
};

const BlueAppBar = props => {
  const { classes, ...others } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Purchase Tracker
          </Typography>
          <CreatePurchaseDialog {...others} />
        </Toolbar>
      </AppBar>
    </div>
  );
};

BlueAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BlueAppBar);
