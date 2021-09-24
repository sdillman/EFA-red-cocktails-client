import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import ValidateSession from '../src/components/auth/ValidateSession';
import './App.css';


class App extends React.Component{
  constructor(props :any) {
    super(props);
    this.state = {
      sessionToken: null
    }
    this.setToken = this.setToken.bind(this)
  };

setToken(){
  let sessionToken;
  if (localStorage.getItem("token")) {
    sessionToken = localStorage.getItem("token");
  } else {

  }
}

clearToken = () => {
  localStorage.clear();
  setSessionToken("");
}

render() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
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
}
export default App;
