import React, { Component } from "react";
import "./Home.css";
import {Grid, Typography} from '@material-ui/core';
import Header from "../../components/Header/Header";
import {SignInButton} from "../../components/SignInButton/SignInButton";
import Footer from "../../components/Footer/Footer";
import { OpenIDClient } from "../../libs/openid-connect/client";

interface Props {
  history?: any;
}

interface State {}

class Home extends Component<Props, State> {
  constructor(props: any) {
    super(props);
  }
  async componentDidMount() {
    var client = OpenIDClient.getInstance().getClient();
    await client.wipeTokens();
  }

  async loginWithVIDChain() {
    var client = OpenIDClient.getInstance().getClient();
    await client.callback();
    await client.getToken({
      scopes: {
        request: ["openid", "VerifiableIdCredential"]
      }, 
    });
  }

  render() {
    return (
      <div>
        <Header />
        <Grid container 
          direction="column"
          justify="space-between"
          alignItems="flex-start"
          className="content">
        <Grid item className="content">
          <div className="subcontent"></div>
          <Typography variant="h2"className="title">Welcome to ACME university</Typography> 
          <Typography variant="h5" className="subtitle"><b>We're happy to have you onboard. Get now your diploma.</b></Typography>
          <SignInButton variant="contained" color="primary" className="buttonSignIn" onClick={() => this.loginWithVIDChain()}>
                Sign in with VIDchain
          </SignInButton>
          </Grid>
          </Grid>
        <Footer></Footer>
      </div>
    );
  }
}

export default Home;
