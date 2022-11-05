import React from "react";
import { NavLink } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";

const AdminDashBoard = () => {
  const {
    user: { firstName, lastName, email},
  } = isAuthenticated();

  const adminLeft = () => {
    return (
      <div className="card">
        <div className="card-header bg-dark text-white">Navigation</div>
        <ul className="list-group">
          <li className="list-group-item">
            <NavLink
              to="/create/category"
              className="nav-link text-success btn"
            >
              Create Categories
            </NavLink>
          </li>
          <li className="list-group-item">
            <NavLink
              to="/categories"
              className="nav-link text-success btn"
            >
              Manage Categories
            </NavLink>
          </li>
          <li className="list-group-item">
            <NavLink
              to="/create/product"
              className="nav-link text-success btn"
            >
              Create Product
            </NavLink>
          </li>
          <li className="list-group-item">
            <NavLink to="/products" className="nav-link text-success btn">
              Manage Products
            </NavLink>
          </li>
        </ul>
      </div>
    );
  };

  const adminRight = () => {
    return (
      <div className="card mb-4">
        <h3 className="card-header text-dark">User Info</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <h4 className="badge bg-success mr-2">Name :</h4> {firstName}
          </li>
          <li className="list-group-item">
            <h4 className="badge bg-success mr-2">Surname :</h4> {lastName}
          </li>
          <li className="list-group-item">
            <h4 className="badge bg-success mr-2">Email :</h4> {email}
          </li>
          <li className="list-group-item w-25 bg-primary btn btn-primary">
            <NavLink to="/update/profile" className="nav-link">
              Update Profile
            </NavLink>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title="Welcome to Dashboard"
      description="Manage all your products"
      className="container my-5"
    >
      <div className="row bg-secondary py-5">
        <div className="col-md-3">{adminLeft()}</div>
        <div className="col-md-9">{adminRight()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
