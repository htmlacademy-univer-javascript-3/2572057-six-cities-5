import React from 'react';
import MainPage from './components/MainPage';

type AppProps = {
  offersCount: number;
};

const App: React.FC<AppProps> = ({offersCount}) => (
  <div className="app">
    <MainPage offersCount={offersCount}/>
  </div>
);

export default App;
