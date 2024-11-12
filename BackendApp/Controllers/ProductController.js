
const productsModel=require("../Models/ProductModel");

const axios=require("axios");



//url to call below api: http://localhost:8080/api/products/fillDatabase

async function fillDatabaseFromDataSource(req,res)
{


       //logic to get data from another server and fill that data inside our database
       try
       {
               const response=await axios.get("https://s3.amazonaws.com/roxiler.com/product_transaction.json");
   
               const dataFromApi=response.data;
   
                //console.log(dataFromApi);
                
                //logic to insert all data came from api in our database
   
               //1.delete all existing documents in our stockCollection collection.
   
               let status= await productsModel.deleteMany({});
   
               if(await(status).deletedCount==0)
               {
                   console.log("collection is empty no document is available for remove");
               }
               else if(await(status).deletedCount>0)
               {
                       console.log("All documents are removed from collection");
               }
               //2.now lets fill the data returned by the api
   
               await productsModel.insertMany(dataFromApi);
   
                   //console.log("data is inserted successfully....");

                   res.status(201)
                   .json({
                       message: 'data is inserted successfully',
                       success: true
                   });
                    }
                    catch(err)
                    {
                        console.log('Error ', err);
                        res.status(500).json({
                            message: 'Errorn while initialzing a third party data in the database',
                            success: false,
                            error: err
                        })
                    }
   

}


//url to call below api is :http://localhost:8080/api/products/getProducts?page=1&limit=20&search=opna 
//where query parameter is optional

async function getAllProductTransactions(req,res)
{
    console.log("inside getAllProductTransactions()");
    
    try {
        // Get page and limit from query parameters
        let { page, limit, search } = req.query;

        // Set default values if they are not provided
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;

        // Calculate the number of documents to skip
        const skip = (page - 1) * limit; //logic to get a count of how many first documents should we skip

        // Build the search criteria
        let searchCriteria = {};
        if (search)//it means search ha query parameter defined asel tar 
            
        {
            searchCriteria = {
                
                title: {
                    $regex: search,
                    $options: 'i' // case insensitive
                }
                
            }
        }
        // Get the total number of employees for pagination info
        const totalProducts = await productsModel.countDocuments(searchCriteria);

        // Fetch the employees with pagination
        const finalProducts = await productsModel.find(searchCriteria)
            .skip(skip)
            .limit(limit)
            .sort({ id: 1 });

        // Calculate total pages
        const totalPages = Math.ceil(totalProducts / limit);

        res.status(200)
            .json({
                message: 'All Employees',
                success: true,
                data: {
                    transactions: finalProducts,
                    pagination: {
                        totalProducts,
                        currentPage: page,
                        totalPages,
                        pageSize: limit
                    }
                }
            });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
        });
    }
};




//url to call below api: http://localhost:8080/api/products/getSaleDetails?inputMonth=3

async function getSaleDetails(req, res)
{

try{
        // console.log("inside getSaleDetails");
        console.log(req.query.inputMonth);
        
        let resToClient={

            totalSaleAmount:0,
            totalSoldItems:0,
            totalNotSoldItems:0
        }


        
        // logic to get a products documents of specific month
        let data= await productsModel.find();

        // console.log(data);
    
        let month;
    
    
        let finalData = data.filter((element)=>{
    
        
    
        console.log(element.dateOfSale);
        console.log(typeof element.dateOfSale);//date
        console.log(element.dateOfSale.getMonth());


        month=element.dateOfSale.getMonth()+1;
        

        // console.log(typeof month);//month is a number
        
        // console.log(month);

        if(month==parseInt(req.query.inputMonth)) //inputMonth is a string that is why we have to parse it ti int
        {   
                return true;
        }
        else
        {
                return false;
        }
            
        });

        console.log(finalData);

        finalData.forEach((element)=>{
            if(element.sold==true)
            {
                resToClient.totalSoldItems = resToClient.totalSoldItems + 1;
                resToClient.totalSaleAmount=resToClient.totalSaleAmount+element.price;
            }
            if(element.sold==false)
            {
                resToClient.totalNotSoldItems=resToClient.totalNotSoldItems+1;
            }


        })


        //now we have got the data of specific month now we are going to 
        

            res.status(200).json({
                message: 'sale details',
                success: true,
                selectedMonth:req.query.inputMonth,
                dataOfMonth:resToClient,
                productsData:finalData 
        });

    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
        })
    }
}




//url to call below api: http://localhost:8080/api/products/getPieChartDataRange?inputMonth=6
async function getPieChartDataRangeWise(req, res)

