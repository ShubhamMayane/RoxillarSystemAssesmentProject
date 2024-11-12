const routes=require("express").Router();



const{fillDatabaseFromDataSource}=require("../Controllers/ProductController");

const{getAllProductTransactions}=require("../Controllers/ProductController");

const{getSaleDetails}=require("../Controllers/ProductController");

const{getPieChartDataRangeWise}=require("../Controllers/ProductController");

const{getPieChartDataCategoryWise}=require("../Controllers/ProductController");


const{combineData}=require("../Controllers/ProductController");




routes.get("/fillDatabase",fillDatabaseFromDataSource);

routes.get("/getProducts",getAllProductTransactions);

routes.get("/getSaleDetails",getSaleDetails);

routes.get("/getPieChartDataRange",getPieChartDataRangeWise);

routes.get("/getPieChartDataCategory",getPieChartDataCategoryWise);

routes.get("/getCombineData",combineData);




module.exports=routes;