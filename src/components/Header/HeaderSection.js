import React from "react";
import { Grid, Header, Image, Button, Icon } from "semantic-ui-react";
import classes from "./header.module.css";
import { logout } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";

function MyHeader() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  return (
    <div className={classes.headerContainer}>
      <div className={classes.item1}>
        <NavLink to="/">
          <img
            src="https://contegris.com/wp-content/uploads/2018/07/Contegris-Technology-Simplified-Dark.png"
            width="200px"
            className={classes.headerImage}
          />
        </NavLink>
      </div>
      <div className={classes.item2}>
        <h2 className={classes.companyHeading}>
          Intellicon Companies and Leads
        </h2>
      </div>
      <div className={classes.headerJazzLogo}>
        <img
          src="https://jazz.com.pk/themes/jazz/img/logo-desk-new.png"
          width="80px"
          className={classes.headerJazz}
        />
      </div>
      <div className={classes.item4}>
        {auth.isSuccess && (
          <button
            className={classes.logoutButton}
            onClick={() => dispatch(logout())}>
            <Icon name="logout" />
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

const HeaderSection = () => {
  return (
    <div className={classes.headerContainer}>
      <MyHeader />
    </div>
  );
};

export default HeaderSection;

//  <Grid columns={4} verticalAlign="middle" stackable inverted>
//       <Grid.Column width={3}>
//         <div className={classes.contegrisLogo}>
// <NavLink to="/">
//   <Image
//     centered
//     src="https://contegris.com/wp-content/uploads/2018/07/Contegris-Technology-Simplified-Dark.png"
//     size="small"
//     textAlign="center"
//   />
// </NavLink>
//         </div>
//       </Grid.Column>

//       <Grid.Column width={8}>
// <h2 className={classes.companyHeading}>
//   Intellicon Companies and Leads
// </h2>
//       </Grid.Column>
//       <Grid.Column width={3}>
//         <div className={classes.logo}>
// <Image
//   src="https://jazz.com.pk/themes/jazz/img/logo-desk-new.png"
//   size="tiny"
// />
//         </div>
//       </Grid.Column>
//       <Grid.Column width={3} textAlign="right">
//         <div className={classes.logout}>
// {!auth.isSuccess && (
//   <Button
//     size="small"
//     className={classes.logoutButton}
//     color="red"
//     onClick={() => dispatch(logout())}>
//     <Icon name="logout" />
//     Logout
//   </Button>
// )}
//         </div>
//       </Grid.Column>
//     </Grid>
