import React from 'react';
import CocktailsGetRandom from '../src/components/cocktails/CocktailsGetRandom';
import CocktailsGet from '../src/components/cocktails/CocktailsGet';
// import NavigationBar from './common/navigationbar';
// import Login from './components/auth/Login';
// import Signup from './components/auth/Signup';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

type AppState = {
  sessionToken: string;
}

type AppProps = {}

class App extends React.Component<AppProps, AppState>{
  constructor(props: AppProps) {
    super(props);
    this.state = {
      sessionToken: ""
    }
  };

  componentDidMount() {
    this.setState({
      sessionToken: localStorage.getItem("token") || ""
    });
  }

  /**
   * sets value of token to the value of newToken the token within localStorage.
   */
  setToken(): void {
    this.setState({
      sessionToken: localStorage.getItem("token") || ""
    });
  }

  /**
   * Sets value of token to the value of newToken
   * if token does not exist, creates a new key value pair.
   * @param newToken string
   */
  updateToken(newToken: string): void {
    localStorage.setItem("token", newToken);
    this.setToken();
  }

  /**
   * Clears local storage and sets the token to an empty string.
   */
  clearToken(): void {
    localStorage.removeItem("token");
    this.updateToken("");
  }

  /**
   * Returns either the `<CocktailsGet />` or the `<ValidateSession />` component based on if the session is valid.
   */
  userOnlyViews() {
    return this.state.sessionToken === localStorage.getItem("token")
      ? 
      <CocktailsGet {...{
          editCocktailsList: () => {},
          deleteCocktailsList: () => {},
          token: this.state.sessionToken,
          updateOn: this.updateToken
        } } />
      // otherwise if the tokens don't match then we push them back to the validate session page 
      : <CocktailsGetRandom {... { sessionToken: this.state.sessionToken, updateToken: this.updateToken }} />;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            Let's Talk Cocktails!
          </h1>
        </header>
        {this.userOnlyViews()}
      </div>
    );
  }
}
export default App;
