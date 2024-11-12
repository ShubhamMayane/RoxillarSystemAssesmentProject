import React from 'react'

function TransactionStatistics(props) {

    console.log(props.saledata.dataOfMonth);
   const {totalSaleAmount,totalSoldItems,totalNotSoldItems}=props.saledata.dataOfMonth;

    
  return (
    

                    
            <div className="d-flex justify-content-center mt-4 mb-5">

                    <h1>Transaction Statistics</h1>

                        <br />
                        <hr />
                        
                        <table class="table">
                                
                                <tbody>
                                <tr className="table-info">
                                    <th>Total Sale</th>
                                    <th>{

                                        new Intl.NumberFormat('en-IN', {
                                            style: 'currency',
                                            currency: 'INR',
                                        }).format(totalSaleAmount)
                                        }</th>
                                    
                                </tr>
                                <tr className="table-info">
                                    <th scope="row">Total Sold Item</th>
                                    <th>{totalSoldItems}</th>
                                    
                                </tr>
                                <tr className="table-info">
                                    <th scope="row">Total UnsoldItem</th>
                                    <th colspan="2">{totalNotSoldItems}</th>
                                
                                </tr>
                                </tbody>
                        </table>
            </div>
  )
}

export default TransactionStatistics;
