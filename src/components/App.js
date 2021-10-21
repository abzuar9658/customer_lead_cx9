import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Home/Home";
import LeadDetail from "./Leads/LeadDetail";
import Login from "./Auth/Login";
import "./App.css";
import Error from "./Error/Error";
import HeaderSection from "./Home/HeaderSection";
import FooterSection from "./Home/FooterSection";

function App() {
    return ( <
        Error >
        <
        Router >
        <
        HeaderSection / >
        <
        Switch >
        <
        Route path = "/"
        exact component = { Home }
        />{" "} <
        Route path = "/login"
        component = { Login }
        />{" "} <
        Route path = "/leads/:id"
        component = { LeadDetail }
        />{" "} <
        /Switch>{" "} <
        /Router>{" "} <
        FooterSection / >
        <
        /Error>
    );
}

export default App;