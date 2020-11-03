import React from "react";
import { Provider } from 'urql';

import Home from './core/Home'
import { ApiClient } from './api/Client'

const App = () => {
  return <Provider value={ApiClient}><Home /></Provider>
}

export default App;
