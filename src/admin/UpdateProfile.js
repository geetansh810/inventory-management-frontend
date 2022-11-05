import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { isAuthenticated, updateProfile } from '../auth/helper';
import Base from '../core/Base';
import JSAlert from "js-alert";

const UpdateProfile = () => {
    const [formValues, setFormValues] = useState({
      firstName: "",
      lastName: "",
      email: "",
      error: "",
      success: false,
    });
  
    useEffect(() => {

        const details = isAuthenticated();
        console.log(details);
        setFormValues({
            firstName: details.user.firstName,
            lastName: details.user.lastName,
            email: details.user.email,                  
        })  
    },[])

    const { firstName, lastName, email, error, success } = formValues;
  
    const handleChange = (fieldName) => (event) => {
      setFormValues({
        ...formValues,
        error: false,
        [fieldName]: event.target.value,
      });
    };
  
    const onSubmit = (event) => {
      event.preventDefault();
      setFormValues({ ...formValues, error: false });
      updateProfile({ firstName, lastName, email})
        .then((data) => {
          if (data.error) {
            setFormValues({ ...formValues, error: data.error, success: false });
          } else {
            console.log(data);
            JSAlert.alert("Profile updated successfully").dismissIn(1000 * 1);
            setFormValues({
              ...formValues,
              firstName: "",
              lastName: "",
              email: "",
              error: "",
              success: true,
            });

            const oldDetails = JSON.parse(localStorage.getItem("jwt"));
            const newDetails = {
                "token" : oldDetails.token,
                "user" : data
            }
            localStorage.setItem("jwt", JSON.stringify(newDetails));
          }
        })
        .catch(console.log("Error in signup"));
    };
  
    const successMessage = () => {
      return (
        <div
          style={{ display: success ? "" : "none", width: "max-content" }}
          className="alert alert-success ms-auto text-center"
        >
          Updated Successfully !!!!
          <br />
          <Link to="/dashboard" className="text-decoration-none fw-bold">
            Dashboard
          </Link>
        </div>
      );
    };
  
    const errorMessage = () => {
      return (
        <div
          style={{ display: error ? "" : "none", width: "max-content" }}
          className="alert alert-danger ms-auto text-center fw-bold"
        >
          Error!!!!
          <div>{error}</div>
        </div>
      );
    };
  
    const signUpForm = () => {
      return (
        <div className="row overflow-auto my-5">
          <div className="col-md-4 offset-sm-3 text-left m-auto overflow-auto">
            <form action="" className="overflow-auto">
              <div className="d-md-flex justify-content-between">
                <div className="form-group mt-4">
                  <label htmlFor="" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    onChange={handleChange("firstName")}
                    className="form-control"
                    value={firstName}
                  />
                </div>
                <div className="form-group mt-4">
                  <label htmlFor="" className="form-label ">
                    Last Name
                  </label>
                  <input
                    type="text"
                    onChange={handleChange("lastName")}
                    className="form-control"
                    value={lastName}
                  />
                </div>
              </div>
              <div className="form-group mt-4">
                <label htmlFor="" className="form-label ">
                  Email
                </label>
                <input
                  type="email"
                  onChange={handleChange("email")}
                  className="form-control"
                  value={email}
                />
              </div>
  
              <button
                className="btn btn-success btn-block mt-3 form-control"
                type="submit"
                onClick={onSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      );
    };
  
    return (
      <div>
        <Base title="Update Profile">
          {successMessage()}
          {errorMessage()}
          {signUpForm()}
        </Base>
      </div>
    );
  };
  
export default UpdateProfile