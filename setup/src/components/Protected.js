import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Protected(props) {
    const Navigate=useNavigate();
    const { Component } = props

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            Navigate('/Login')
        }
    })

    return (
        <>
            <Component />
        </>
    )
}