{
        console.log("inisde pieCartData");
        
        let month = req.query.inputMonth; // The selected month (1-12)

        if (!month || isNaN(month) || month < 1 || month > 12)
        {
            return res.status(400).json({ error: 'Please provide a valid month (1-12)' });
        }

        try{
                 // Create the price ranges
                 const priceRanges = [
                    { range: '0 - 100', min: 0, max: 100 },
                    { range: '101 - 200', min: 101, max: 200 },
                    { range: '201 - 300', min: 201, max: 300 },
                    { range: '301 - 400', min: 301, max: 400 },
                    { range: '401 - 500', min: 401, max: 500 },
                    { range: '501 - 600', min: 501, max: 600 },
                    { range: '601 - 700', min: 601, max: 700 },
                    { range: '701 - 800', min: 701, max: 800 },
                    { range: '801 - 900', min: 801, max: 900 },
                    { range: '901-above', min: 901, max: Infinity }
                ];
                // Get all products within the selected month
                let data= await productsModel.find();
                
                // console.log(data);
                let finalData = data.filter((element)=>{
    
        
    
                    console.log(element.dateOfSale);
                    console.log(typeof element.dateOfSale);
                    console.log(element.dateOfSale.getMonth());


                        month=element.dateOfSale.getMonth()+1;
                        

                        // console.log(typeof month);//month is a number
                        
                        // console.log(month);

                        if(month==parseInt(req.query.inputMonth)) //inputMonth is a string that is why we have to parse it ti int
                        {   
                                return true;
                        }
                        else
                        {
                                return false;
                        }
                            
                        });

                        console.log(finalData);


                
                
                // Count the number of products in each price range
                const result = priceRanges.map(range => {

                    let arrayElemets=[];
                
                    
                    arrayElemets = finalData.filter(product =>{

                        console.log(product);
                        

                    if(product.price >= range.min && product.price <= range.max)
                    {
                        return product;
                    }
                    });
                    
            
                    return {
                    range: range.range,
                    count: arrayElemets.length
                    };
                });

                    // Return the result
                res.json(result);

        
    }catch (err) {
            console.log(err);
            res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
          })
    
    }
}



//url to call below api: http://localhost:8080/api/products/getPieChartDataCategory?inputMonth=6

async function getPieChartDataCategoryWise(req, res)

{
        console.log("inisde pieCartData");
        
        let month = req.query.inputMonth; // The selected month (1-12)

        if (!month || isNaN(month) || month < 1 || month > 12)
        {
            return res.status(400).json({ error: 'Please provide a valid month (1-12)' });
        }

        try{
                 
                // Get all products within the selected month
                let data= await productsModel.find();
                
                // console.log(data);
                let finalData = data.filter((element)=>{
    
        
    
                    // console.log(element.dateOfSale);
                    // console.log(typeof element.dateOfSale);
                    // console.log(element.dateOfSale.getMonth());


                        month=element.dateOfSale.getMonth()+1;
                        console.log(month);

                        if(month==parseInt(req.query.inputMonth)) //inputMonth is a string that is why we have to parse it ti int
                        {   
                                return true;
                        }
                        else
                        {
                                return false;
                        }
                            
                        });

                        console.log(finalData);


                
                // Aggregate the count of items per category
                const categoryCounts = finalData.reduce((acc, item) => {
                    const category = item.category;
                    acc[category] = (acc[category] || 0) + 1;
                    return acc;
                }, {});


                const result = Object.keys(categoryCounts).map(category => ({
                    category,
                    count: categoryCounts[category]
                  }));

                    // Return the result
                res.json(result);

        
    }catch (err) {
            console.log(err);
            res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
          })
    
    }
}


















//url to call below api:http://localhost:8080/api/products/getCombineData?inputMonth=6

async function combineData(req, res){
    try {

        const api1Url = `http://localhost:8080/api/products/getSaleDetails?inputMonth=${req.query.inputMonth}`
        const api2Url = `http://localhost:8080/api/products/getPieChartDataRange?inputMonth=${req.query.inputMonth}`;
        const api3Url = `http://localhost:8080/api/products/getPieChartDataCategory?inputMonth=${req.query.inputMonth}`;
        
       
       // Utility function to fetch data from an API
        const fetchData = async (url) => {
            try {
            const response = await axios.get(url);
            return response.data;
            } catch (error) {
            console.error(`Error fetching data from ${url}:`, error);
            return null;  // In case of error, return null to handle it gracefully
            }
        };
       

       
        // Fetch data from all 3 APIs concurrently
        const [dataFromApi1, dataFromApi2, dataFromApi3] = await Promise.all([
        fetchData(api1Url),
        fetchData(api2Url),
        fetchData(api3Url),
      ]);

       // Combine the data (you can adjust how you combine them based on the data structure)
    const combinedData = {
        MonthlySaleData: dataFromApi1,
        BarChartRangeData: dataFromApi2,
        PieChartCategoryData: dataFromApi3,
      };


        res.status(200)
            .json({
                message: 'Got combined data successfully',
                success: true,
                data:combinedData
            });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports={

    fillDatabaseFromDataSource,
    getAllProductTransactions,
    getSaleDetails,
    getPieChartDataRangeWise,
    getPieChartDataCategoryWise,
    combineData
    
    
}