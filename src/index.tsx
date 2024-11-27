import React from 'react';
import ReactDOM from 'react-dom/client';

import mocks from './mocks';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const offersCount = mocks.offers.length;

root.render(
  <React.StrictMode>
    <App offersCount={offersCount} mocks={mocks}/>
  </React.StrictMode>
);
