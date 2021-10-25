import React from "react";
import { Grid, Header } from "semantic-ui-react";
import classes from "./footer.module.css";

function MyFooterSection() {
  return (
    <>
      <div>
        <h5 className={classes.footerHeading} style={{ color: "white" }}>
          © 2021 All Rights Reserved by Contegris Technology Solutions
        </h5>
      </div>
      <div className={classes.rightHeading}>
        <h5
          style={{ color: "white", textAlign: "center" }}
          className={classes.footerHeading}>
          Made with <span className={classes.heart}> ❤ </span> by Contegris in
          <span className={classes.pakistan}> Pakistan </span>
        </h5>
      </div>
    </>
  );
}

const FooterSection = () => {
  return (
    <div className={classes.footerContainer}>
      <div className={classes.footer}>
        <MyFooterSection />
      </div>
    </div>
  );
};

export default FooterSection;

// // <Grid className={classes.headerFooterBg} columns={2} stackable>
// //   <Grid.Column width={8} textAlign="center" verticalAlign="middle">
// // <Header as="h5" style={{ color: "white" }}>
// //   © 2021 All Rights Reserved by Contegris Technology Solutions
// // </Header>
// //   </Grid.Column>
// //   <Grid.Column width={8} textAlign="center">
// <div className={classes.rightHeading}>
//   <Header as="h5" style={{ color: "white" }}>
//     Made with <span className={classes.heart}> ❤ </span> by Contegris in
//     <span className={classes.pakistan}> Pakistan </span>
//   </Header>
// </div>;
// //   </Grid.Column>
// // </Grid>
