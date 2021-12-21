import { useHistory } from "react-router-dom";

const Forbidden = () => {
    const history = useHistory();

    const routeChange = () => {
        history.push('/');
    }

    return (
        <div className="wrap">
            <h2>Forbidden</h2>
            <p>Oh no! You can't access this page.</p>
            <button onClick={routeChange} className="button button-secondary">Return Home</button>
        </div>
    );
} 


export default Forbidden;