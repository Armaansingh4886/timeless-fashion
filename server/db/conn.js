const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/E-commerce-2024",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
}).then(()=>{
console.log('connection succesfully')
}).catch((err)=>{
    console.log(err)
})