import { useContext } from "react";
import { appContext } from "./Context";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ( {component: Component, ...rest}) => {
    const {actions} = useContext(appContext);

    return (
        <div>
            {
                <Route {...rest} render={props => actions.authUser ? <Component {...props} /> : <Redirect to="/signin" /> } />
            }
        </div>
    )
}

export default PrivateRoute;