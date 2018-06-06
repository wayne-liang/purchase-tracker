import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { lighten } from '@material-ui/core/styles/colorManipulator';

import { deletePurchase } from '../util/Service';

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

const EnhancedTableToolbar = props => {
  const {
    selected,
    classes,
    handleChange,
    filter,
    reload,
    clearSelected,
  } = props;

  const onClickDelete = () => {
    selected.forEach(purchase => {
      deletePurchase(purchase, reload);
    });

    clearSelected();
  };

  const numSelected = selected.length;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="title" id="tableTitle">
            Purchases
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton onClick={onClickDelete} aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="filter">Filter</InputLabel>
            <Select
              value={filter}
              onChange={handleChange}
              inputProps={{
                name: 'filter',
                id: 'filter',
              }}
            >
              <MenuItem value="none">
                <em>None</em>
              </MenuItem>
              <MenuItem value="week">This week</MenuItem>
              <MenuItem value="month">This month</MenuItem>
            </Select>
          </FormControl>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  selected: PropTypes.array.isRequired,
};

export default withStyles(toolbarStyles)(EnhancedTableToolbar);
