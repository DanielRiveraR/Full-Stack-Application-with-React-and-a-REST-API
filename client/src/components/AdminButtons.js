import { Link } from 'react-router-dom';

const AdminButtons = (props) => {
    return (
        <>
        <Link className="button" to={`/courses/${props.data.id}/update`}>Update Course</Link>
        <a href="/" onClick={props.deleteCourse} className="button">Delete Course</a>
        </>
    )
}

export default AdminButtons;