// // UploadForm.js
// import React, { useState } from "react";
// import { useNavigate } from "react-router";
// import axios from "axios";
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer, toast } from "react-toastify";


// const UploadItem = () => {
//   const navigate = useNavigate();

//   const [data, setdata] = useState({
//     name: "",
//     category: "",
//     price: "",
//     description: "",
//     image: "",
//   });

//   const OnchangeData = (e) => {
//     setdata({
//       ...data,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     console.log(data)
//     if (!selectedFile) return;

//     const formData = new FormData();
//     formData.append('file', selectedFile);

//     try {
//       const response = await axios.post('http://localhost:5000/seller/uploadFile', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log('Upload successful:', response.data.path);
//       data.image = response.data.path
//       console.log(data);


//       axios
//       .post("http://localhost:5000/seller/postItem", data)
//       .then((res) => {
//         if (res.data.status === true) {
//           toast.success(res.data.message);
          
//         } else {
//           toast.error(res.data.error);
//         }
//       })
//       .catch((error) => {
//         toast.error("An error occurred while submitting the form");
//       });


//     } catch (error) {
//       console.error('Upload failed:', error);
//     }
//   };

//   return (

//     <>  
//     <div className="main">
//         <div className="komal">
//           <form onSubmit={handleSubmit} method="post">
//             <h1>Post new Item</h1>
//             <ToastContainer />
//             <div className="input-box">
//               <input
//                 type="text"
//                 placeholder="Name"
//                 required
//                 id="name"
//                 name="name"
//                 value={data.name}
//                 onChange={OnchangeData}
//               />
              
//             </div>

//             {/* <div className="input-box">
//               <input type="text" placeholder="Category" required  name="category"
//                                             value={data.category}
//                                             onChange={OnchangeData}/>
                                            
//             </div> */}
             
//             <div className="input-box">
//             <select class="filter-categories border-0 mb-0 me-5" name="category" onChange={OnchangeData}>
//               <option value="" disabled >Shop by Category</option>
//               <option value="Salwar Kameez" >Salwar Kameez</option>
//               <option value="Casual wear" >Casual Wear</option>
//               <option value="Party wear" >Party Wear</option>
//               <option value="Bridal wear" >Bridal Wear</option>
// <option value="Pakistani Suits" >Pakistani Suits</option>
// <option value="Anarkali Suits" >Anarkali Suits</option>
// <option value="Straight Salwar" >Straight Salwar</option>
// <option value="Kurta with plazo" >Kurta with plazo</option>
// <option value="Kurtas" >Kurtas</option>
// <option value="Embroidered Suits" >Embroidered Suits</option>
// <option value="Sharara Suits" >Sharara Suits</option>
// <option value="Haldi Dresses" >Haldi Dresses</option>
// <option value="Mehndi Outfits" >Mehndi Outfits</option>
//             </select>
//             </div>

//             <div className="input-box">
//               <input type="number" placeholder="Price" required name='price'
//                                             value={data.price}
//                                             onChange={OnchangeData} />
                                            
//             </div>
//             <div className="input-box">
//               <input type="text" placeholder="description" required name='description'
//                                             value={data.description}
//                                             onChange={OnchangeData} />
                                            
//             </div>
//             <div className="input-box">
//               {/* <input type="text" placeholder="description" required name='description'
//                                             value={data.description}
//                                             onChange={OnchangeData} /> */}
//                                             <input type="file" accept="image/*" onChange={handleFileChange} />
                                            
//             </div>

           

//             <button type="submit">Post</button>
//           </form>
//         </div>
//       </div>
    
     
//     </>
//   );
// };

// export default UploadItem;


// <option value="">Select Category</option>
// <option value="Salwar Kameez">Salwar Kameez</option>
// <option value="Casual Wear">Casual Wear</option>
// <option value="Party Wear">Party Wear</option>
// <option value="Bridal Wear">Bridal Wear</option>

// <option value="Pakistani Suits">Pakistani Suit</option>
// <option value="Anarkali Suits">Anarkali Suit</option>

