import React, { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Loader,
  List,
  Segment,
  Item,
  Form,
  Grid,
  Button,
  Message,
} from "semantic-ui-react";
import { getCompanies, getLeads } from "../../actions";
import styles from "./style.module.css";
import LeadDetail from "../Leads/LeadDetail";

const Home = () => {
  const auth = useSelector((state) => state.auth);
  const companies = useSelector((state) => state.companies);
  const leads = useSelector((state) => state.leads);
  const dispatch = useDispatch();
  const history = useHistory();
  const [isopen, setisopen] = useState(false);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [affiliation, setaffiliation] = useState("");
  const [error, seterror] = useState(null);
  //making sure that the user is logged in
  useEffect(() => {
    if (!auth.isSuccess) {
      history.push("/login");
      return null;
    }
  }, []);

  useEffect(() => {
    leads.data &&
      leads.data.data &&
      history.push(`/leads/${leads.data.data.lead_id}`);
  }, [leads.data && leads.data.data]);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0 && email.length === 0 && affiliation.length === 0) {
      seterror("Please fill at least one field to search for companies");
      return;
    }
    dispatch(getCompanies({ name, email, affiliation }));
    console.log("form got submitted");
  };
  const handleItemClick = (companyId) => {
    console.log(companyId);
    dispatch(getLeads({ companyId }));
    setisopen(true);
  };
  return (
    <>
      <Grid
        style={{
          display: "flex",
          alignContent: "center",
          flexDirection: "column",
          marginTop: "3%",
        }}
        stackable
        alignContent="center"
        textAlign="center"
      >
        <Grid.Row>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "20px 0",
            }}
          >
            <h2>Search Companies here</h2>
          </div>
        </Grid.Row>
        <Grid.Row>
          <Form onSubmit={(e) => handleFormSubmit(e)}>
            <Form.Group>
              <Form.Input
                label="Company Name"
                placeholder="name"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
              <Form.Input
                label="Email"
                placeholder="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
              <Form.Input
                label="Affiliation"
                placeholder="affiliation"
                value={affiliation}
                onChange={(e) => setaffiliation(e.target.value)}
              />
            </Form.Group>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                marginTop: "2%",
              }}
            >
              <Button
                type="submit"
                color="blue"
                size="tiny"
                loading={companies.isLoading}
              >
                Search Companies
              </Button>
              {!!error &&
                setTimeout(() => {
                  seterror(null);
                }, 2000)}
            </div>
            {!!error ? <Message color="red">{error}</Message> : null}
          </Form>
        </Grid.Row>
        <Grid.Row textAlign="left">
          {!companies.isSuccess && (
            <h5>Enter information to search for companies</h5>
          )}
        </Grid.Row>
      </Grid>
      <div style={{ width: "70%", marginLeft: "14%" }}>
        <Item.Group divided>
          {companies.data &&
            companies.data.data &&
            companies.data.data.map((company, idx) => (
              <Item
                key={idx}
                onClick={() => {
                  handleItemClick(company.id);
                }}
                className={styles.makeHover}
              >
                <Item.Content>
                  <Item.Header as="a">{company.name.toUpperCase()}</Item.Header>
                  <Item.Description content={company.email} />
                  <Item.Meta>
                    Affiliations:{"  "}
                    {company.affiliation.map((aff, idx) => (
                      <span key={idx}>{aff}</span>
                    ))}
                  </Item.Meta>
                  <div style={{ display: "flex", justifyContent: "end" }}>
                    <LeadDetail handle />
                  </div>
                </Item.Content>
              </Item>
            ))}
        </Item.Group>
      </div>
    </>
  );
};

export default Home;
