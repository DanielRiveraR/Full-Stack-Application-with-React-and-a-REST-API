import { appContext } from "../Context";
import { useContext, useEffect} from "react";
import { useHistory } from "react-router-dom";

const UserSignOut = () => {
    const {actions} = useContext(appContext);
    const history = useHistory();

    useEffect( () => {
        actions.signOut();
        history.push('/');
    })

    return (
        null
    )
}

export default UserSignOut;