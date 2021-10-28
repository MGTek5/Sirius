import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom"
import userContext from "./context/userContext";
import Home from "./pages/Home";
import Register from "./pages/Register";


const ProtectedRoute = ({path, exact, component, context}) => {
    if (context.user !== null) {
        return <Route path={path} exact={exact} component={component} />
    }
    return <Redirect to="/login" />
}

const Router = () => {
    const userC = useContext(userContext)

    return (
        <Switch>
            <ProtectedRoute path="/" exact={true} component={Home} context={userC} />        
            <Route path="/register" exact={true} component={Register} />
            
        </Switch>
    )
}

export default Router;