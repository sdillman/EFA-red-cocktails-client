import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import About from "./Pages/about";
import Cocktail from "./Pages/cocktail";
import Register from "./Pages/register";
import Login from "./Pages/login";
import Logout from "./Pages/logout";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route } from 'react-router-dom';

ReactDOM.render(
  <div className="App">
    <BrowserRouter>
      <Route exact path="/register" component={Register} />
      <Route exact path="/log-out" component={Logout} />
      <Route exact path="/log-in" component={Login} />
      <Route exact path="/admin" component={App} />
      <Route exact path="/random-cocktail" component={Cocktail} />
      <Route exact path="/my-comments" component={App} />
      <Route exact path="/my-cocktails" component={App} />
      <Route exact path="/about" component={About} />
      <Route exact path="/" component={App} />
    </BrowserRouter>
  </div>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
