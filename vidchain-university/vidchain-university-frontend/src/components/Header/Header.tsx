import React, { Component } from "react";
import "./Header.css";


class Header extends Component {
  render() {
    return (
      <header className="headerBackground">
        <img
          className="logoHeader"
          src={require("../../assets/images/logoHeader.svg")}
          alt="Logo of the Univeristy"
        />
        <p className="powered">Powered by Validated ID</p>
      </header>
    );
  }
}

export default Header;
