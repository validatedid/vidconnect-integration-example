import React from "react";
import "./App.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import Home from "./screens/Home/Home";
import Profile from "./screens/Profile/Profile";
import Callback from "./screens/Callback/Callback";
import AppRedirect from "./screens/AppRedirect/AppRedirect";
const dotenv = require("dotenv");
// importing .env variables

const publicUrl =
  process.env.REACT_APP_DEMO || "http://localhost:3024/demo/university";
const basename = publicUrl ? new URL(publicUrl).pathname : "";

const THEME = createMuiTheme({
  typography: {
   "fontFamily": "TTNorms",
   "fontWeightLight": 300,
   "fontWeightRegular": 400,
   "fontWeightMedium": 500,
   h6: {
    fontFamily: 'TTNorms-Bold',
    fontSize: 28,
  },
  h2: {
    fontFamily: 'TTNorms-Light',
    color: '151A35'
  },

  h5: {
    fontFamily: 'TTNorms-Light',
    color: '151A35'
  },
  },
  
});

function App() {
  dotenv.config();
  return (
    <ThemeProvider theme={THEME}>
    <div className="App">

      <BrowserRouter basename={basename}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/callback" component={Callback} />
          <Route path="/presentation" component={AppRedirect} />
        </Switch>
      </BrowserRouter>
    </div>
    </ThemeProvider>
  );
}

export default App;
