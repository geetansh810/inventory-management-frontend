import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import Card from "../core/Card";
import { getAllProducts } from "../core/helper/coreapicalls";


export default function InventoryDashboard() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    getAllProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  console.log(products);

  return (
    <Base title="Inventory Page">
      <div className="row">
        {products.map((product, index) => {
          return (
            <div className="col-md-3" key={index}>
              <Card product={product} />
            </div>
          );
        })}
      </div>
    </Base>
  );
}
