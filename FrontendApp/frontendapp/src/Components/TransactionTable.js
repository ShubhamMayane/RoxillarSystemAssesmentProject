import React from 'react'

function TransactionTable({transactions,pagination,fetchTransactions}) 
 {

   const headers = ['ID', 'Title', 'Description', 'Price', 'Category','Sold','Image'];
  let { currentPage, totalPages } =pagination;

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            handlePagination(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            handlePagination(currentPage - 1);
        }
    };
    const handlePagination = (currentPage) => {
        fetchTransactions('', currentPage, 10);//calling api using page query parameter
    }


    //logic to create a array of type numbers i.e[1,2,3,4,...,totalpages]
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        {
                            headers.map((header, i) => (
                                <th key={i}>{header}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        transactions.length === 0 ? <div> Data Not Found</div>
                            : transactions.map((item) => (
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>{item.price}</td>
                            <td>{item.category}</td>
                            <td className='col-span-2'>{item.sold?"sold out":"unsold"}</td>
                            <td> <img style={{width:"100px",}} src={item.image}/></td>
                            
                              
                        </tr>
                            ))
                    }
                </tbody>
            </table>


                    {/* pagination in front end ui code  */}
            <div className="d-flex justify-content-between align-items-center my-3">
                <span className="badge bg-primary">Page {currentPage} of {totalPages}</span>
                <div>
                    <button
                        className="btn btn-outline-primary me-2"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    {/* ui code of 1 2 3 buttons beween next and prev button  */}
                    {pageNumbers.map(page => (
                        <button
                            key={page}
                            className={`btn btn-outline-primary me-1 ${currentPage === page ? 'active' : ''}`}
                            onClick={() => handlePagination(page)}
                        >
                            {page}
                        </button>
                    ))}


                    <button
                        className="btn btn-outline-primary ms-2"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages} //tp disable this button according to condition
                    >
                        Next
                    </button>
                </div>
            </div>

        </>
  )
}

export default TransactionTable
