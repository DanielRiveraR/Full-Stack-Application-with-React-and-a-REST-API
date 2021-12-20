import React, {useState} from "react";
import { appSettings } from '../config';
import Cookies from 'js-cookie';

export const appContext = React.createContext();

export const Provider = (props) => {
    let cookie = Cookies.get('authenticatedUser');

    const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null);

    const api = (path, method = 'GET', body = null, requiresAuth = false, credentials= null) => {
        const url = appSettings.apiBaseUrl + path;
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        };
        options.url = url;

        if(body !== null) {
            options.body = JSON.stringify(body);
        }

        if (requiresAuth) {
            const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
            options.headers['Authorization'] = `Basic ${encodedCredentials}`
        }

        return fetch(url, options)
        .then(response => response)
    }


    const getUser = async(username, password) => {
        const response = api('/users', 'GET', null, true, {username, password})
        return response;
    }

    const getCourses = async() => {
        const response = await api('/courses')
        return response;
    }

    const getCourse = async(id) => {
        const response = await api(`/courses/${id}`)
        return response;
    }

    const createCourse = async(course, username, password) => {
        const response = api('/courses', 'POST', course, true, {username, password})
        return response;
    }

    const updateCourse = async(id, body, username, password) => {
        const response = api(`/courses/${id}`, 'PUT', body, true, {username, password})
        return response;
    }

    const signIn = async(username, password) => {
        let user;
        const response = await getUser(username, password);
        if (response.status === 200) {
            await response.json()
                .then(data => {
                    user = data
                    user.password = password
                    setAuthUser(user);
                    Cookies.set('authenticatedUser', JSON.stringify(user), {expires: 1})
                })
        }
        return response
    }

    const signUp = (user) => {
        const response = api('/users', 'POST', user);
        return response;
    }

    const signOut = () => {
        setAuthUser(null);
        Cookies.remove('authenticatedUser');
    }

    const deleteCourse = (id, username, password) => {
        api(`/courses/${id}`, 'DELETE', null, true, {username, password});
    }

    return (
        <appContext.Provider value={ { actions: {
            getCourses,
            getCourse,
            signIn,
            signUp,
            signOut,
            authUser,
            getUser,
            deleteCourse,
            createCourse,
            updateCourse
        }}}>
            {props.children}
        </appContext.Provider>
    );

}