import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ flashMessage, logUserIn }) {

    const navigate = useNavigate();

    async function handleLogin(event){
        event.preventDefault();
        // console.log(event);

        let username = event.target.username.value;
        let password = event.target.password.value;
        let stringToEncode = `${username}:${password}`

        let myHeaders = new Headers();
        myHeaders.append('Authorization', `Basic ${btoa(stringToEncode)}`);

        let response = await fetch('http://3.23.92.242/api/token', {
            method: 'POST',
            headers: myHeaders
        });

        let data = await response.json();

        if (data.error){
            flashMessage(data.error, 'danger');
        } else {
            // Get the token and token expiration from the response data
            console.log(data);
            let token = data.token;
            let expiration = data.token_exp;

            // Store the value in local storage on the browser
            localStorage.setItem('token', token);
            localStorage.setItem('tokenExp', expiration);

            // Change the state of loggedIn to true
            logUserIn(true);

            // flash a success message and redirect
            flashMessage('You have successully logged in', 'success');
            navigate('/create');
        };

    };

    return (
        <>
            <h2 className="text-center TitleTop">Log In Here!</h2>
            <form action="" onSubmit={handleLogin}>
                <div className="form-group">
                    <input type="text" name="username" className="form-control my-3 InputText" placeholder='Enter Username' />
                    <input type="password" name="password" className="form-control my-3 InputText" placeholder='Enter Password' />
                    <input type="submit" value="Log In" className='btn btn-success w-100 ButtonApp' />
                </div>
            </form>
        </>
    )
}
