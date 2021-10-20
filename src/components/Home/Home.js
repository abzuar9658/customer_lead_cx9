import React, { useState, useEffect } from "react";
import {
  Grid,
  Header,
  Image,
  Button,
  Icon,
  Container,
  Form,
  Loader,
  Dimmer,
  Message,
} from "semantic-ui-react";
import classes from "./style.module.css";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCompanies, logout, clearCompanyError } from "../../actions";
import Companies from "./Companies";

const Home = () => {
  const auth = useSelector((state) => state.auth);
  const companies = useSelector((state) => state.companies);

  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [weblink, setweblink] = useState("");
  const [error, seterror] = useState(null);

  // making sure that the user is logged in after initial render
  useEffect(() => {
    if (!auth.isSuccess) {
      history.push("/login");
      return null;
    }
  }, [auth.isSuccess]);

  useEffect(() => {
    const timer = setTimeout(() => seterror(null), 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  useEffect(() => {
    const timer = setTimeout(() => dispatch(clearCompanyError()), 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [companies.isError]);

  const handleFormSubmit = (e) => {
    try {
      e.preventDefault();
      if (
        name.length === 0 &&
        email.length === 0 &&
        phone.length === 0 &&
        weblink.length === 0
      ) {
        seterror("Please fill at least one field to search for companies");
        return;
      }
      dispatch(getCompanies({ name, email, phone, weblink }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid stackable reversed>
      <Grid.Row columns={3} verticalAlign="middle" centered>
        <br />
        <Grid.Column width={2}>
          <Image
            centered
            src="/assets/logo-contegris-header.png"
            size="small"
            textAlign="center"
          />
        </Grid.Column>{" "}
        <Grid.Column width={8}>
          <Header
            as="h2"
            verticalAlign="middle"
            textAlign="center"
            className={classes.companyHeading}
          >
            Intellicon Companies and Leads{" "}
          </Header>{" "}
        </Grid.Column>{" "}
        <Grid.Column width={3} textAlign="right">
          <Button color="red" onClick={() => dispatch(logout())}>
            <Icon name="logout" />
            Logout{" "}
          </Button>{" "}
        </Grid.Column>{" "}
      </Grid.Row>{" "}
      <Grid.Row
        className={classes.homeBody}
        style={{ height: "82vh", padding: "3.5em" }}
      >
        <Container className={classes.formContainer}>
          <Form onSubmit={(e) => handleFormSubmit(e)}>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Company Name"
                placeholder="name"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />{" "}
              <Form.Input
                fluid
                label="Company Email"
                placeholder="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />{" "}
              <Form.Input
                fluid
                label="Company Phone"
                placeholder="phone"
                value={phone}
                onChange={(e) => setphone(e.target.value)}
              />{" "}
              <Form.Input
                fluid
                label="Company Weblink"
                placeholder="weblink"
                value={weblink}
                onChange={(e) => setweblink(e.target.value)}
              />{" "}
            </Form.Group>{" "}
            <div className={classes.formButton}>
              <Form.Button type="submit" color="facebook">
                Search Companies{" "}
              </Form.Button>{" "}
            </div>{" "}
          </Form>{" "}
          <Grid.Row centered style={{ marginTop: "3rem" }}>
            {" "}
            {companies.isLoading && (
              <Dimmer active inverted>
                <Loader inverted content={`Loading companies`} />{" "}
              </Dimmer>
            )}{" "}
            {companies.isSuccess && companies.data.data && (
              <Companies companies={companies} />
            )}{" "}
            {companies.isError && (
              <Message error> {companies.errorMessage} </Message>
            )}{" "}
            {error && <Message error> {error} </Message>}{" "}
          </Grid.Row>{" "}
        </Container>{" "}
      </Grid.Row>{" "}
      <Grid.Row>
        <Grid.Column width={8} textAlign="center" verticalAlign="middle">
          <Header as="h5">
            {" "}
            © 2021 All Rights Reserved by Contegris Technology Solutions{" "}
          </Header>{" "}
        </Grid.Column>{" "}
        <Grid.Column width={6} textAlign="center">
          <Header as="h5">
            Made with <span className={classes.heart}> ❤ </span> by Contegris in{" "}
            <span className={classes.pakistan}> Pakistan </span>{" "}
          </Header>{" "}
        </Grid.Column>{" "}
      </Grid.Row>{" "}
    </Grid>
  );
};

export default Home;
