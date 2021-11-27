import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Switch, Route, Redirect } from "react-router-dom";
import userContext, { UserContextInterface } from "./context/userContext";
import Details from "./pages/Details";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import SignOut from "./pages/SignOut";
import TrackMe from "./pages/TrackMe";


interface IProtectedRouteProps {
  path: string;
  exact: boolean;
  context: UserContextInterface;
  component: React.ComponentType
}

const ProtectedRoute = ({ path, exact, component, context }: IProtectedRouteProps) => {
  if (context.user !== null) {
    return <Route path={path} exact={exact} component={component} />;
  }
  toast.error("You need to be authenticated to view this page")
  return <Redirect to="/" />;
};

const Router = () => {
  const userC = useContext(userContext);

  return (
    <Switch>
      <Route path="/" exact={true} component={Home} />
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
