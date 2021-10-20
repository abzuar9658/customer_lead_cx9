import React from "react";
import { Grid, Header, Image, Button, Icon } from "semantic-ui-react";
import classes from "./style.module.css";
import { logout } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
function HeaderSection() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  return (
    <>
      <Grid>
        <Grid.Row
          columns={3}
          verticalAlign="middle"
          centered
          className={classes.headerFooterBg}
        >
          <br />
          <Grid.Column width={2}>
            <Image
              centered
              src="https://contegris.com/wp-content/uploads/2018/07/Contegris-Technology-Simplified-Dark.png"
              size="small"
              textAlign="center"
            />
          </Grid.Column>
          <Grid.Column width={8}>
            <Header
              as="h2"
              verticalAlign="middle"
              textAlign="center"
              className={classes.companyHeading}
              style={{ color: "white" }}
            >
              Intellicon Companies and Leads
            </Header>
          </Grid.Column>
          <Grid.Column width={3} textAlign="right">
            {auth.isSuccess && (
              <Button color="red" onClick={() => dispatch(logout())}>
                <Icon name="logout" />
                Logout
              </Button>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}

export default HeaderSection;
