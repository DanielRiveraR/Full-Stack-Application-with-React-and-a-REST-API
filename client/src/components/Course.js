import { Link } from "react-router-dom";

const Course = (props) => {
    const {id, title} = props.data;

    return (
        <Link className="course--module course--link" to={`/courses/${id}`}>
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">{title}</h3>
        </Link>
    )
}

export default Course;