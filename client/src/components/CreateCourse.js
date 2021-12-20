import React, { useState, useContext } from "react";
import { appContext } from '../Context';
import { useHistory } from 'react-router-dom';

const CreateCourse = () => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [time, setTime] = useState('');
    const [materials, setMaterials] = useState('');
    const [errors, setErrors] = useState([]);

    const { actions } = useContext(appContext);
    const history = useHistory();
    
    const routeChange = () => {
        history.push('/');
    }

    function handleChange(e) {
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


    function handleSubmit (e) {
        e.preventDefault();
        let body = {
            title: title,
            description: desc,
            estimatedTime: time,
            materialsNeeded: materials
        };

        actions.createCourse(body, actions.authUser.emailAddress, actions.authUser.password)
            .then(response => {
                if (response.status === 201) {
                    setTimeout(() => {
                        routeChange()
                    }, 500)
                } else if (response.status === 400) {
                    response.json().then(data => setErrors([data]))
                } 
            })
            .catch(error => {
                history.push('/error')
            })
    }


    return (
        <div className="wrap">
            <h2>Create Course</h2>
            {
                (errors.length > 0)
                ? (
                    <div className="validations--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                            {
                                errors.map((errors, index) => { 
                                    return (
                                    <li key={index} data={errors}></li> 
                                    )
                                })
                            }
                        </ul>
                    </div>
                )
                
                : null
            }


            <form onSubmit={handleSubmit}>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input onChange={handleChange} id="courseTitle" name="courseTitle" type="text" value={title} />

                        <p>By {actions.authUser.firstName} {actions.authUser.lastName}</p>

                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea onChange={handleChange} id="courseDescription" name="courseDescription" type="text" value={desc}></textarea>
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input onChange={handleChange} id="estimatedTime" name="estimatedTime" type="text" value={time} />

                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea onChange={handleChange} id="materialsNeeded" name="materialsNeeded" type="text" value={materials}></textarea>
                    </div>
                </div>
                <button className="button" type="submit">Create Course</button>
                <button onClick={routeChange} className="button button-secondary">Cancel</button>
            </form>
        </div>
    )
}


export default CreateCourse;