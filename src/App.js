import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import NewItem from './components/NewItem/NewItem';
import Todos from './components/Todos/Todos';

function App() {
  return (
    <React.Fragment>
    <Header />
    <NewItem />
    <Todos />
  </React.Fragment>
  );
}

export default App;
