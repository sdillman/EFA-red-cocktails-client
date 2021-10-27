import React from 'react';
import headerLogo from '../assets/Lets_Talk_Cocktails_minimalist.png';

class Header extends React.Component<{}, {}>{
  render() {
    return (
        <header className="App-header">
          <img src={headerLogo} alt="header Logo" height="100" width="100" min-height="10vh"/>
          <h1>
            Let's Talk Cocktails!
          </h1>
        </header>
    );
  }
}

export default Header;
