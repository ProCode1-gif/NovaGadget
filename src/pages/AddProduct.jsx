import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const data = [
  {
    label: "Product Name",
    name: "name",
    type: "text",
  },
  {
    label: "Brand",
    name: "brand",
    type: "text",
  },
  {
    label: "Category",
    name: "category",
    type: "select",
    options: ["Smartphone", "Laptop", "Accessory"],
  },
  {
    label: "Price",
    name: "price",
    type: "number",
  },
  {
    label: "Stock",
    name: "stock",
    type: "number",
  },
  {
    label: "Description",
    name: "description",
    type: "textarea",
  },
  {
    label: "Features",
    name: "features",
    type: "textarea",
  },
];

const initialValues = {
  name: "",
  brand: "",
  category: "",
  price: "",
  stock: "",
  description: "",
  features: "",
  image: null,
};

const validationSchema = Yup.object({
  name: Yup.string().required("Product name is required"),
  brand: Yup.string().required("Brand is required"),
  category: Yup.string().required("Category is required"),
  price: Yup.number().required("Price is required"),
  stock: Yup.number().required("Stock is required"),
  description: Yup.string().required("Description is required"),
  features: Yup.string().required("Features are required"),
});

const AddProduct = () => {
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return toast.error("Token not provided");
      }

      const decodedToken = jwtDecode(token);
      if (decodedToken.role !== "admin") {
        return toast.error("You are not authorized to access this page");
      }
      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      await axios.post(
        "https://novagadget-server.onrender.com/admin/addProduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Product added successfully");
      resetForm();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center p-5">

      <ToastContainer />

      <div className="bg-black shadow-lg rounded-lg p-6 w-full max-w-xl">

        <h1 className="text-3xl font-bold text-center mb-6">
          Add Product
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-4">

              {data.map((field) => (
                <div key={field.name}>

                  <label>{field.label}</label>

                  {field.type === "textarea" ? (
                    <Field
                      as="textarea"
                      name={field.name}
                      className="w-full border rounded-md p-2"
                    />
                  ) : field.type === "select" ? (
                    <Field
                      as="select"
                      name={field.name}
                      className="w-full border rounded-md p-2"
                    >
                      <option value="">Select Category</option>

                      {field.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Field>
                  ) : (
                    <Field
                      type={field.type}
                      name={field.name}
                      placeholder={field.label}
                      className="w-full border rounded-md p-2"
                    />
                  )}

                  <ErrorMessage
                    name={field.name}
                    component="small"
                    className="text-red-500"
                  />

                </div>
              ))}

              <div>
                <label>Product Image</label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFieldValue("image", e.target.files[0])
                  }
                  className="w-full border rounded-md p-2"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700"
              >
                Add Product
              </button>

            </Form>
          )}
        </Formik>

      </div>

    </div>
  );
};

export default AddProduct;