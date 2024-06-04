const express=require('express');
const router=express.Router();
const Registration=require("../controllers/Register")
const Login=require("../controllers/Login")
const getItems=require("../controllers/getItems");
const sellerRegister = require('../controllers/SellerRegister');
const SellerLogin = require('../controllers/SellerLogin');
const postItem = require('../controllers/postItem');
const uploadFile = require('../controllers/uploadFile')
const multer = require('multer');
const path = require('path');
const addcart = require('../controllers/addcart');
const getCart = require('../controllers/getCart')
const getItem = require('../controllers/getItem');
const PlaceOrder = require('../controllers/PlaceOrder');
const getCategoryItems = require('../controllers/getCategoryItems');
const deleteCart = require('../controllers/deleteCart');
const addmeasurement = require('../controllers/addMeasurement');
const getmeasurement = require('../controllers/getMeasurements');
const addaddress = require('../controllers/addAddress');
const getaddress = require('../controllers/getAddress');
const getOrderDetail = require('../controllers/getOrderDetail');

const getSellerItems = require('../controllers/getSellerItems')
const getOrders = require('../controllers/getOrders');
const postRating = require('../controllers/postRating');
const getItemsBySearch = require('../controllers/getItemsBySearch2');
const getFeaturedItems = require('../controllers/getfeatureditems');
const getSellerOrders = require('../controllers/GetSellerOrders');
const deleteItem = require('../controllers/deleteSellerItem');
const updateItem = require('../controllers/updateItem');
const getSellerhome = require('../controllers/getsellerhome');
const changeStatus = require('../controllers/changeOrderStatus');
const verifypayment = require('../controllers/verifypayment');
const orderpayment = require('../controllers/orderpayment');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}${ext}`);
    },
  });

  
const upload = multer({ storage });



router.route("/Register").post(Registration)
router.route("/Login").post(Login)
router.route("/getItems").get(getItems)
router.route("/addcart").post(addcart);
router.route("/getCart").post(getCart)
router.route("/getItem").post(getItem)
router.route("/placeOrder").post(PlaceOrder);
router.route("/deleteCart").post(deleteCart)
router.route("/getCategoryItems").post(getCategoryItems)
router.route("/seller/registration").post(sellerRegister)
router.route("/addMeasurements").post(addmeasurement)
router.route("/postRating").post(postRating)
router.route("/getMeasurements").post(getmeasurement)
router.route("/search").post(getItemsBySearch)
router.route("/getORders").post(getOrders)
router.route("/addAddress").post(addaddress)
router.route("/getorderdetail").post(getOrderDetail)
router.route("/getAddress").post(getaddress)
router.route("/seller/uploadFile").post(upload.single('file'),uploadFile)
router.route("/getfeatureditems").get(getFeaturedItems)
router.route("/seller/postItem").post(postItem)
router.route("/seller/items").post(getSellerItems)
router.route("/seller/login").post(SellerLogin)
router.route("/seller/orders").post(getSellerOrders)
router.route("/seller/deleteitem").post(deleteItem)
router.route("/seller/updateitem").post(updateItem)
router.route("/seller/home").post(getSellerhome)
router.route("/seller/changestatus").post(changeStatus)
router.route("/verify").post(verifypayment);
router.route("/orderpayment").post(orderpayment)

module.exports=router