import React, { useContext, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/login.css"

import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { UserContext } from '../App';

export default function Login() {
    const navigate = useNavigate();
    const [user,setUser] = useContext(UserContext);

    const [formdata, setFormdata] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });
useEffect(()=>{
    window.scroll(0,0)
},[])
    const onChangeData = (e) => {
        setFormdata({
            ...formdata,
            [e.target.name]: e.target.value,
        });
    };

    const validateInput = (name, value) => {
        switch (name) {
            case 'email':
                setErrors(prevErrors => ({
                    ...prevErrors,
                    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email address',
                }));
                break;
            case 'password':
                setErrors(prevErrors => ({
                    ...prevErrors,
                    password: value.length >= 6 ? '' : 'Password must be at least 6 characters',
                }));
                break;
            default:
                break;
        }
    };

    const onHandleForm = (e) => {
        e.preventDefault();

        let formIsValid = true;
        for (let key in formdata) {
            if (!formdata[key]) {
                validateInput(key, formdata[key]);
                formIsValid = false;
            }
        }

        if (formIsValid) {
            axios.post('http://localhost:5000/seller/login', formdata)
                .then((res) => {
                    if (res.data.status === true && res.data.token) {
                        const token = res.data.token;
                        localStorage.setItem('token', token);
                        localStorage.setItem('userId', res.data.id);
                        setUser(res.data.id)
                        navigate('/seller/');
                    } else {
                        toast.error(res.data.error);
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    toast.error('An error occurred. Please try again later.');
                });
        }
    };

    return (
        <>
           

<div className='main'>

<div className='komal'>
 <form onSubmit={onHandleForm} method="post">
   <h1>Login</h1>
   <div className='input-box'>
     <input type="text" placeholder='Username/email' required id="email" name="email"
                                                value={formdata.email}
                                                onChange={onChangeData}/>
     <FaUser className='icon' />
     {errors.email && <small className="text-danger">{errors.email}</small>}
   </div>
   <div className='input-box'>
     <input type="password" placeholder='Password' required id="password" name="password"
                                                value={formdata.password}
                                                onChange={onChangeData} />
     <FaLock className='icon' />
     {errors.password && <small className="text-danger">{errors.password}</small>}
   </div>
   
   <button type='submit'>Login</button>
   <div className="register-link">
     <p>Don't have an account?</p><Link to="/seller/register">Register</Link>
   </div>
 </form>
</div>
</div>
        </>
    );
}
