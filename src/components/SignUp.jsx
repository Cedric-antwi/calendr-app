import React from 'react';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

//npm run dev

export default function SignUp(){
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const [errorMsg, setErrormsg] = useState('')
    
    const navigate = useNavigate()

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
           const res = await fetch(`${process.env.CALENDR_APP_API_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
           })
           if (res.status === 200){
                navigate('/login')
           } else {
            setErrormsg('Error during signup')
           }
        } catch (err) {
            console.log('error', err)
            setErrormsg('network or server issue...')
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
                        required
                     />
                </label>
                <input type="submit" value='Register'/>
                {errorMsg && <p className="error-message">{errorMsg}</p>}
            </form>
            <div>
                <Link to="/login"><p>Go to login page </p></Link>
            </div>
        </div>
        </>
    )
}