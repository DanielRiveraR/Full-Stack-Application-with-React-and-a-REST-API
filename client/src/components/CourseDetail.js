import React, {useState, useEffect, useContext} from 'react';
import {appContext} from '..Context';
import { Link, useHistory } from 'react-router-dom';

const CorseDetail = (props) => {
    let [course, setCourse] = useState([]);
    let [loading, setLoading] = useState(true);

    const {actions} = useContext(appContext)
    const history = useHistory();

    let id= props.match.params.id

    useEffect( () => {
        const getCourse = async () => {
            await actions.getCourse(id)
            .then(response => {
                if (response.status === 200) {
                    response.json()
                    .then(data => setCourse(data.course))
                    .finally(() => setLoading(false))
                } else if(response.status === 401) {
                    history.push('/notfound')
                } else {
                    history.push('/error')
                }
            })
        }
        getCourse();
    }, [actions, history, id]);


    return (
        <div className="wrap">
            {
                loading
                    ? <h1>Loading...</h1>
                    : (
                        <form>
                            <div className="actions--bar">
                                <div className="wrap">
                                    {
                                        (checkAuthUser()) ?
                                            <>
                                            <AdminButtons deleteCourse={deleteCourse} data={course}/>
                                            </>
                                            : null
                                    }
                                        <Link className="button button-secondary" to={'/'}>Return to List</Link>
                                </div>
                            </div>
                            <h2>Course Detail</h2>

                            <div className="main--flex">
                                <div>
                                    <h3 className="course--detail--title">Estimated Time</h3>
                                    <h4 className="course--name">{course.title}</h4>
                                    <p>By {course.Creator.firstName} {course.Creator.lastName}</p>
                                    <ReactMarkdown>{course.description}</ReactMarkdown>
                                    <p></p>
                                </div>
                                <div>
                                    <h3 className="course--detail--title">Estimated Time</h3>
                                    <p>{course.estimatedTime || 'No time provided'}</p>
                                    <h3 className="course--detail--title">Materias Needed</h3>
                                    <ul className="course--detail--list">
                                        <ReactMarkdown>{course.materialsNeeded || '*Nothing!'}</ReactMarkdown>
                                    </ul>
                                </div>
                            </div>
                        </form>
                    )
            }
        </div>
    )
}

export default CorseDetail;