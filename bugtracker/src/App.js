import logo from './logo.svg';
import { useEffect, useState } from 'react'
import './App.css';

function App() {

  const [testData, setTestData] = useState()
  useEffect(() => {
    fetch('http://localhost:3000/test')
    .then(res => res.json())
    .then(res => {
      setTestData(res.data)
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {testData ? testData : <></>} 
      </header>
    </div>
  );
}

export default App;
