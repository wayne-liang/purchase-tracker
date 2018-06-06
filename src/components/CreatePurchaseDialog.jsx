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

class CreatePurchaseDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      storeName: '',
      cost: '',
      date: '',
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onSubmit() {
    const { storeName, cost, date } = this.state;
    const dateObject = new Date(date);

    createPurchase(storeName, cost, dateObject, this.props.reload);
    this.setState({
      open: false,
      storeName: '',
      cost: '',
      date: '',
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
    this.setState({ open: false });
  }

  render() {
    const { classes } = this.props;

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
          open={this.state.open}
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
              value={this.state.storeName}
              onChange={this.handleChange('storeName')}
              fullWidth
            />
            <br />
            <TextField
              margin="dense"
              fullWidth
              label="Cost"
              value={this.state.cost}
              onChange={this.handleChange('cost')}
              id="cost"
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
              value={this.state.date}
              onChange={this.handleChange('date')}
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
