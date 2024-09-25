import React from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom';

export default function SignUp(){
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })

    function handleChange(event) {
        let {name, value} = event.target
        setFormData(prevForm => {
            return {
                ...prevForm,
                [name]: value
            }
        })
    }

    const handleSignup = async (e) => {
        e.preventDefault()
        try {
            const response = await signupUser(username, password)
            //handle success e.g. redirect to the login
            console.log('signup successful', response)
        } catch (err) {
            console.log('error', err)
        }
    }

    return (
        <>
        <h1>Signup page</h1>
        <div className="app-signup-container">
            <form className="app-signup-form" onSubmit={handleSignup}>
                <label>
                    Name:
                    <input 
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </label>

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
                <Link to="/Login"><input type="submit" name='Register'/></Link>
            </form>
        </div>
        </>
    )
}