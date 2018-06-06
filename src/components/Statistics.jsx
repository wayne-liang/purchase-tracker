import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
  root: {
    width: '94%',
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 3,
  },
  toolbar: {
    paddingRight: theme.spacing.unit,
  },
});

const Statistics = props => {
  const { classes, purchases, purchasesThisWeek, purchasesThisMonth } = props;

  const weekTotal =
    purchasesThisWeek.length === 0
      ? 0
      : purchasesThisWeek
          .map(purchase => parseFloat(purchase.cost))
          .reduce((sum, cost) => sum + cost);
  const monthTotal =
    purchasesThisMonth.length === 0
      ? 0
      : purchasesThisMonth
          .map(purchase => parseFloat(purchase.cost))
          .reduce((sum, cost) => sum + cost);
  const total =
    purchases.length === 0
      ? 0
      : purchases
          .map(purchase => parseFloat(purchase.cost))
          .reduce((sum, cost) => sum + cost);

  return (
    <Paper className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>
          <Typography variant="title" id="tableTitle">
            Statistics
          </Typography>
        </div>
        <div className={classes.spacer} />
      </Toolbar>
      <Table className={classes.table}>
        <TableBody>
          <TableRow>
            <TableCell>Total spent this week so far:</TableCell>
            <TableCell numeric>
              ${weekTotal}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Total spent this month so far:</TableCell>
            <TableCell numeric>
              ${monthTotal}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Total spent ever:</TableCell>
            <TableCell numeric>${total}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};

export default withStyles(styles)(Statistics);
