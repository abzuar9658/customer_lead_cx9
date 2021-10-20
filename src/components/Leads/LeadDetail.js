import React, { useEffect, useState } from "react";
import {
  Container,
  Message,
  Item,
  Icon,
  ButtonGroup,
  Button,
  Table,
  Popup,
  Pagination,
  Header,
} from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { getLeads, clearLeads } from "../../actions";
import { useHistory } from "react-router";
import { Loader, Dimmer } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const ListView = ({ leads }) => (
  <div
    style={{
      marginTop: "3%",
      height: "60vh",
      overflow: "scroll",
      padding: "2%",
    }}
  >
    <Item.Group divided>
      {" "}
      {leads.data.data &&
        leads.data.data.leads &&
        leads.data.data.leads.map((lead, idx) => (
          <Item key={idx}>
            <Item.Content>
              <Item.Header> {lead.subject} </Item.Header>{" "}
              <Item.Meta>
                {" "}
                {new Date(lead.createdAt).toLocaleDateString("en-US")}{" "}
              </Item.Meta>{" "}
              <Item.Extra> Lead ID: {lead.id} </Item.Extra>{" "}
            </Item.Content>{" "}
          </Item>
        ))}{" "}
    </Item.Group>{" "}
  </div>
);
const TableView = ({ leads }) => (
  <Table celled striped>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell> Sr. </Table.HeaderCell>{" "}
        <Table.HeaderCell> Subject </Table.HeaderCell>{" "}
        <Table.HeaderCell> Lead Number </Table.HeaderCell>{" "}
        <Table.HeaderCell> Creation Date </Table.HeaderCell>{" "}
        <Table.HeaderCell> Status </Table.HeaderCell>{" "}
        <Table.HeaderCell> Pipeline Stage </Table.HeaderCell>{" "}
      </Table.Row>{" "}
    </Table.Header>{" "}
    <Table.Body>
      {" "}
      {leads.data.data &&
        leads.data.data.leads &&
        leads.data.data.leads.map((lead, sr) => (
          <Table.Row>
            <Table.Cell> {sr + 1} </Table.Cell>{" "}
            <Table.Cell> {lead.subject} </Table.Cell>{" "}
            <Table.Cell> {lead.leadNumber} </Table.Cell>{" "}
            <Table.Cell>
              {" "}
              {new Date(lead.createdAt).toLocaleDateString("en-US")}{" "}
            </Table.Cell>{" "}
            <Table.Cell> {lead.status ? "Open" : "Closed"} </Table.Cell>{" "}
            <Table.Cell> {lead.pipelineStage} </Table.Cell>{" "}
          </Table.Row>
        ))}{" "}
    </Table.Body>{" "}
  </Table>
);

const LeadDetail = (props) => {
  const history = useHistory();
  const leads = useSelector((state) => state.leads);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      if (!auth.isSuccess) {
        history.push("/login");
        return null;
      }
      if (!leads.isSuccess && props.match)
        dispatch(getLeads({ companyId: props.match.params.id }));
      return () => {
        console.log("COMPONENT DID MOUNT RAN");
        dispatch(clearLeads());
      };
    } catch (error) {
      console.log(error);
    }
  }, []);
  if (leads.isLoading) {
    return (
      <>
        <h1> LOADING LEADS </h1>{" "}
        <Dimmer active>
          <Loader size="massive"> Loading </Loader>{" "}
        </Dimmer>{" "}
      </>
    );
  }
  if (leads.isSuccess) {
    return (
      <Container style={{ marginTop: "4%" }}>
        <div
          style={{
            display: "flex",
          }}
        >
          <Popup
            content="previous page"
            trigger={
              <NavLink to="/">
                <Icon name="arrow alternate circle left" size="large" /> Back{" "}
              </NavLink>
            }
          />{" "}
          <Header as="h2" textAlign="center" style={{ flex: "1" }}>
            Created Leads for{" "}
            {props.location && props.location.params
              ? props.location.params.companyName[0].toUpperCase() +
                props.location.params.companyName.slice(1)
              : null}{" "}
          </Header>{" "}
        </div>{" "}
        <TableView leads={leads} />{" "}
        <Pagination
          boundaryRange={0}
          defaultActivePage={1}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          siblingRange={1}
          totalPages={10}
        />{" "}
      </Container>
    );
  }
  if (leads.isSuccess === null) {
    return null;
  }
  if (leads.isError) {
    return <Message> {leads.errorMessage} </Message>;
  }
};

export default LeadDetail;
