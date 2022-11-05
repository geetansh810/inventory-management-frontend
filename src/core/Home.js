import React from "react";
import Base from "./Base";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <Base title="">
      <div className="row">

        <h1 className="text-center">Welcome to Inventory Management System</h1>

        <h3 className="text-center">Made in MERN Stack</h3>

        <div className="text-center d-flex flex-column align-items-center justify-content-center my-5 gap-5">
          <NavLink
            style={() => {
              return {
                fontWeight: "bold"
              };
            }}
            to="/signup"
            className="nav-link btn btn-primary w-50 p-3 text-light"
          >
            SignUp
          </NavLink>



          <NavLink
            style={() => {
              return {
                fontWeight: "bold",
              };
            }}
            to="/signin"
            className="nav-link btn btn-success w-50 p-3 text-light"
          >
            SignIn
          </NavLink>

        </div>

        <div className="my-5">
          <p> Name : Geetansh Agrawal</p>
          <p> Github : <a href="https://github.com/geetansh810" target="_blank" rel="noopener noreferrer">Link to Github</a> </p>
          <p> LinkedIn : <a href="https://www.linkedin.com/in/geetansh-agrawal-1b8a27190/" target="_blank" rel="noopener noreferrer">Link to LinkedIn</a> </p>
        </div>

      </div>
    </Base>
  );
}
