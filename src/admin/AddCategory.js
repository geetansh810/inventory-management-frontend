import React, { useState} from "react";
import { Navigate, NavLink } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { createCategory } from "./helper/adminapicall";
import JSAlert from "js-alert";

const AddCategory = () => {

  const [brand, setBrand] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleOnChange = (event) => {
    setErrorMsg(false);
    setBrand(event.target.value);
  };

  const addCategory = (event) => {
    event.preventDefault();
    setErrorMsg("");
    setSuccess(false);
    createCategory(user._id, token, { brand }).then((data) => {
      if (data.error) {
        setErrorMsg(true);
      } else {
        setBrand("");
        setErrorMsg("");
        setSuccess(true);
        JSAlert.alert("New category added").dismissIn(1000 * 1);
        setTimeout(() => {
          return <Navigate to="/dashboard" replace />;
        }, 1000);
      }
    });
  };

  const goBack = () => {
    return (
      <NavLink
        to="/dashboard"
        className="btn rounded-pill btn-outline-warning px-4"
      >
        Back
      </NavLink>
    );
  };

  const categoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <div className="lead">Enter the category</div>
          <input
            type="text"
            className="form-control my-3"
            autoFocus
            required
            placeholder="For Ex. Apple, Samsung"
            value={brand}
            onChange={handleOnChange}
          />
          <div className="d-flex justify-content-center">
            {goBack()}
            <button onClick={addCategory} className="btn btn-outline-info mx-4">
              Create Category
            </button>
          </div>
        </div>
      </form>
    );
  };

  return (
    <Base title="Create Category">
      <div className="row rounded">
        <div className="col-md-8 offset-md-2">{categoryForm()}</div>
      </div>
    </Base>
  );
};

export default AddCategory;
