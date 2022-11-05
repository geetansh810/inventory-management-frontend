import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/CartHelper";
import ImageHelper from "./helper/ImageHelper";

const Card = ({
  product,
  addToCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);

  const cardTitle = product ? product.name : "Product Name";


  return (
    <div className="product-card shadow rounded">
      <div className="product-details">
        <div className="d-flex">
          <span className="product-catagory me-3">{product.category.brand}</span>
          <h4>{product.name}</h4>
        </div>
        <div>
          <p>Discription : {addToCart && <span>{product.description} </span>}</p>
        </div>
        <div className="product-price">
          ₹{product.mrp}
        </div>
      </div>
    </div>
  );
};

export default Card;
