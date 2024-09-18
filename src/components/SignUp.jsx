import React from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom';

export default function SignUp(){
    const [formData, setFormData] = useState({
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

    return (
        <div className="app-signup-container">
            <form className="app-signup-form">
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
                    Password:
                    <input 
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                     />
                </label>
                <Link to="/home"><input type="submit"/></Link>
            </form>
        </div>
    )
}