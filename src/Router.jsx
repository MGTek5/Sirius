import { Switch, Route } from "react-router-dom"
import Login from "./pages/Login";


const Router = () => {
    return (
        <Switch>
            <Route path="/login" component={Login} />
        </Switch>
    )
}

export default Router;