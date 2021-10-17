import React from "react";
import { Item } from "semantic-ui-react";
import LeadDetail from "../Leads/LeadDetail";
import styles from "./style.module.css";
import { Link } from "react-router-dom";
const Companies = ({ companies }) => {
    if (companies) {
        return ( <
            div style = {
                { padding: "3%" } } >
            <
            Item.Group divided > {
                companies.data &&
                companies.data.data &&
                companies.data.data.map((company, idx) => ( <
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
                        { display: "flex", alignItems: "center" } } >
                    <
                    Item.Image size = "tiny"
                    src = {
                        company.img ?
                        company.img :
                            "https://img.favpng.com/2/7/20/computer-icons-professional-avatar-png-favpng-XqT83bv27wiMFwZzJP3R1NTu6.jpg"
                    }
                    /> <
                    Item.Content style = {
                        { marginLeft: "5%" } } >
                    <
                    Item.Header as = "a" > { company.name.toUpperCase() } <
                    /Item.Header> <
                    Item.Description content = { company.email }
                    /> <
                    Item.Meta >
                    Affiliations: { "  " } {
                        company.affiliation.map((aff, idx) => ( <
                            span key = { idx } > { aff } < /span>
                        ))
                    } <
                    /Item.Meta> <
                    div style = {
                        { display: "flex", justifyContent: "end" } } >
                    <
                    LeadDetail handle / >
                    <
                    /div> <
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