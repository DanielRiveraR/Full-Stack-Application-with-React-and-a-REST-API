import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';




const routes = () => {
  <Router>
    <Header />
    <main>
      <Switch>
        <Route path="/courses/:id" component={CourseDetail} />
        <Route path="/signin" component={UserSignIn} />
        <Route path="/signup" component={UserSignUp} />
        {/* <Route path="/signout" component={UserSignIn} /> */}
      </Switch>
    </main>
  </Router>
}

export default routes;
