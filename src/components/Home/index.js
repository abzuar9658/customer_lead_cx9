import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Icon, Form, Grid, Button, Message } from "semantic-ui-react";
import { getCompanies, logout } from "../../actions";
import Companies from "./Companies";
import classes from "./style.module.css";
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

  //making sure that the user is logged in after initial render
  useEffect(() => {
    if (!auth.isSuccess) {
      history.push("/login");
      return null;
    }
  }, [auth.isSuccess]);

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
    <Grid stackable style={{ width: "70%", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          width: "100%",
          flexWrap: "wrap-reverse",
          margin: "30px",
        }}
      >
        <h2 style={{ flexGrow: "4", textAlign: "center" }}>
          {" "}
          Search Companies here{" "}
        </h2>
        <Button
          color="red"
          size="tiny"
          onClick={() => dispatch(logout())}
          style={{
            margin: "0 auto",
            marginBottom: "5px",
          }}
        >
          <Icon name="logout" /> Logout
        </Button>
      </div>
      <div style={{ marginTop: "2%", width: "100rem" }}>
        <Form.Group>
          <Form onSubmit={(e) => handleFormSubmit(e)}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Form.Input
                label="Company Name"
                placeholder="name"
                value={name}
                onChange={(e) => setname(e.target.value)}
                style={{ padding: "0 1rem" }}
              />
              <Form.Input
                label="Email"
                placeholder="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                style={{ padding: "0 1rem" }}
              />
              <Form.Input
                label="Phone"
                placeholder="phone"
                value={phone}
                name="phone"
                onChange={(e) => setphone(e.target.value)}
                style={{ padding: "0 1rem" }}
              />
              <Form.Input
                label="Web Link"
                placeholder="weblink"
                name="weblink"
                value={weblink}
                onChange={(e) => setweblink(e.target.value)}
                style={{ padding: "0 1rem" }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <div style={{ width: "12rem" }} className={classes.btSearch}>
                <Button
                  type="submit"
                  color="blue"
                  size="mini"
                  fluid
                  loading={companies.isLoading}
                  disabled={companies.isLoading}
                  onClick={(e) => handleFormSubmit(e)}
                >
                  Search Companies
                </Button>
              </div>
            </div>
          </Form>
        </Form.Group>
      </div>
      <Grid.Row>
        <div style={{ display: "none" }}>
          {!!error &&
            setTimeout(() => {
              seterror(null);
            }, 2000)}
        </div>
        {!!error ? <Message color="red"> {error} </Message> : null}
      </Grid.Row>
      <Grid.Row textAlign="center">
        {!companies.isSuccess && !companies.isError && (
          <h5> Enter information to search for companies </h5>
        )}
        {companies.isError && <Message error>{companies.errorMessage}</Message>}
        {companies.data && companies.data.message ? (
          <Message success> {companies.data.message} </Message>
        ) : null}
      </Grid.Row>
      <Grid.Row textAlign="center">
        <Companies companies={companies} />
      </Grid.Row>
    </Grid>
  );
};

export default Home;
