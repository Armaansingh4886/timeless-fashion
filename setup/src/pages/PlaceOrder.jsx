import React, { useContext, useEffect, useState } from "react";
import "../styles/placeorder.css";
import axios from "axios";
import { UserContext } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
    const navigate = useNavigate()
const [user,setUser]=useContext(UserContext)

const [selectedOption,setSelectedOption] = useState("COD");
  const handleBuyChange=(e)=>{

  setSelectedOption(e.target.value)

  }

const [address ,setAddress] = useState({
    email:"",
    phone:"",
    firstname:"",
    lastname:"",
    address:"",
    apartment:"",
    city:"",
    state:"punjab",
    pincode:""
})
const [addressChange,setAddressChange] =useState(false)


const [errors, setErrors] = useState({
  firstname: "",
  lastname:"",
    email: "",
  phone: "",
  pincode: "",
  city: "",
  state: "",
});

const handleChange = (e) => {
  setAddress({
    ...address,
    [e.target.name]: e.target.value,
  });
  
  setAddressChange(true);
  validateInput(e.target.name, e.target.value);
  
};
// const handleChange = (e) => {
//   const { name, value } = e.target;
//   setAddress({
//     ...address,
//     [name]: value,
//   });
//   setAddressChange(true);
// };

const validateInput = (name, value) => {
  switch (name) {
    case "firstname":
      setErrors((prevErrors) => ({
        ...prevErrors,
        firstname: /^[a-zA-Z ]+$/.test(value)
          ? ""
          : "Name must contain only alphabetic characters",
      }));
      break;
      case "lastname":
        setErrors((prevErrors) => ({
          ...prevErrors,
          lastname: /^[a-zA-Z ]+$/.test(value)
            ? ""
            : "Name must contain only alphabetic characters",
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
    case "pincode":
      setErrors((prevErrors) => ({
        ...prevErrors,
        pincode:
        /^\d{6}$/.test(value) ? "" : "Incorrect Pincode ",
      }));
      break;
     
    case "city":
      setErrors((prevErrors) => ({
        ...prevErrors,
        city:  /^[a-zA-Z ]+$/.test(value) ? "" : "City  must contain only alphabetic characters",
      }));
      break;
    case "state":
      setErrors((prevErrors) => ({
        ...prevErrors,
        state: value ? "" : "State is required",
      }));
      break;
    default:
      break;
  }
};







 const [orderdetail,setOrderdetail] = useState({});
  useEffect(() => {
    window.scrollTo(0, 0);

    axios
      .post("http://localhost:5000/getaddress", { userId: user })
      .then((res) => {
        if (res.data.status === true) {
          if(res.data.data){
          setAddress(res.data.data);
          }
        } else {
          toast.error(res.data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    

    axios
    .post("http://localhost:5000/getorderdetail", { userId: user })
    .then((res) => {
      if (res.data.status === true) {
        if(res.data.data){
        setOrderdetail(res.data.data);
        }
      } else {
        toast.error(res.data.error);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }, []);

  const initPayment = (data) => {
		const options = {
			key: "rzp_test_Q7DtEmCmUWr3xD",
			amount: data.amount,
			currency: data.currency,
			name: "Timeless Fashion",
			description: "Test Transaction",
			image: "",
			order_id: data.id,
			handler: async (response) => {
				try {
					const verifyUrl = "http://localhost:5000/verify";
					const { data } = await axios.post(verifyUrl, response);
					console.log(data);
				} catch (error) {
					console.log(error);
				}
			},
			theme: {
				color: "#3399cc",
			},
		};
		const rzp1 = new window.Razorpay(options);
    navigate("/placeorder")
		rzp1.open();
	};


  const handleBuyNow = async()=>{
if(selectedOption ==="Online"){
    try {
			const orderUrl = "http://localhost:5000/orderpayment";
			
			const { data } = await axios.post(orderUrl, { amount: 1 });
			
			console.log(data);
			initPayment(data.data);
		} catch (error) {
			console.log(error);
		}
  }

  console.log(address);
    if(addressChange===true){
      setAddressChange(false)
      console.log("yes");
      axios
      .post("http://localhost:5000/addaddress", { userId: user ,address:address})
      .then((res) => {
        if (res.data.status === true) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }
    axios
      .post("http://localhost:5000/placeOrder", { userId: user ,payment:selectedOption})
      .then((res) => {
        if (res.data.status === true) {
    
          toast.success(res.data.status);
        } else {
          toast.error(res.data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    console.log("buy now");
    navigate(`/`)
  }


  return (
    <div className="container-placeorder">
      <div className="left-section">
        <div className="section">
          <h2>Contact Details</h2>
          <div class="form-group">
                        <label for="email" class="form-label">Email</label>
                        
          <input type="email" id="email" placeholder="Email" name="email" value={address.email} onChange={handleChange}/>
          {errors.email && <small className="text-danger">{errors.email}</small>}
                    </div>
                    <div class="form-group">
                        <label for="phone" class="form-label">Phone</label>
          <input type="tel" id="phone" placeholder="Contact No" name="phone" value={address.phone} onChange={handleChange}/>
          {errors.phone && <small className="text-danger">{errors.phone}</small>}
          </div>
        </div>
        <div className="section">
          <h2>Delivery Details</h2>
          <div class="form-group">
                        <label for="firstname" class="form-label">First Name</label>
          <input type="text" id="firstname" placeholder="First Name" name="firstname" value={address.firstname} onChange={handleChange}/>
          {errors.firstname && <small className="text-danger">{errors.firstname}</small>}
          </div>
          <div class="form-group">
                        <label for="lastname" class="form-label">Last Name</label>
          <input type="text"id="lastname" placeholder="Last Name" name="lastname" value={address.lastname} onChange={handleChange}/>
          {errors.lastname && <small className="text-danger">{errors.lastname}</small>}
          </div>
          <div class="form-group">
                        <label for="address" class="form-label">Address</label>
          <input type="text"id="address" placeholder="Address" name="address" value={address.address} onChange={handleChange}/>
          </div>
          <div class="form-group">
                        <label for="apartment" class="form-label">Apartment</label>
          <input type="text" placeholder="Apartment" id="apartment" name="apartment" value={address.apartment} onChange={handleChange}/>
          </div>
          <div class="form-group">
                        <label for="city" class="form-label">City</label>
          <input type="text"id="city" placeholder="City" name="city"value={address.city} onChange={handleChange}/>
          {errors.city && <small className="text-danger">{errors.city}</small>}
          </div>
          <div class="form-group">
                        <label for="state" class="form-label">State</label>
          <select name="state"id="state" onChange={handleChange}>
            <option value="" disabled>Select State</option>
            <option value="punjab" selected>Punjab</option>

            {/* Add options for all states of India */}
          </select>
          </div>
          <div class="form-group">
                        <label for="pincode" class="form-label">Pincode</label>
          <input type="tel" id="pincode" placeholder="Pin Code" name="pincode" value={address.pincode} onChange={handleChange}/>
          {errors.pincode && <small className="text-danger">{errors.pincode}</small>}
          </div>
        </div>
      </div>
      <div className="right-section">
        <h2>Order Summary</h2>
        <div>
          
          <div className="price">
            <p>Total number of items: </p>
            <p className="price-right">{orderdetail.totalItems}</p>
          </div>
          <div className="price">
            <p>Total Price: </p>
            <p className="price-right">Rs.{orderdetail.totalAmount}</p>
          </div>
        </div>
        <div className="price">
          <p>Shipping Charges </p>
          <p className="price-right">Rs.200</p>
        </div>

        <hr />
        <div className="price total-bold">
          <p>GRAND TOTAL </p>
          <p className="price-right">Rs.{orderdetail.totalAmount + 200}</p>
        </div>
        <div className="price ">
          <p className="total-bold me-4">Payment Mode </p>
          <div style={{width:"50%"}} className='mt-8 d-flex justify-between'><span className=' text-lg font-bold mt-1'><input className="mx-2"type="radio" value="COD" checked="true" onChange={handleBuyChange} /> <b>Cash On Delivery</b></span><span className='text-lg font-bold mt-1'><input className="mx-2" type="radio" value="Online" checked={selectedOption === 'Online'} onChange={handleBuyChange} /><b>Online</b></span></div>
        </div>
        <div className="place-order-button">
            <button onClick={handleBuyNow}>Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
