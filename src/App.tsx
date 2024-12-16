import React from 'react';
import { Provider } from 'react-redux';
import AppContent from './components/AppContent';
import store from './store';

const App: React.FC = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default App;
