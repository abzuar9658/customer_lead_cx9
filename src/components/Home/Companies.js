import React from "react";
import { Item } from "semantic-ui-react";
import LeadDetail from "../Leads/LeadDetail";
import styles from "./style.module.css";
import { Link } from "react-router-dom";
const Companies = ({ companies }) => {
    if (companies) {
        return ( <
            div style = {
                { width: "100%", margin: "50px" } } > {
                companies.data.data && ( <
                    h3 > Companies Found: { companies.data.data.length } < /h3>
                )
            }

            <
            br / >
            <
            Item.Group divided > {
                companies.data &&
                companies.data.data &&
                companies.data.data.data &&
                companies.data.data.data.companies &&
                companies.data.data.data.companies.map((company, idx) => ( <
                    Item key = { idx } >
                    <
                    div className = { styles.makeHover } >
                    <
                    Link to = {
                        {
                            pathname: `/leads/${company.id}`,
                            params: { companyName: company.name },
                        }
                    } >
                    <
                    div style = {
                        {
                            display: "flex",
                            alignItems: "center",
                            paddingLeft: "15px",
                        }
                    } >
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
                    Item.Header as = "a" >
                    <
                    strong > { company.name.toUpperCase() } < /strong> <
                    /Item.Header>

                    <
                    Item.Description content = { company.email }
                    /> <
                    Item.Meta >
                    Phone: { "  " } { company.phone } <
                    /Item.Meta> <
                    Item.Meta >
                    Weblink: { "  " } <
                    a href = { company.weblink ? company.weblink : "" } > { company.weblink } <
                    /a> <
                    /Item.Meta> <
                    /Item.Content> <
                    /div> <
                    /Link> <
                    /div> <
                    /Item>
                ))
            } <
            /Item.Group> <
            /div>
        );
    } else {
        return null;
    }
};

export default Companies;