import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Home";
import Leads from "./Leads/Leads";
import Login from "./Auth/Login";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/leads/:id" component={Leads} />
      </Switch>
    </Router>
  );
}

export default App;
