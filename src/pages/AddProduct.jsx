// import React from 'react'
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const AddProduct = () => {
  const [products, setProducts] = useState([]);
  const initialValues = [
    "image",
    "name",
    "brand",
    "cartegory",
    "description",
    "features",
  ];

  const validationSchema = Yup.object({
    image: "",
    name: "",
    brand: "",
    cartegoy: "",
    description: "",
    features: "",
  });
  
  const handleAddProduct = async (values) => {
    const token = res.data.token
    if (!token) {
      toast.error('Token not provided')
    }
    const url = 'http://localhost:2574/admin/add-product'
    const res = await axios.post(url, values)
    const decoded = jwtDecode(token)
    if (decoded.role !== 'admin') {
      toast.error('Admin only')
    }
    setProducts(res.data)
    toast.success(res.data.message)
  };

  return (
    <div className="bg-gray-600 w-full flex justify-center align-middle">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleAddProduct}
      >
        {({ touched, errors }) => (
          <Form className="bg-white shadow w-[80%] h-[60%] rounded-lg">
            {products.map((pd) => (
              <div key={pd}>
                {pd === "image" ? (
                  <imput
                    type="file"
                    name="image"
                    placeholder="Product Image"
                    className="border rounded-lg w-full p-3"
                  />
                ) :  (
                  <Field
                    type={pd}
                    name={pd}
                    placeholder={pd}
                    className={`border p-3 rounded-lg flex ${touched[pd] && errors[pd] ? "" : ""}`}
                  />
                )}
                <ErrorMessage
                  span
                  className={`border p-2 rounded-3xl w-full ${touched[pd] && errors[pd] ? "" : ""}`}
                />
              </div>
            ))}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProduct;
