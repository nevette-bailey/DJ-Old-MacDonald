import React from 'react';

import { Navbar } from './components';
import Routes from './routes';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Routes />
    </div>
  );
};

export default App;
