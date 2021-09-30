import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import ValidateSession from '../src/components/auth/ValidateSession';
import CocktailsGetRandom from '../src/components/cocktails/CocktailsGetRandom';
import Nav from './common/navigationbar';
import NavigationBar from './common/navigationbar';
// import Login from './components/auth/Login';
// import Signup from './components/auth/Signup';

type AppState = {
  sessionToken: string;
}

class App extends React.Component<{}, AppState>{
  constructor() {
    super({});
    this.state = {
      sessionToken: ""
    }
  };

  componentDidMount() {
    this.setToken();
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
    return this.state.sessionToken === localStorage.getItem("token") ?
        // if the sessionToken and token in local storage match then we can access user-protected route
        console.log(`Protected routes - user`)
        // ? <CocktailsGet {...{
        //     editCocktailsList: () => {},
        //     deleteCocktailsList: () => {},
        //     token: this.state.sessionToken,
        //     updateOn: this.updateToken
        //   } } />

        // otherwise if the tokens don't match then we push them back to the validate session page 
        : <ValidateSession {... { token: this.state.sessionToken } } />
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Testing. Let's Talk Cocktails!
          </p>
          
        </header>
        <CocktailsGetRandom token={ this.state.sessionToken } />
        <ValidateSession />
        <NavigationBar token={this.state.sessionToken} />
        {this.userOnlyViews()}
        
      </div>
    );
  }
}
export default App;
