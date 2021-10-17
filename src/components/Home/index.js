import React, { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Item, Form, Grid, Button, Message } from "semantic-ui-react";
import { getCompanies, getLeads } from "../../actions";
import Companies from "./Companies";
const Home = () => {
        const auth = useSelector((state) => state.auth);
        const companies = useSelector((state) => state.companies);

        const dispatch = useDispatch();
        const history = useHistory();
        const [name, setname] = useState("");
        const [email, setemail] = useState("");
        const [affiliation, setaffiliation] = useState("");
        const [error, seterror] = useState(null);
        const [open, setOpen] = React.useState(false);

        const handleModalToggle = (value) => {
            setOpen(value);
        };
        //making sure that the user is logged in after initial render
        useEffect(() => {
            if (!auth.isSuccess) {
                history.push("/login");
                return null;
            }
        }, []);

        const handleFormSubmit = (e) => {
            try {
                e.preventDefault();
                if (name.length === 0 && email.length === 0 && affiliation.length === 0) {
                    seterror("Please fill at least one field to search for companies");
                    return;
                }
                dispatch(getCompanies({ name, email, affiliation }));
            } catch (error) {
                console.log(error);
            }
        };
        return ( <
            >
            <
            Grid style = {
                {
                    display: "flex",
                    alignContent: "center",
                    flexDirection: "column",
                    marginTop: "3%",
                }
            }
            stackable alignContent = "center"
            textAlign = "center" >
            <
            Grid.Row >
            <
            div style = {
                {
                    display: "flex",
                    justifyContent: "center",
                    margin: "20px 0",
                }
            } >
            <
            h2 > Search Companies here < /h2> <
            /div> <
            /Grid.Row> <
            Grid.Row >
            <
            Form onSubmit = {
                (e) => handleFormSubmit(e) } >
            <
            Form.Group >
            <
            Form.Input label = "Company Name"
            placeholder = "name"
            value = { name }
            onChange = {
                (e) => setname(e.target.value) }
            /> <
            Form.Input label = "Email"
            placeholder = "email"
            value = { email }
            onChange = {
                (e) => setemail(e.target.value) }
            /> <
            Form.Input label = "Affiliation"
            placeholder = "affiliation"
            value = { affiliation }
            onChange = {
                (e) => setaffiliation(e.target.value) }
            /> <
            /Form.Group> <
            div style = {
                {
                    display: "flex",
                    justifyContent: "end",
                    marginTop: "2%",
                }
            } >
            <
            Button type = "submit"
            color = "blue"
            size = "tiny"
            loading = { companies.isLoading } >
            Search Companies <
            /Button> <
            div style = {
                { display: "none" } } > {!!error &&
                setTimeout(() => {
                    seterror(null);
                }, 2000)
            } <
            /div> <
            /div> {
                !!error ? < Message color = "red" > { error } < /Message> : null} <
                    /Form> <
                    /Grid.Row> <
                    Grid.Row textAlign = "left" > {!companies.isSuccess && ( <
                            h5 > Enter information to search
                            for companies < /h5>
                        )
                    } {
                        companies.data && companies.data.message ? ( <
                            Message success > { companies.data.message } < /Message>
                        ) : null
                    } <
                    /Grid.Row> <
                    /Grid> <
                    div style = {
                        { width: "70%", marginLeft: "14%" } } >
                    <
                    Companies companies = { companies }
                /> <
                /div> <
                />
            );
        };

        export default Home;