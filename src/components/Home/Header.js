import React from "react";
import classes from "./style.module.css";
import { Grid, Button, Icon, Image } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { logout } from "../../actions";

const Header = () => {
    const dispatch = useDispatch();
    return ( <
        Grid.Row columns = { 3 }
        verticalAlign = "middle"
        centered >
        <
        br / >
        <
        Grid.Column width = { 2 } >
        <
        Image centered src = "/assets/logo-contegris-header.png"
        size = "small"
        textAlign = "center" /
        >
        <
        /Grid.Column> <
        Grid.Column width = { 8 } >
        <
        Header as = "h2"
        verticalAlign = "middle"
        textAlign = "center"
        className = { classes.companyHeading } >
        Intellicon Companies and Leads <
        /Header> <
        /Grid.Column> <
        Grid.Column width = { 3 }
        textAlign = "right" >
        <
        Button color = "red"
        onClick = {
            () => dispatch(logout()) } >
        <
        Icon name = "logout" / >
        Logout <
        /Button> <
        /Grid.Column> <
        /Grid.Row>
    );
};

export default Header;