import React from "react";
import { Item, Grid, Card, Image, Icon } from "semantic-ui-react";
import classes from "./companies.module.css";
import { useHistory } from "react-router";
const MyCompanyItems = ({ companies, leads }) => {
  const history = useHistory();
  if (companies) {
    return (
      <Grid columns={3} stackable>
        {companies.data &&
          companies.data.companies &&
          companies.data.companies.map((company, idx) => (
            <Grid.Column key={idx} width={5}>
              <div
                className={classes.customContainer}
                onClick={() => history.push(`/leads/${company.id}`)}>
                <div className={classes.customItem1}>
                  <img
                    className={classes.customImage}
                    src="https://wiki.tripwireinteractive.com/images/4/47/Placeholder.png"
                  />
                </div>
                <div className={classes.customItem2}>
                  <h3 className={classes.nameHeading}>
                    <strong> {company.name.toUpperCase()} </strong>
                  </h3>
                  {company.email && (
                    <p className={classes.email}>
                      <strong>
                        <i>Email: </i>
                      </strong>
                      {company.email}
                    </p>
                  )}
                  {company.number && (
                    <p className={classes.number}>
                      <strong>
                        <i>Phone: </i>
                      </strong>
                      {"  "} {company.number}
                    </p>
                  )}
                  {leads.data && leads.data.total && (
                    <h5 className={classes.totalLeads}>
                      <strong>TOTAL LEADS: {leads.data.total}</strong>
                    </h5>
                  )}
                </div>
              </div>
            </Grid.Column>
          ))}
      </Grid>
    );
  } else {
    return null;
  }
};

const CompanyItems = (props) => {
  const { companies } = props;
  return (
    <div className={classes.companyItems}>
      {
        /*companies.data.total && */ <h3
          style={{ fontWeight: "600", textDecoration: "underline" }}
          className={classes.companyTotal}>
          <i> Companies found: {companies.data.total} </i>
        </h3>
      }
      <div className={classes.gridItems}>
        <MyCompanyItems {...props} />
      </div>
    </div>
  );
};

export default CompanyItems;