// <option value="Straight Salwar">Straight Salwar</option>
// <option value="Kurta with plazo">Kurta With Plazo</option>
// <option value="Kurtas">Kurtas </option>
// <option value="Embroidered Suits">Embroidered Suit</option>
// <option value="Sharara Suits">Sharara Suits</option>
// <option value="Haldi Dresses">Haldi Dresses</option>
// <option value="Mehndi Outfits">Mehndi Outfits</option>


import { useInRouterContext, useNavigate } from 'react-router-dom';
import '../styles/uploaditem.css'; // Import the CSS for styling
import React, { useContext, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import "../styles/uploaditem.css"
import { UserContext } from '../App';



const UploadItemForm = () => {
  const [user,setUser] = useContext(UserContext);
  
const selection = useRef(null);
  const navigate = useNavigate();
  if(!user){
    toast.error("Login First");
    navigate("/seller/login");
  }
  const [data, setData] = useState({
    sellerId:user,
    name: '',
    description: '',
    category: '',
    price: 0,
    discount: 0,
    image: null,
    imagePreview: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
    const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    const file = event.target.files[0];
    if (file) {
      setData({
        ...data,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };


  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setFormData({
  //       ...formData,
  //       image: file,
  //       imagePreview: URL.createObjectURL(file),
  //     });
  //   }
  // };

  const handleSliderChange = (e) => {
    setData({
      ...data,
      discount: e.target.value,
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle form submission logic
  //   console.log(formData);
  // };

    const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(data)
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:5000/seller/uploadFile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload successful:', response.data.path);
      data.image = response.data.path
      console.log(data);


      axios
      .post("http://localhost:5000/seller/postItem", data)
      .then((res) => {
        if (res.data.status === true) {
          toast.success(res.data.message);
          selection.current.classList.remove("d-none")
          
        } else {
          toast.error(res.data.error);
        }
      })
      .catch((error) => {
        toast.error("An error occurred while submitting the form");
      });


    } catch (error) {
      console.error('Upload failed:', error);
    }
  };


  return (
    <div className="upload-container">
    <div ref={selection} className="selection d-none">
<div className="check">
  <h3>Do you want to add More items?</h3>
  <div><button onClick={()=>{selection.current.classList.add("d-none")}}>Yes</button><button onClick={()=>{navigate("/seller/")}}>No go to home</button></div>
</div>
    </div>
      <form className="upload-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={data.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={data.category}
            onChange={handleInputChange}
          >
            <option value="">Select Category</option>
            <option value="Salwar Kameez">Salwar Kameez</option>
 <option value="Casual Wear">Casual Wear</option>
 <option value="Party Wear">Party Wear</option>
 <option value="Bridal Wear">Bridal Wear</option>

 <option value="Pakistani Suits">Pakistani Suit</option>
 <option value="Anarkali Suits">Anarkali Suit</option>

 <option value="Straight Salwar">Straight Salwar</option>
 <option value="Kurta with plazo">Kurta With Plazo</option>
<option value="Kurtas">Kurtas </option>
 <option value="Embroidered Suits">Embroidered Suit</option>
 <option value="Sharara Suits">Sharara Suits</option>
<option value="Haldi Dresses">Haldi Dresses</option>
<option value="Mehndi Outfits">Mehndi Outfits</option>
            {/* Add more categories as needed */}
          </select>
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={data.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Discount</label>
          <input
            type="range"
            name="discount"
            min="0"
            max="100"
            value={data.discount}
            onChange={handleSliderChange}
          />
          <div className="discount-value">{data.discount}%</div>
        </div>
        <div className="form-group">
          <label>Image</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <button type="submit" className="post-button">
          Post
        </button>
      </form>
      {data.imagePreview && (
        <div className="image-details">
          <img
            src={data.imagePreview}
            alt="Item Preview"
            className="image-preview"
          />
          <div className="details-box">
            <h3>{data.name}</h3>
            <p>{data.description}</p>
            <p><b>Category:</b> {data.category}</p>
            <p><b>Price:</b>Rs. {data.price}</p>
            <p><b>Discount:</b>{data.discount}%</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadItemForm;
