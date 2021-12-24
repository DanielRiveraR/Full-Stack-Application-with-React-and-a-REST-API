import { useContext } from "react";
import { Link } from "react-router-dom";
import { appContext} from '../Context';

const Header = () => {
    const {actions} = useContext(appContext);
    const authUser = actions.authUser;

    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><a href="/">Courses</a></h1>
                <nav>
                    {
                        authUser
                        ? <ul className="header--signedout">
                            <h1>{`Welcome ${authUser.firstName} ${authUser.lastName}!`}</h1>
                                <Link to="/signout/">Sign Out</Link>
                        </ul>

                        : <ul className="header--signedout">
                            <Link className="loginbuttons" to="/signup/">Sign Up </Link>
                            <Link className="loginbuttons" to="/signin/">Sign In</Link>
                        </ul>
                    }
                </nav>
            </div>
        </header>
    );
}

export default Header;