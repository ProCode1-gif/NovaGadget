import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaCheck, FaTimes } from "react-icons/fa";
import { useState } from "react";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const data = [
    {
      label: "Full Name",
      name: "fullName",
      type: "text",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
    },
    {
      label: "Phone Number",
      name: "phoneNumber",
      type: "text",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: "password",
    },
  ];

  const initialValues = {
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    agree: false,
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),

    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),

    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must contain only digits")
      .min(11, "Phone number must be 11 digits")
      .max(11, "Phone number must be 11 digits")
      .required("Phone number is required"),

    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    agree: Yup.boolean().oneOf(
      [true],
      "You must agree to the terms and conditions",
    ),
  });

  const handleSignup = async (values, { resetForm }) => {
    try {
      const res = await axios.post("http://localhost:2574/user/signup", values);

      const token = res.data.token;

      if (token) {
        localStorage.setItem("token", token);
      }

      toast.success(res.data.message);

      resetForm();
      toast.warning("Account created successfully! Redirecting to Sign In page...");

        navigate("/signin");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black p-5">
      <ToastContainer />

      <div className="p-8 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center">Create Account</h1>

        <p className="text-center text-gray-500 mb-6">Join NovaGadget today</p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSignup}
        >
          {({ values }) => {
            const password = values.password;

            const hasUppercase = /[A-Z]/.test(password);
            const hasLowercase = /[a-z]/.test(password);
            const hasNumber = /\d/.test(password);
            const hasSpecial = /[!@#$%^&*₤฿₩₹€£]/.test(password);
            const hasLength = password.length >= 8;

            return (
              <Form className="space-y-4">
                {data.map((field) => (
                  <div key={field.name}>
                    <label>{field.label}</label>

                    {field.name === "password" ? (
                      <div className="relative">
                        <Field
                          type={showPassword ? "text" : "password"}
                          name={field.name}
                          placeholder={field.label}
                          className="w-full border rounded-md p-3 mt-1 pr-10"
                        />

                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    ) : field.name === "confirmPassword" ? (
                      <div className="relative">
                        <Field
                          type={showConfirmPassword ? "text" : "password"}
                          name={field.name}
                          placeholder={field.label}
                          className="w-full border rounded-md p-3 mt-1 pr-10"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    ) : (
                      <Field
                        type={field.type}
                        name={field.name}
                        placeholder={field.label}
                        className="w-full border rounded-md p-3 mt-1"
                      />
                    )}

                    <ErrorMessage
                      name={field.name}
                      component="p"
                      className="text-red-500 text-sm"
                    />

                    {field.name === "password" && (
                      <div className="mt-3 text-sm space-y-2">
                        <p
                          className={
                            hasUppercase
                              ? "text-green-600 flex items-center"
                              : "text-red-500 flex items-center"
                          }
                        >
                          {hasUppercase ? <FaCheck /> : <FaTimes />}
                          <span className="ml-2">Uppercase Letter</span>
                        </p>

                        <p
                          className={
                            hasLowercase
                              ? "text-green-600 flex items-center"
                              : "text-red-500 flex items-center"
                          }
                        >
                          {hasLowercase ? <FaCheck /> : <FaTimes />}
                          <span className="ml-2">Lowercase Letter</span>
                        </p>

                        <p
                          className={
                            hasNumber
                              ? "text-green-600 flex items-center"
                              : "text-red-500 flex items-center"
                          }
                        >
                          {hasNumber ? <FaCheck /> : <FaTimes />}
                          <span className="ml-2">Number</span>
                        </p>

                        <p
                          className={
                            hasSpecial
                              ? "text-green-600 flex items-center"
                              : "text-red-500 flex items-center"
                          }
                        >
                          {hasSpecial ? <FaCheck /> : <FaTimes />}
                          <span className="ml-2">Special Character</span>
                        </p>

                        <p
                          className={
                            hasLength
                              ? "text-green-600 flex items-center"
                              : "text-red-500 flex items-center"
                          }
                        >
                          {hasLength ? <FaCheck /> : <FaTimes />}
                          <span className="ml-2">Minimum 8 Characters</span>
                        </p>
                      </div>
                    )}
                  </div>
                ))}

                <div className="flex items-center gap-2">
                  <Field type="checkbox" name="agree" />

                  <p className="text-sm">
                    I agree to the
                    <Link to="/terms" className="text-blue-600 ml-1">
                      Terms and Conditions
                    </Link>
                  </p>
                </div>

                <ErrorMessage
                  name="agree"
                  component="p"
                  className="text-red-500 text-sm"
                />

                <button
                  type="submit"
                  className="w-full bg-[#4F46E5] text-white p-3 rounded-md"
                >
                  Create Account
                </button>

                <p className="text-center">
                  Already have an account?
                  <Link to="/signin" className="text-blue-600 ml-2">
                    Sign In
                  </Link>
                </p>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
