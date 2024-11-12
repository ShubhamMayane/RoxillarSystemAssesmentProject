const mongoose=require("mongoose");


//logic to access the variable value in .env file

const dbUrl=process.env.DB_URL;

// console.log((dbUrl));


//logic to connect the database of above url

mongoose.connect(dbUrl)
.then(()=>{

    console.log("database is connected successfully");
    
}).catch((err)=>{

    console.log("error while connecting mongodb database");
    

}); 

