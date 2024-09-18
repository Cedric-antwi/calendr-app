import React from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom';

export default function HomeScreen() {
    return (
        <>
            <h1>Calendr Screen</h1>
            <button><Link to="/">Logout</Link></button>
        </>
    )
}