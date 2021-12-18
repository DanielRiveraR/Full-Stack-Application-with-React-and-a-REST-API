import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


const routes = () => (
  <Router>
    <Header />
    <main>
      <Switch>
        <Route exact path="/" component={mainPage} />
      </Switch>
    </main>
  </Router>
)