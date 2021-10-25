import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Companies from "./components/Companies/Companies";
import LeadDetail from "./components/Leads/LeadDetail";
import Login from "./components/Login/Login";
import "./App.css";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact component={Companies} />
          <Route path="/login" component={Login} />
          <Route path="/leads/:id" component={LeadDetail} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
