import React, { useState, useEffect } from "react";

import Base from "../core/Base";
import { Link, NavLink } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import {
  getAllProducts,
  deleteProduct,
} from "./helper/adminapicall";
import ImageHelper from "../core/helper/ImageHelper";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllProducts().then((data) => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisProduct = (productId) => {
    deleteProduct(user._id, token, productId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
    <Base title="Welcome admin">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-outline-warning" to={`/dashboard`}>
        <span className="">Back to Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center my-3">
            Total products : {products.length}
          </h2>

          {products.map((product, index) => {
            return (
              <div
                key={index}
                className="row text-center mb-2  d-flex justify-content-center align-items-center text-center bg-secondary py-1 rounded"
              >
                <div className="col-md-8 d-flex">
                  <h3 className="text-white text-left">{product.name}</h3>
                  <div className="d-md-flex justify-content-around align-items-center bg-white text-dark w-50 rounded mx-3">
                    <h5 className="text-left">
                      <span className="badge bg-danger">MRP</span> {product.mrp}
                    </h5>
                  </div>
                </div>

                <div className="col-md-1">
                  <NavLink
                    className="btn btn-success"
                    to={`/update/product/${product._id}`}
                  >
                    <span className="">Update</span>
                  </NavLink>
                </div>
                <div className="col-md-1">
                  <button
                    onClick={() => {
                      deleteThisProduct(product._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default ManageProducts;
