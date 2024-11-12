const express=require("express");
const app =express();
const bodyParser=require("body-parser");
const cors=require("cors");

require("dotenv").config(); //to access the .env file in current folder

require("./db");
const Port= process.env.PORT || 8080; //logic to access the variable value in .env file

//to allow kontyahi port varil running applicaion(client/server) la ya server app chya code madhil api call karayalaya
app.use(cors());

const ProductsRoutes=require("./Routes/ProductsRoutes");



app.use("/api/products",ProductsRoutes);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{

    res.send("jay ganesh");
})

app.listen(Port,()=>{

    console.log("Server is running on port :"+Port);
});