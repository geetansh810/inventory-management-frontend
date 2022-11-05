import React, { useEffect, useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import {
  createProduct,
  getAllCategories,
} from "./helper/adminapicall";
import JSAlert from "js-alert";

const AddProduct = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    mrp: "",
    category: "",
    categories: [],
    loading: false,
    error: false,
    createdProduct: "",
    getARedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    mrp,
    category,
    categories,
    loading,
    error,
    createdProduct,
    getARedirect,
    formData,
  } = formValues;

  const { user, token } = isAuthenticated();

  const preLoadCategories = () => {
    getAllCategories().then((data) => {
      console.log(data);
      if (data.error) {
        setFormValues({ ...formValues, error: data.error });
      } else {
        setFormValues({
          ...formValues,
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    preLoadCategories();
  }, []);

  const handleChange = (fieldName) => (event) => {
    console.log(fieldName);
    console.log(event.target.value);
    const value = event.target.value;
    formData.set(fieldName, value);
    setFormValues({
      ...formValues,
      error: false,
      [fieldName]: value,
    });
    console.log(formData);
    console.log(formValues);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setFormValues({ ...formValues, error: "", loading: true });
    console.log(formValues);
    console.log(formData);
    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setFormValues({ ...formValues, error: data.error });
        console.log(data);
        JSAlert.alert(error, "Error");
      } else {
        setFormValues({
          ...formValues,
          name: "",
          description: "",
          mrp: "",
          category: "",
          loading: false,
          createdProduct: data.name,
        });
        JSAlert.alert("Product added successfully");
      }
    });
  };

  const createProductForm = () => (
    <form className="">
      <div className="form-group my-2">
        <input
          onChange={handleChange("name")}
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group my-2">
        <textarea
          onChange={handleChange("description")}
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="d-flex justify-content-between gap-2">
        <div className="form-group my-2 flex-fill">
          <input
            onChange={handleChange("mrp")}
            type="number"
            className="form-control"
            placeholder="Price"
            value={mrp}
          />
        </div>
      </div>

      <div className="d-flex justify-content-between gap-2">
        <div className="form-group my-2 flex-fill">
          <select
            onChange={handleChange("category")}
            className="form-control"
            placeholder="Category"
          >
            <option>Category</option>
            {categories &&
              categories.map((category, index) => {
                return (
                  <option key={index} value={category._id}>
                    {category.brand}
                  </option>
                );
              })}
          </select>
        </div>

      </div>

      <div className="d-flex justify-content-between my-4">
        {goBack()}
        <button
          type="submit"
          onClick={onSubmit}
          className="btn btn-success px-4"
        >
          Create Product
        </button>
      </div>
    </form>
  );
  const goBack = () => {
    return (
      <NavLink to="/dashboard" className="btn btn-outline-warning px-5">
        Back
      </NavLink>
    );
  };

  return (
    <Base title="Add Product">
      <div className="row">
        <div className="col-md-6 offset-md-2 rounded m-auto shadow py-3 bg-secondary">{createProductForm()}</div>
      </div>
    </Base>
  );
};

export default AddProduct;
