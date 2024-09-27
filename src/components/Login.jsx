import React from 'react';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp(){
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [message, setMessage] = useState('')
    const navigate = useNavigate() //for redirects

    function handleChange(event) {
        let {name, value} = event.target
        setFormData(prevForm => {
            return {
                ...prevForm,
                [name]: value
            }
        })
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(`${process.env.CALENDR_APP_API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            if (res.ok){
                const data = await res.json()
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/home')
            } else {
                setMessage('Incorrect login')
            }
        } catch (err) {
            console.log(err)
        }
            
    }

    return (
        <>
        <h1>Login Page</h1>
        <div className="app-signup-container">
            <form className="app-signup-form" onSubmit={handleLogin}>
                <label>
                    Email:
                    <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </label>
                
                <label>
                    Password:
                    <input 
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                     />
                </label>
                <input type="submit"/>
            </form>
            <p>{message}</p>
            <div>
                <Link to="/"><p>Sign up to Calendr</p></Link>
            </div>
        </div>
        </>
    )
}