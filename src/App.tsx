import React from 'react';
import NavigationBar from "../src/common/navigationbar";
import CocktailsGetRandom from '../src/components/cocktails/CocktailsGetRandom';
import CocktailsGet from '../src/components/cocktails/CocktailsGet';
import Header from "../src/components/header"
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
   * Sets the local storage token to the value passed.
   * @param newToken string
   */
   updateToken(newToken: string): void {
    localStorage.setItem("token", newToken);
    this.setToken();
  }

  /**
   * Sets a state token to the value of the token within localStorage.
   */
  setToken(): void {
    this.setState({
      sessionToken: localStorage.getItem("token") || ""
    });
  }

  /**
   * Removes the token from localStorage.
   */
  clearToken(): void {
    localStorage.removeItem("token");
    // this.updateToken("");  -- note to me - we just removed it - why then update to empty string?
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
        <NavigationBar token={this.state.sessionToken} />
        <Header />
        <p>Home</p>
        {/* {this.userOnlyViews()} */}
      </div>
    );
  }
}
export default App;
