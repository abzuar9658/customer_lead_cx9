import React from "react";
import HeaderSection from "../Header/HeaderSection";
import FooterSection from "../Footer/FooterSection";
import Error from "../../Error/Error";
import classes from "./layout.module.css";

const RenderLayout = (props) => {
  return (
    <Error>
      <div className={classes.header}>
        <HeaderSection />
      </div>
      {props.children}
      <div className={classes.footer}>
        <FooterSection />
      </div>
    </Error>
  );
};

const Layout = (props) => {
  return (
    <div className={classes.layout}>
      <RenderLayout {...props} />
    </div>
  );
};

export default Layout;
