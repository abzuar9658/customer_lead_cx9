import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  Form,
  Loader,
  Dimmer,
  Message,
} from "semantic-ui-react";
import classes from "./style.module.css";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getCompanies,
  clearCompanyError,
  getLeadsCompany,
} from "../../actions";
import Companies from "./Companies";

const Home = () => {
  const auth = useSelector((state) => state.auth);
  const companies = useSelector((state) => state.companies);
  const leads = useSelector((state) => state.leadsCompany);
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [weblink, setweblink] = useState("");
  const [error, seterror] = useState(null);

  //making sure that the user is logged in after initial render
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
  }, [companies.isError === true]);

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
      dispatch(getLeadsCompany({}));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Grid stackable reversed>
        <Grid.Row
          className={classes.homeBody}
          style={{ minHeight: "83.6vh", padding: "3.5em" }}>
          <Container>
            <div className={classes.formContainer}>
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
            </div>{" "}
            <Grid.Row centered style={{ marginTop: "3rem" }}>
              {" "}
              {companies.isLoading && (
                <Dimmer active inverted>
                  <Loader inverted content={`Loading companies`} />{" "}
                </Dimmer>
              )}{" "}
              {companies.isSuccess && companies.data.data && (
                <div style={{ marginLeft: "3rem" }}>
                  <Companies companies={companies} leads={leads} />{" "}
                </div>
              )}{" "}
              {companies.isError && (
                <Message error> {companies.errorMessage} </Message>
              )}{" "}
              {error && <Message error> {error} </Message>}{" "}
            </Grid.Row>{" "}
          </Container>{" "}
        </Grid.Row>{" "}
      </Grid>{" "}
    </>
  );
};

export default Home;
