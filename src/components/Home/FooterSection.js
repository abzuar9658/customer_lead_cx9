import React from "react";
import { Grid, Header } from "semantic-ui-react";
import classes from "./style.module.css";
function FooterSection() {
  return (
    <>
      <Grid>
        <Grid.Row className={classes.headerFooterBg}>
          <Grid.Column width={8} textAlign="center" verticalAlign="middle">
            <Header as="h5" style={{ color: "white" }}>
              © 2021 All Rights Reserved by Contegris Technology Solutions
            </Header>
          </Grid.Column>
          <Grid.Column width={6} textAlign="center">
            <Header as="h5" style={{ color: "white" }}>
              Made with <span className={classes.heart}> ❤ </span> by Contegris
              in
              <span className={classes.pakistan}> Pakistan </span>
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}

export default FooterSection;
