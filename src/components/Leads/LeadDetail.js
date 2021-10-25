import React, { useEffect, useState } from "react";
import {
  Container,
  Message,
  Icon,
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
import classes from "./style.module.css";

const TableView = ({ leads }) => (
  <div style={{ height: "55vh", overflow: "scroll" }}>
    <Table celled striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell> Lead Id </Table.HeaderCell>{" "}
          <Table.HeaderCell> Subject </Table.HeaderCell>{" "}
          <Table.HeaderCell> Lead Number </Table.HeaderCell>{" "}
          <Table.HeaderCell> Creation Date </Table.HeaderCell>{" "}
          <Table.HeaderCell> Status </Table.HeaderCell>{" "}
          <Table.HeaderCell> Lead Owner </Table.HeaderCell>{" "}
        </Table.Row>{" "}
      </Table.Header>{" "}
      <Table.Body>
        {" "}
        {leads.data &&
          leads.data.leads &&
          leads.data.leads.map((lead, sr) => (
            <Table.Row>
              <Table.Cell> {lead.id} </Table.Cell>{" "}
              <Table.Cell> {lead.subject} </Table.Cell>{" "}
              <Table.Cell> {lead.leadNumber} </Table.Cell>{" "}
              <Table.Cell>
                {" "}
                {new Date(lead.createdAt).toLocaleDateString("en-US")}{" "}
              </Table.Cell>{" "}
              <Table.Cell error={!lead.status} positive={lead.status}>
                {" "}
                {lead.status ? <span> Open </span> : <span>Closed</span>}{" "}
              </Table.Cell>{" "}
              <Table.Cell>
                {" "}
                {lead.teamMember.label
                  ? lead.teamMember.label
                  : "restricted"}{" "}
              </Table.Cell>{" "}
            </Table.Row>
          ))}{" "}
      </Table.Body>{" "}
    </Table>{" "}
  </div>
);

const MyLeadDetail = (props) => {
  const history = useHistory();
  const leads = useSelector((state) => state.leads);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [activePage, setactivePage] = useState(1);
  useEffect(() => {
    try {
      if (!auth.isSuccess) {
        history.push("/login");
        return null;
      }
      if (!leads.isSuccess && props.match)
        dispatch(
          getLeads({ companyId: props.match.params.id, page: activePage })
        );
      return () => {
        console.log("COMPONENT DID MOUNT RAN");
        dispatch(clearLeads());
      };
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      if (!auth.isSuccess) {
        history.push("/login");
        return null;
      }
      dispatch(
        getLeads({ companyId: props.match.params.id, page: activePage })
      );
    } catch (error) {
      console.log(error);
    }
  }, [activePage, auth.isSuccess]);
  if (leads.isLoading) {
    return (
      <div
        style={{
          height: "60vh",
          position: "relative",
          top: "8em",
          margin: "1rem auto",
        }}>
        <Dimmer
          inverted
          active
          style={{ backgroundColor: "rgb(235, 235, 235)" }}>
          <Loader size="small" inverted>
            {" "}
            Loading{" "}
          </Loader>{" "}
        </Dimmer>{" "}
      </div>
    );
  }
  if (leads.isSuccess && !leads.isLoading) {
    return (
      <>
        <Container
          style={{ margin: "5.8em", height: "65.8vh", paddingBottom: "10rem" }}>
          <div
            style={{
              margin: "2em 0",
            }}>
            <Popup
              content="previous page"
              trigger={
                <NavLink to="/">
                  <h3>
                    <Icon
                      name="arrow alternate circle left"
                      size="large"
                      color="blue"
                    />
                    Back{" "}
                  </h3>{" "}
                </NavLink>
              }
            />{" "}
          </div>{" "}
          <Header
            as="h4"
            textAlign="left"
            style={{
              flex: "1",
              marginBottom: "2rem",
              textDecoration: "underline",
            }}>
            Total Leads: {leads.data.total}{" "}
          </Header>{" "}
          <TableView leads={leads} />{" "}
          <Pagination
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
            onPageChange={(e, data) => {
              setactivePage(data.activePage);
            }}
            defaultActivePage={activePage}
            totalPages={Math.floor(leads.data.total / 10)}
          />{" "}
        </Container>{" "}
      </>
    );
  }
  if (leads.isSuccess === null) {
    return null;
  }
  if (leads.isError) {
    return <Message> {leads.errorMessage} </Message>;
  }
};

const LeadDetail = (props) => {
  return (
    <div className={classes.leadsContainer}>
      <MyLeadDetail {...props} />
    </div>
  );
};

export default LeadDetail;
