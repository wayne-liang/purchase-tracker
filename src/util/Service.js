import axios from 'axios';

export const createPurchase = (store, cost, date, reload) => {
  const purchase = {
    store,
    cost,
    date,
  };

  axios.post('http://localhost:8080/api/purchases', purchase).then(res => {
    console.log(res);
    console.log(res.data);
    reload();
  });
};

export const deletePurchase = (id, reload) => {
  axios.delete(`http://localhost:8080/api/purchases/${id}`).then(res => {
    console.log(res);
    console.log(res.data);
    reload();
  });
};
