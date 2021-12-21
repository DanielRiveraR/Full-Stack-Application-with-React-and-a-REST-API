import { useState, useContext, useEffect } from "react";
import { appContext } from '../Context';
import { useHistory } from 'react-router-dom';

const UpdateCourse = (props) => {
    let identifier = props.match.params.id;
    const { actions } = useContext(appContext);

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [time, setTime] = useState('');
    const [materials, setMaterials] = useState('');
    const [errors, setErrors] = useState([]);
    const [id, setId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [course, setCourse] = useState({});

    
    const history = useHistory();
    const routerChange = () => {
        history.push(`/courses/${id}`);
    }


    useEffect( () => {
        const getCourse = async() => {
            await actions.getCourse(identifier)
            .then(response => {
                if (response.status === 200) {
                  response.json()
                    .then(data => {
                        setCourse(data.course)
                        return data.course;
                    })
                    .then((course) => {
                        setTitle(course.title);
                        setDesc(course.description);
                        setTime(course.estimatedTime);
                        setMaterials(course.materialsNeeded);
                        setId(course.id);
                        return course;
                    })
                    .then(setLoading(false))
                } else {
                    history.push('/error')
                }
            }
        )
        }
        getCourse();

    }, [actions, history, identifier])

    const onChange = (e) => {
        e.preventDefault();
        if (e.target.name === 'courseTitle') {
            setTitle(e.target.value);
        } else if (e.target.name === 'courseDescription') {
            setDesc(e.target.value);
        } else if (e.target.name === 'estimatedTime') {
            setTime(e.target.value);
        } else if (e.target.name === 'materialsNeeded') {
            setMaterials(e.target.value);
        }
    }


    const handleSubmit = async(e) => {
        e.preventDefault();
        let body = {
            title: title,
            description: desc,
            estimatedTime: time,
            materialsNeeded: materials
        };

        const response = actions.updateCourse(identifier, body, actions.authUser.emailAddress, actions.authUser.password)
            .then(response => {
                if (response.status === 204) {
                    setTimeout(() => {
                        history.push(`/courses/${identifier}`)
                    }, 500)
                } else if (response.status === 400) {
                    response.json().then(response => {
                        setErrors(response);
                        console.log(course);
                        }) 
                    }
                })
                console.log(response);
    }


    return (
        <main> 
        {
            loading
            ? <h1>Loading...</h1>
            :   (
                <div className="wrap"> 
                {
                    (errors.length !== 0)
                    ?   <div className="validations--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                            {errors.message}
                        </ul>
                    </div>
                    : null
                }

            <h2>Update Course</h2>
            <form onSubmit={handleSubmit}>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input onChange={onChange} id="courseTitle" name="courseTitle" type="text" value={title} />

                        <p>By {actions.authUser.firstName} {actions.authUser.lastName}</p>

                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea onChange={onChange} id="courseDescription" name="courseDescription" type="text" value={desc}></textarea>
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input onChange={onChange} id="estimatedTime" name="estimatedTime" type="text" value={time} />

                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea onChange={onChange} id="materialsNeeded" name="materialsNeeded" type="text" value={materials}></textarea>
                    </div>
                </div>
                <button className="button" type="submit">Update Course</button>
                <button onClick={routerChange} className="button button-secondary">Cancel</button>
            </form>
        </div>
        )
        }
        </main>
    );
}


export default UpdateCourse;