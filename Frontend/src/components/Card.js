import React, { useEffect, useRef, useState } from "react";
import { useCart, useDispatchCart } from "./ContextReducer";


export default function Card(props) {

  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();

  let options = props.options;
  let priceOptions = Object.keys(options);

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");

  const handleCart = async()=>{
    await dispatch({type:"ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, quantity: quantity, size: size})
    await console.log(data);
  }

  let finalPrice = quantity * parseInt(options[size]);

  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight:"360px" }}>  
        <img className="card-img-top" src={props.foodItem.img} alt="card-img" style={{height:"120px", objectFit:"fill"}}/>
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <div className="container w-100">
            <select className="m-2 h-100 bg-primary rounded text-white" onChange={(e)=> setQuantity(e.target.value)}>
                {Array.from(Array(6), (e,i)=>{
                    return(
                        <option key={i+1} value={i+1}>{i+1}</option>
                    )
                })}
            </select>
            <select className="m-2 h-100 bg-primary rounded text-white" ref={priceRef} onChange={(e)=> setSize(e.target.value)}>
                {priceOptions.map((data)=>{
                  return (
                    <option key={data} value={data}>{data}</option>
                  )
                })}
            </select>
            <div className="d-inline h-100 fs-5">
            ₹{finalPrice}/-
            </div>
          </div>
          <hr />
          <button className="btn btn-primary justify-center ms-2" onClick={handleCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
