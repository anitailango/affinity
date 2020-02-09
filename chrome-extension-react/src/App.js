import React from 'react';
import logo from './logo.svg';
import './App.css';
import TestComponent from './components/test';

function App() {
  return (
    <div className="App" style={testStyle}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Edit <code>src/App.js</code> and save to reload.</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React
        </a>
        <TestComponent/>
      </header>
    </div>
  );
}

const testStyle = {
  minWidth: '500px'
}

export default App;
