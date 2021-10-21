import React from "react";
import { Item, Grid, Card, Image, Icon } from "semantic-ui-react";
import styles from "./style.module.css";
import classes from "./style.module.css";
import { useHistory } from "react-router";
const Companies = ({ companies, leads }) => {
    const history = useHistory();
    if (companies) {
        return ( <
            div style = {
                { width: "100%", marginTop: "5em" } }
            className = { classes.companiesContainer } > {
                companies.data && companies.data.total && ( <
                    h3 style = {
                        { fontWeight: "600", textDecoration: "underline" } } >
                    <
                    i > Companies found: { companies.data.total } < /i> <
                    /h3>
                )
            } <
            Grid columns = { 3 }
            stackable > {
                companies.data &&
                companies.data.companies &&
                companies.data.companies.map((company, idx) => ( <
                    Grid.Column key = { idx }
                    width = { 5 } >
                    <
                    Item >
                    <
                    div className = { styles.makeHover } >
                    <
                    div style = {
                        {
                            display: "flex",
                            alignItems: "center",
                            paddingLeft: "15px",
                        }
                    }
                    onClick = {
                        () => history.push(`/leads/${company.id}`) } >
                    <
                    Item.Image size = "tiny"
                    src = {
                        company.img ?
                        company.img :
                            "https://wiki.tripwireinteractive.com/images/4/47/Placeholder.png"
                    }
                    /> <
                    Item.Content style = {
                        { marginLeft: "20px" } } >
                    <
                    Item.Header >
                    <
                    strong > { company.name.toUpperCase() } < /strong> <
                    /Item.Header> <
                    Item.Description content = { company.email }
                    /> {
                        company.number && ( <
                            Item.Meta >
                            Phone: { "  " } { company.number } <
                            /Item.Meta>
                        )
                    } {
                        company.weblink && ( <
                            Item.Meta >
                            Weblink: { "  " } <
                            a href = { company.website ? company.website : "" } > { company.website } <
                            /a> <
                            /Item.Meta>
                        )
                    } {
                        leads.data && leads.data.total && ( <
                            Item.Extra style = {
                                {
                                    marginTop: "2rem",
                                    marginLeft: "4rem",
                                }
                            } >
                            Total leads: { leads.data.total } <
                            /Item.Extra>
                        )
                    } <
                    /Item.Content> <
                    /div> <
                    /div> <
                    /Item> <
                    /Grid.Column>
                ))
            } <
            /Grid> <
            /div>
        );
    } else {
        return null;
    }
};

export default Companies;