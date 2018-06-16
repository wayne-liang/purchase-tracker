import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import NumberFormat from 'react-number-format';

import { createPurchase } from '../util/Service';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

const NumberFormatCustom = props => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      ref={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      decimalScale={2}
      fixedDecimalScale
      allowNegative={false}
      prefix="$"
    />
  );
};

const isValidInput = (storeName, cost, date) => {
  if (storeName.length === 0 || cost.length === 0 || date.length === 0) {
    return false;
  }

  return true;
};

class CreatePurchaseDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      storeName: '',
      cost: '',
      date: '',
      inputError: false,
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onSubmit() {
    const { storeName, cost, date } = this.state;
    const dateObject = new Date(date);

    if (!isValidInput(storeName, cost, date)) {
      this.setState({ inputError: true });
      return;
    }

    createPurchase(storeName, cost, dateObject, this.props.reload);
    this.setState({
      storeName: '',
      cost: '',
      date: '',
      inputError: false,
    });
    this.handleClose();
  }

  handleChange(name) {
    return event =>
      this.setState({
        [name]: event.target.value,
      });
  }

  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false, inputError: false });
  }

  render() {
    const { classes } = this.props;
    const { open, storeName, cost, date, inputError } = this.state;

    return (
      <span>
        <Button
          onClick={this.handleClickOpen}
          variant="contained"
          color="default"
          className={classes.button}
        >
          Add new purchase
        </Button>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth="xs"
        >
          <DialogTitle id="form-dialog-title">Add new purchase</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="storeName"
              label="Store"
              value={storeName}
              onChange={this.handleChange('storeName')}
              error={storeName.length === 0 && inputError}
              fullWidth
            />
            <br />
            <TextField
              margin="dense"
              fullWidth
              label="Cost"
              value={cost}
              onChange={this.handleChange('cost')}
              id="cost"
              error={cost.length === 0 && inputError}
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
            />
            <br />
            <TextField
              margin="dense"
              fullWidth
              id="date"
              label="Date"
              type="date"
              value={date}
              onChange={this.handleChange('date')}
              error={date.length === 0 && inputError}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.onSubmit} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </span>
    );
  }
}

export default withStyles(styles)(CreatePurchaseDialog);
