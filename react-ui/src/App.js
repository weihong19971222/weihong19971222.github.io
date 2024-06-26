import logo from './logo.svg';
import './App.css';
import Button from './components/Button';
import Switch from './components/Switch';

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <Button variant="outlined">Button</Button>
        <Switch >Button</Switch>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
