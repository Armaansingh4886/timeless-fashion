import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "../styles/sellerregister.css"
export default function Register() {
  const navigate = useNavigate();

  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
    city:"",
    state:"",
    district:""
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
    city:"",
    state:"",
    district:""
  });

  const OnchangeData = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
    validateInput(e.target.name, e.target.value);
  };

  const validateInput = (name, value) => {
    switch (name) {
      case "name":
        setErrors((prevErrors) => ({
          ...prevErrors,
          name: /^[a-zA-Z ]+$/.test(value)
            ? ""
            : "Name must contain only alphabetic characters",
        }));
        break;
        case "city":
        setErrors((prevErrors) => ({
          ...prevErrors,
          city: /^[a-zA-Z ]+$/.test(value)
            ? ""
            : "City must contain only alphabetic characters",
        }));
        break;
        case "state":
        setErrors((prevErrors) => ({
          ...prevErrors,
          state: /^[a-zA-Z ]+$/.test(value)
            ? ""
            : "District must contain only alphabetic characters",
        }));
        break;
        case "district":
        setErrors((prevErrors) => ({
          ...prevErrors,
          district: /^[a-zA-Z ]+$/.test(value)
            ? ""
            : "State must contain only alphabetic characters",
        }));
        break;
      case "email":
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            ? ""
            : "Invalid email address",
        }));
        break;
      case "phone":
        setErrors((prevErrors) => ({
          ...prevErrors,
          phone: /^\d{10}$/.test(value)
            ? ""
            : "Phone number must be exactly 10 digits",
        }));
        break;
      case "password":
        setErrors((prevErrors) => ({
          ...prevErrors,
          password:
            value.length >= 6 ? "" : "Password must be at least 6 characters",
        }));
        break;
      case "cpassword":
        setErrors((prevErrors) => ({
          ...prevErrors,
          cpassword: value===formdata.password ? "" : "Password must match",
        }));
        break;
      
      default:
        break;
    }
  };

  const postData = (e) => {
    e.preventDefault();

    let formIsValid = true;
    for (let key in formdata) {
      if (!formdata[key]) {
        validateInput(key, formdata[key]);
        formIsValid = false;
      }
    }

    // Check if there are any errors
    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (!formIsValid || hasErrors) {
      return;
    }
    if (formIsValid) {
      
      axios
        .post("http://localhost:5000/seller/registration", formdata)
        .then((res) => {
          if (res.data.status === true) {
            toast.success(res.data.message);
            navigate("/seller/login");
          } else {
            toast.error(res.data.error);
          }
        })
        .catch((error) => {
          toast.error("An error occurred while submitting the form");
        });
    }
  };

  return (
    <>
     

      <div className="main">
        <div className="komal seler-register">
          <form onSubmit={postData} method="post">
            <h1>Register</h1>
            <ToastContainer />
            <div className="input-row"> 
            <div className="input-box">
              <input
                type="text"
                placeholder="Name"
                required
                id="name"
                name="name"
                value={formdata.name}
                onChange={OnchangeData}
              />
              {errors.name && (
                <small className="text-danger">{errors.name}</small>
              )}
            </div>

            <div className="input-box">
              <input type="email" placeholder="Email" required  name="email"
                                            value={formdata.email}
                                            onChange={OnchangeData}/>
                                            {errors.email && <small className="text-danger">{errors.email}</small>}
            </div>
            </div>
            <div className="input-row"> 
            <div className="input-box">
              <input type="tel" placeholder="Phone" required  name="phone"
                                            value={formdata.phone}
                                            onChange={OnchangeData}/>
                                            {errors.phone && <small className="text-danger">{errors.phone}</small>}
            </div>
            <div className="input-box">
              <input type="text" placeholder="City" required  name="city"
                                            value={formdata.city}
                                            onChange={OnchangeData}/>
                                            {errors.city && <small className="text-danger">{errors.city}</small>}
            </div>
            </div>
            <div className="input-row"> 
            <div className="input-box">
              <input type="text" placeholder="District" required  name="district"
                                            value={formdata.district}
                                            onChange={OnchangeData}/>
                                            {errors.district && <small className="text-danger">{errors.district}</small>}
            </div>
            <div className="input-box">
              <input type="text" placeholder="State" required  name="state"
                                            value={formdata.state}
                                            onChange={OnchangeData}/>
                                            {errors.state && <small className="text-danger">{errors.state}</small>}
            </div>
 </div>
            <div className="input-row"> 
            <div className="input-box">
              <input type="password" placeholder="Password" required name='password'
                                            value={formdata.password}
                                            onChange={OnchangeData} />
                                            {errors.password && <small className="text-danger">{errors.password}</small>}
            </div>
           
            <div className="input-box">
              <input type="password" placeholder="Confirm Password" required name='cpassword'
                                            value={formdata.cpassword}
                                            onChange={OnchangeData} />
                                            {errors.cpassword && <small className="text-danger">{errors.cpassword}</small>}
            </div>

           </div>

            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </>
  );
}
