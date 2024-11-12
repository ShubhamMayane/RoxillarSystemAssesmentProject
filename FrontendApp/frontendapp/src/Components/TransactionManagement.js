import React,{useEffect,useState}from 'react'
import TransactionTable from './TransactionTable'
import TransactionStatistics from './TransactionStatistics'
import TransactionBarChart from './TransactionBarChart'

import {BrowserRouter,Navigate,Route,Routes} from"react-router-dom";

function TransactionManagement() {
  
 
    const [transactionData, setTransactionData] = useState({
        transactions: [],
        pagination: {
            currentPage: 1,
            pageSize: 10,
            totalTransactions: 0,
            totalPages: 0
        }
        
    }); //this is the state variable to store the response from api and to pass to the EmployeeTable component to render the data of api in the table

    const [monthlyData,setMonthlyData]=useState(null);

    const [displayTable,setDisplayTable]=useState(true);

    const [date,setDate]=useState(null);



    async function fetchTransactions(search = '', page = 1, limit = 10) {
        console.log('Called fetchEmployees')
        try {
           
            const url =`https://roxillarsystemassesmentprojectbackendapp.onrender.com/api/products/getProducts?search=${search}&page=${page}&limit=${limit}`;
            const options = 
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        
            const result = await fetch(url, options);
            
            
            const { data } = await result.json(); //catching a response from api

            console.log(data);
            
            setTransactionData(data);
            console.log(transactionData);
             
    } 
    catch (err) {
        alert('Error', err);
    }
}


async function fetchMonthlyData(inputMonth=3) {
    console.log('Called fetchEmployees')

    try {
       
        const url =`https://roxillarsystemassesmentprojectbackendapp.onrender.com/api/products/getCombineData?inputMonth=${inputMonth}`;
        const options = 
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
    
        const result = await fetch(url, options);
        
        
        const { data } = await result.json(); //catching a response from api

        console.log(data);
        
        setMonthlyData(data);
        console.log(monthlyData);
         
} 
catch (err) {
    alert('Error', err);
}
}





    useEffect( () => {
         fetchTransactions();//calling this function which internally calls the api to get data from database to render it in the table when this components gets render on the broswer
    }, []);


    const handleSearch = (e) => {
        fetchTransactions(e.target.value)//calling the function which internaly calls the api according to the specific string in this input box
    }

    function handleDatePicker(e)
    {
        console.log(e.target.value);
        console.log(typeof e.target.value); //string
        let date=new Date(e.target.value);
        console.log(date.getMonth()+1);

        fetchMonthlyData(date.getMonth()+1);
        setDate(e.target.value);
        
        
    }

    function handleShowTableClick()
    {
        setDisplayTable(true);
        setMonthlyData(null);

    }

    function handleShowMonthlyDetailsClick()
    {   

        setDisplayTable(false);

    }

    

    
    return (

       


        <div className='d-flex flex-column justify-content-center align-items-center w-100 p-3'>
            <h1>Transaction Dashboard</h1>

            <div className='d-flex mb-3 '>

                <button className='btn btn-primary' style={{marginRight:"20px"}} onClick={handleShowTableClick}>Show Table</button>
                <button className='btn btn-primary' onClick={handleShowMonthlyDetailsClick}>Show Monthly Details</button>



            </div>
            <div className='w-100 d-flex justify-content-center'>

                

               
             
                
                <div className='w-80 border bg-light p-3' style={{ width: '80%' }}>


                {displayTable ? <div className='d-flex-column justify-content-between mb-3'>
                        
                        <input
                            onChange={handleSearch}
                            type="text"
                            placeholder="Search Transaction Title..."
                            className='form-control w-50 mb-3'
                        />

                       
                    
                    <TransactionTable
                        transactions={transactionData.transactions}
                        pagination={transactionData.pagination}
                        fetchTransactions={fetchTransactions}
                    /> 
                    </div>
                    :

                  
                    <div className='d-flex-column justify-content-between mb-3'>

                        <label>Select Date :</label>
                        <input
                            onChange={handleDatePicker}
                            type="date"
                            placeholder="Search Transaction Title..."
                            className='form-control w-50'
                        />
                    

                    
                    {
                        monthlyData? 
                        <TransactionStatistics 
                            saledata={monthlyData.MonthlySaleData}  
                        />:null
                    }



                    {/* code for bar chart */}

                    {
                        monthlyData? 
                        <TransactionBarChart
                            chartdata={monthlyData.BarChartRangeData}  
                            selectedDate={date}
                        />:null
                    }
                
                    </div>
                }

                        <hr />


                    

                  

                    

                   
                </div>
            </div>
            
        </div>
    );
}

export default TransactionManagement
