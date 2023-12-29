// import React from 'react'
// import trash from '../trash.svg'

// export default function Cart() {
//   return (
//     <div>
//         <div className='container m-auto mt-5 table-responsive table-responsive-sm table-reponsive-md'>
//             <table className='table table-hover'>
//                 <thead className='text-primary fs-4'>
//                     <tr>
//                         <th scope='col'>#</th>
//                         <th scope='col'>Name</th>
//                         <th scope='col'>Quantity</th>
//                         <th scope='col'>Option</th>
//                         <th scope='col'>Amount</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data.map((food, index) =>{
//                         <tr>
//                             <th scope='row'> {index+1} </th>
//                             <td> {food.name} </td>
//                             <td> {food.quantity} </td>
//                             <td> {food.size} </td>
//                             <td> {food.prize} </td>
//                         </tr>
//                     })}
//                 </tbody>
//             </table>
//         </div>
//     </div>
//   )
// }




import React from 'react'
// import { FileDownload } from "@mui/icons-material";
import { useCart, useDispatchCart } from '../components/ContextReducer';
// import { Delete } from '@mui/icons-material';
export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    )
  }
  const handleRemove = (index)=>{
    // console.log(index)
    dispatch({type:"REMOVE",key:index})
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    // console.log(data,localStorage.getItem("userEmail"),new Date())
    let response = await fetch("http://localhost:4000/api/auth/orderData", {
      credentials: 'include',
      Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });
    console.log("JSON RESPONSE:::::", response.status)
    if (response.status === 200) {
      dispatch({ type: "DROP" })
    }
  }

// const handleCheckOut = async () => {
//     let userEmail = localStorage.getItem("userEmail");
  
//     try {
//       let response = await fetch("http://localhost:4000/api/auth/orderData", {
//         credentials: 'include',
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           order_data: data,
//           email: userEmail,
//           order_date: new Date().toDateString(),
//         }),
//       });
  
//       if (response.status === 200) {
//         dispatch({ type: "DROP" });
//         console.log("Success")
//       } else {
//         // Handle errors or provide feedback to the user in case of a failed request.
//         console.error("Failed to complete the checkout.");
//       }
//     } catch (error) {
//       console.error("An error occurred while processing the checkout:", error);
//     }
//   };

  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div>

      {console.log(data)}
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className=' text-primary fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.quantity}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><button type="button" className="btn p-0 text-danger" onClick={() => handleRemove(index)}>Delete</button> </td>
                </tr>
                ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-primary mt-5 ' onClick={handleCheckOut} > Check Out </button>
        </div>
      </div>



    </div>
  )
}