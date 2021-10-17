import React, { useEffect, useState } from "react";
import {
    Container,
    Message,
    Item,
    Icon,
    ButtonGroup,
    Button,
    Table,
} from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { getLeads, clearLeads } from "../../actions";
import { useHistory } from "react-router";
import { Loader, Dimmer } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const ListView = ({ leads }) => ( <
    Item.Group divided > {
        leads.data.data &&
        leads.data.data.map((lead, idx) => ( <
            Item key = { idx } >
            <
            Item.Content >
            <
            Item.Header as = "a" > { lead.title } < /Item.Header> <
            Item.Meta > { lead.description } < /Item.Meta> <
            Item.Extra > Lead ID: { lead.lead_id } < /Item.Extra> <
            /Item.Content> <
            /Item>
        ))
    } <
    /Item.Group>
);
const TableView = ({ leads }) => ( <
    Table >
    <
    Table.Header >
    <
    Table.Row >
    <
    Table.HeaderCell > Sr. < /Table.HeaderCell> <
    Table.HeaderCell > Lead ID < /Table.HeaderCell> <
    Table.HeaderCell > Title < /Table.HeaderCell> <
    Table.HeaderCell > Description < /Table.HeaderCell> <
    /Table.Row> <
    /Table.Header> <
    Table.Body > {
        leads.data.data &&
        leads.data.data.map((lead, sr) => ( <
            Table.Row >
            <
            Table.Cell > { sr + 1 } < /Table.Cell> <
            Table.Cell > { lead.lead_id } < /Table.Cell> <
            Table.Cell > { lead.title } < /Table.Cell> <
            Table.Cell > { lead.description } < /Table.Cell> <
            /Table.Row>
        ))
    } <
    /Table.Body> <
    /Table>
);

const LeadDetail = (props) => {
    const history = useHistory();
    const leads = useSelector((state) => state.leads);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [activeView, setactiveView] = useState("tabularview");
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
        return ( <
            >
            <
            h1 > LOADING LEADS < /h1> <
            Dimmer active >
            <
            Loader size = "massive" > Loading < /Loader> <
            /Dimmer> <
            />
        );
    }
    if (leads.isSuccess) {
        return ( <
            Container style = {
                { marginTop: "4%" } } >
            <
            div style = {
                {
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                }
            } >
            <
            NavLink to = "/" >
            <
            Icon name = "arrow alternate circle left"
            size = "large" / >
            <
            /NavLink> <
            h2 style = {
                { flexGrow: "4", textAlign: "center" } } >
            Created Leads
            for { " " } {
                props.location && props.location.params ?
                    props.location.params.companyName[0].toUpperCase() +
                    props.location.params.companyName.slice(1) :
                    null
            } { " " } <
            /h2> <
            /div> <
            ButtonGroup >
            <
            Button disabled = { activeView === "tabularview" }
            onClick = {
                () => setactiveView("tabularview") } >
            Tabular View <
            /Button> <
            Button disabled = { activeView === "listview" }
            onClick = {
                () => {
                    setactiveView("listview");
                }
            } >
            List View <
            /Button> <
            /ButtonGroup> {
                activeView === "listview" ? ( <
                    ListView leads = { leads }
                    />
                ) : ( <
                    TableView leads = { leads }
                    />
                )
            } <
            /Container>
        );
    }
    if (leads.isSuccess === null) {
        return null;
    }
    if (leads.isError) {
        return <Message > { leads.errorMessage } < /Message>;
    }
};

export default LeadDetail;