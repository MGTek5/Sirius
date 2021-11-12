import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import userContext from "./context/userContext";
import Details from "./pages/Details";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import SignOut from "./pages/SignOut";
import TrackMe from "./pages/TrackMe";

const ProtectedRoute = ({ path, exact, component, context }) => {
  if (context.user !== null) {
    return <Route path={path} exact={exact} component={component} />;
  }
  return <Redirect to="/login" />;
};

const Router = () => {
  const userC = useContext(userContext);

  return (
    <Switch>
      <ProtectedRoute path="/" exact={true} component={Home} context={userC} />
      <ProtectedRoute
        path="/auth/signout"
        exact={true}
        component={SignOut}
        context={userC}
      />
      <ProtectedRoute
        path="/profile"
        exact={true}
        component={Profile}
        context={userC}
      />
      <ProtectedRoute
        path="/track"
        exact={true}
        component={TrackMe}
        context={userC} />
      <Route path="/details/:timestamp" exact={true} component={Details} />
      <Route path="/register" exact={true} component={Register} />
      <Route path="/login" exact={true} component={Login} />
    </Switch>
  );
};

export default Router;
