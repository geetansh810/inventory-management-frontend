import React from "react";
import {
  Route,
  Routes as Switch,
  BrowserRouter as Router,
} from "react-router-dom";
import PrivateRoutes from "./auth/helper/PrivateRoutes";
import Home from "./core/Home";
import AdminDashBoard from "./user/AdminDashBoard";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import ManageCategories from "./admin/ManageCategories";
import UpdateCategory from "./admin/UpdateCategory";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateProfile from "./admin/UpdateProfile";
import InventoryDashboard from "./user/InventoryDashboard";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" element={<Home />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/signin" element={<Signin />} />

        <Route
          path="/products"
          element={
            <PrivateRoutes>
              <InventoryDashboard />
            </PrivateRoutes>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoutes>
              <AdminDashBoard />
            </PrivateRoutes>
          }
        />

        <Route
          path="/create/category"
          element={
            <PrivateRoutes>
              <AddCategory />
            </PrivateRoutes>
          }
        />

        <Route
          path="/categories"
          element={
            <PrivateRoutes>
              <ManageCategories />
            </PrivateRoutes>
          }
        />

        <Route
          path="/create/product"
          element={
            <PrivateRoutes>
              <AddProduct />
            </PrivateRoutes>
          }
        />

        <Route
          path="/products"
          element={
            <PrivateRoutes>
              <ManageProducts />
            </PrivateRoutes>
          }
        />

        <Route
          path="/update/product/:productId"
          element={
            <PrivateRoutes>
              <UpdateProduct />
            </PrivateRoutes>
          }
        />

        <Route
          path="/update/category/:categoryId"
          element={
            <PrivateRoutes>
              <UpdateCategory />
            </PrivateRoutes>
          }
        />

        <Route
          path="/update/profile/"
          element={
            <PrivateRoutes>
              <UpdateProfile />
            </PrivateRoutes>
          }
        />

        <Route
          path="*"
          element={
            <div className="text-center">
              <h1 className="text-muted">Page not found</h1>
            </div>
          }
        />
      </Switch>
    </Router>
  );
}
