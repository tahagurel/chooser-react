import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import App from './App';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/globals.css';

import 'nprogress/nprogress.css';

import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <Layout> <App /></Layout>
//    </Provider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );
