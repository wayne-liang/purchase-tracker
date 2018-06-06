import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

import EnhancedTableToolbar from './EnhancedTableToolbar';
import EnhancedTableHead from './EnhancedTableHead';

const columnData = [
  {
    id: 'store',
    numeric: false,
    disablePadding: true,
    label: 'Store',
  },
  {
    id: 'date',
    numeric: false,
    disablePadding: true,
    label: 'Date (yyyy-mm-dd)',
  },
  {
    id: 'cost',
    numeric: true,
    disablePadding: false,
    label: 'Cost ($)',
  },
];

const styles = theme => ({
  root: {
    width: '98%',
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  floatingButton: {
    position: 'relative',
    float: 'right',
    margin: theme.spacing.unit,
    top: 'auto',
    right: 0,
    bottom: 100,
  },
});

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: 'asc',
      orderBy: 'calories',
      selected: [],
      filter: 'none',
      page: 0,
      rowsPerPage: 10,
    };

    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.handleSelectAllClick = this.handleSelectAllClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearSelected = this.clearSelected.bind(this);
  }

  handleRequestSort(event, property) {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  }

  handleSelectAllClick(event, checked) {
    const { purchases, purchasesThisWeek, purchasesThisMonth } = this.props;
    const { filter } = this.state;

    let data;
    if (filter === 'none') {
      data = purchases;
    } else if (filter === 'week') {
      data = purchasesThisWeek;
    } else if (filter === 'month') {
      data = purchasesThisMonth;
    }

    if (checked) {
      this.setState({ selected: data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  }

  handleClick(event, id) {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  }

  handleChangePage(event, page) {
    this.setState({ page });
  }

  handleChangeRowsPerPage(event) {
    this.setState({ rowsPerPage: event.target.value });
  }

  isSelected(id) {
    return this.state.selected.indexOf(id) !== -1;
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  clearSelected() {
    this.setState({ selected: [] });
  }

  render() {
    const {
      classes,
      purchases,
      purchasesThisWeek,
      purchasesThisMonth,
      ...others
    } = this.props;

    const { order, orderBy, selected, rowsPerPage, page, filter } = this.state;

    let data;
    if (filter === 'none') {
      data = purchases;
    } else if (filter === 'week') {
      data = purchasesThisWeek;
    } else if (filter === 'month') {
      data = purchasesThisMonth;
    }

    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar
          selected={selected}
          handleChange={this.handleChange}
          filter={filter}
          clearSelected={this.clearSelected}
          {...others}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
              columnData={columnData}
            />
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.store}
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.date.toISOString().substr(0, 10)}
                      </TableCell>
                      <TableCell numeric>{n.cost}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);
