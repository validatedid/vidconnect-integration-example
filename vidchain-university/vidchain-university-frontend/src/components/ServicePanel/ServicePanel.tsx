import React from 'react';
import {Typography, Grid, Button} from '@material-ui/core';
import "./ServicePanel.css";
import {CredentialButton} from '../CredentialButton/CredentialButton';

type Props = {
  title: string;
  subtitle1: string;
  description1: string;
  subtitle2: string;
  description2: string;
  icon: any;
  hasBeenRequested: boolean;
  hasBeenValidated: boolean;
  subtitle3?: string;
  description3?: string;
  credentialName?: string;
  issuedBy?: string;
  functionClickButton?: any;
  textButton?: string;
};

const ServicePanel = (props: Props) => {
  const {title, subtitle1, subtitle2, subtitle3,description1, description2,description3, credentialName, issuedBy, icon, hasBeenValidated, hasBeenRequested,textButton, functionClickButton} = props;
  return (
    <Grid className="containerProfile">
        
        <Grid item xs={12} className="panelTitle">
            <Typography variant="h6" className="titlePanel">
                {title}
            </Typography>
        </Grid>
        <Grid container
            direction="row"
            justify="space-between"
            alignItems="flex-start"
            className="panelBody">
            <Grid item lg={1} xs={12}></Grid>
            <Grid item lg={2} sm={12} xs={12}>
            <img
                src={icon}
                alt=""
                role="presentation"
                className="panelImageUniversity"
            />
            </Grid>
            <Grid item lg={9} sm={12} xs={12}>
            {!hasBeenRequested &&
              <div className="panelMainContent">
                  <h3 className="titleBody">{subtitle1}:</h3>
                  <p className="textBody">{description1}</p>
                  <h3 className="titleBody">{subtitle2}:</h3>
                  <p className="textBody">{description2}</p>
                  {subtitle3 &&
                    <div>
                      <h3 className="titleBody">{subtitle3}:</h3>
                      <p className="textBody">{description3}</p>
                    </div>
                  }
                  {credentialName &&
                    <p className="textBody"><b>{credentialName} </b>{issuedBy} </p>
                  }
              </div>
            }
            {(hasBeenRequested && !hasBeenValidated) &&
              <div className="panelMainContent">
                  <h3 className="titleBody">Credential sent</h3>
                  <p className="textBody">Check your wallet, you will receive a notification.</p>
                  <p className="textBody">Accept it and you will have the credential in your wallet.</p>
              </div>
            }
            {hasBeenValidated &&
              <div className="panelMainContent">
                  <h3 className="titleBody">Done</h3>
                  <p className="textBody">Credential received and verified!</p>
                  <a href="/demo/tutorial?step=3" className="textBody">Go back to tutorial</a>
              </div>
            }

            </Grid>
              
            </Grid>
              {(!hasBeenRequested && functionClickButton) &&
                <CredentialButton variant="contained" onClick={functionClickButton}>
                  {textButton}
                </CredentialButton>
              }
    </Grid>
  );
};

export default ServicePanel;
