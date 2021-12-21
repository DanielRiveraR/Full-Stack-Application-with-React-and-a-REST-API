import { Link, useHistory } from "react-router-dom";

const NotFound = () => {
    let history = useHistory();

    const manageRoute = () => {
        history.push('/');
    }

    return (
        <div>
            <h2>Not Found</h2>
            <p>Sorry! We couldn't find the course you were looking for.</p>
            <Link className="button button-secondary" onClick={manageRoute} >Back to home</Link>
        </div>
    );
}

export default NotFound;