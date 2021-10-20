import React, { useEffect, useState } from "react";
import {
    Container,
    Message,
    Item,
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

const TableView = ({ leads }) => ( <
    Table celled striped >
    <
    Table.Header >
    <
    Table.Row >
    <
    Table.HeaderCell > Sr. < /Table.HeaderCell> <
    Table.HeaderCell > Subject < /Table.HeaderCell> <
    Table.HeaderCell > Lead Number < /Table.HeaderCell> <
    Table.HeaderCell > Creation Date < /Table.HeaderCell> <
    Table.HeaderCell > Status < /Table.HeaderCell> <
    Table.HeaderCell > Pipeline Stage < /Table.HeaderCell> <
    /Table.Row> <
    /Table.Header> <
    Table.Body > {
        leads.data.data &&
        leads.data.data.leads &&
        leads.data.data.leads.map((lead, sr) => ( <
            Table.Row >
            <
            Table.Cell > { sr + 1 } < /Table.Cell> <
            Table.Cell > { lead.subject } < /Table.Cell> <
            Table.Cell > { lead.leadNumber } < /Table.Cell> <
            Table.Cell > { new Date(lead.createdAt).toLocaleDateString("en-US") } <
            /Table.Cell> <
            Table.Cell > { lead.status ? "Open" : "Closed" } < /Table.Cell> <
            Table.Cell > { lead.pipelineStage } < /Table.Cell> <
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
    }, [activePage]);
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
                }
            } >
            <
            Popup content = "previous page"
            trigger = { <
                NavLink to = "/" >
                <
                Icon name = "arrow alternate circle left"
                size = "large" / > Back <
                /NavLink>
            }
            /> <
            Header as = "h2"
            textAlign = "center"
            style = {
                { flex: "1" } } >
            Created Leads
            for {
                props.location && props.location.params ?
                    props.location.params.companyName[0].toUpperCase() +
                    props.location.params.companyName.slice(1) :
                    null
            } <
            /Header> <
            /div> <
            TableView leads = { leads }
            /> <
            Pagination style = {
                { display: "flex", justifyContent: "center" } }
            onPageChange = {
                (e, data) => {
                    setactivePage(data.activePage);
                }
            }
            defaultActivePage = { activePage }
            totalPages = { Math.floor(leads.data.data.total / 10) }
            /> <
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