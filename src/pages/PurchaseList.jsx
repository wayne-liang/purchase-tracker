import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

import EnhancedTable from '../components/EnhancedTable';
import AppBar from '../components/AppBar';
import Statistics from '../components/Statistics';

const formatData = purchases => {
  const results = [];

  purchases.forEach(purchase => {
    const { _id, store, cost, date } = purchase;
    const numberCost = cost.$numberDecimal;
    const purchaseDate = new Date(date);

    results.push({ id: _id, store, date: purchaseDate, cost: numberCost });
  });

  results.sort((a, b) => (a.date < b.date ? -1 : 1));

  return results;
};

class PurchaseList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      purchases: [],
      purchasesThisWeek: [],
      purchasesThisMonth: [],
      purchasesThisYear: [],
    };

    this.loadPurchases = this.loadPurchases.bind(this);
  }

  componentDidMount() {
    this.loadPurchases();
  }

  loadPurchases() {
    axios.get('http://localhost:8080/api/purchases').then(res => {
      const purchases = formatData(res.data);
      this.setState({ purchases });
    });

    axios.get('http://localhost:8080/api/purchases/thisweek').then(res => {
      const purchasesThisWeek = formatData(res.data);
      this.setState({ purchasesThisWeek });
    });

    axios.get('http://localhost:8080/api/purchases/thismonth').then(res => {
      const purchasesThisMonth = formatData(res.data);
      this.setState({ purchasesThisMonth });
    });
  }

  render() {
    return (
      <div>
        <CssBaseline />
        <AppBar reload={this.loadPurchases} />
        <Grid container spacing={0}>
          <Grid item xs={9}>
            <EnhancedTable
              purchasesThisWeek={this.state.purchasesThisWeek}
              purchasesThisMonth={this.state.purchasesThisMonth}
              purchases={this.state.purchases}
              reload={this.loadPurchases}
            />
          </Grid>
          <Grid item xs={3}>
            <Statistics
              purchasesThisWeek={this.state.purchasesThisWeek}
              purchasesThisMonth={this.state.purchasesThisMonth}
              purchases={this.state.purchases}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default PurchaseList;
