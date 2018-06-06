import React from 'react';
import ReactDOM from 'react-dom';
import PurchaseList from './pages/PurchaseList';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<PurchaseList />, document.getElementById('root'));
registerServiceWorker();
