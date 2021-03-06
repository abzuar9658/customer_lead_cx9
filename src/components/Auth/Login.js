import React, { useState, useEffect } from "react";
import {
    Grid,
    Form,
    Segment,
    Button,
    Header,
    Message,
    Image,
} from "semantic-ui-react";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../actions/index";
import classes from "./style.module.css";

const Login = () => {
        const [username, setusername] = useState("");
        const [password, setpassword] = useState("");
        const [errors, seterrors] = useState([]);
        const [loading, setloading] = useState(false);
        const [success, setsuccess] = useState(false);
        const auth = useSelector((state) => state.auth);
        const history = useHistory();
        const dispatch = useDispatch();
        useEffect(() => {
            try {
                if (auth.isSuccess) {
                    setsuccess(true);
                    setloading(false);
                    if (auth.data) {
                        history.push("/");
                    }
                }
                if (auth.isError) {
                    let errors = [];
                    let error;
                    error = { message: auth.errorMessage };
                    seterrors(errors.concat(error));
                    setloading(false);
                }
            } catch (error) {
                console.log(error);
            }
        }, [auth]);
        const displayErrors = (errors) =>
            errors.map((error, i) => ( <
                p key = { i } > { " " } {
                    error.message.includes("401") ?
                        "Invalid username or password" :
                        error.message
                } { " " } <
                /p>
            ));

        const handleSubmit = (event) => {
            try {
                event.preventDefault();
                if (isFormValid()) {
                    seterrors([]);
                    setloading(true);
                    dispatch(login({ username, password }));
                }
            } catch (error) {
                console.error(error);
            }
        };

        const isFormValid = () => username && password;

        const handleInputError = (errors, inputName) => {
            try {
                return errors.some((error) =>
                        error.message.toLowerCase().includes(inputName)
                    ) ?
                    "error" :
                    "";
            } catch (error) {
                console.log(error);
            }
        };
        return ( <
            div className = { classes.companiesGrid } >
            <
            Grid textAlign = "center"
            style = {
                { marginTop: "-120px" } }
            stackable >
            <
            Grid.Column style = {
                {
                    maxWidth: 450,
                    padding: "50px",
                    backgroundColor: "cream",
                }
            } >
            <
            Image src = "/assets/logo-contegris-header.png"
            centered fluid style = {
                { marginLeft: "3.5px" } }
            />{" "} <
            Form onSubmit = { handleSubmit }
            size = "large" >
            <
            Form.Input fluid name = "username"
            icon = "mail"
            iconPosition = "left"
            placeholder = "User Name"
            onChange = {
                (event) => {
                    setusername(event.target.value);
                }
            }
            value = { username }
            className = { handleInputError(errors, "username") }
            type = "text" /
            >
            <
            Form.Input fluid name = "password"
            icon = "lock"
            iconPosition = "left"
            placeholder = "Password"
            onChange = {
                (event) => {
                    setpassword(event.target.value);
                }
            }
            value = { password }
            className = { handleInputError(errors, "password") }
            type = "password" /
            >
            <
            Button disabled = { loading }
            className = { loading ? "loading" : "" }
            color = "blue"
            fluid size = "large" >
            Submit { " " } <
            /Button>{" "} <
            /Form>{" "} {
                errors.length > 0 && ( <
                    Message error >
                    <
                    h3 > Error < /h3> {displayErrors(errors)}{" "} <
                    /Message>
                )
            } { " " } {
                success ? < Message success > Login Success < /Message> : null}{" "} <
                    /Grid.Column>{" "} <
                    /Grid>{" "} <
                    /div>
            );
        };

        export default Login;