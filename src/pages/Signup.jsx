import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { useRoutes, Link } from "react-router-dom";

const Signup = () => {
  const route = useRoutes();
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("First name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: (values) => {
      const url = "http://localhost:2574/user/signup";
      const res = axios.post(url, values);
      const token = res.data.token
      if (!token) {
        toast.error('Token not provided')
      }
      localStorage.setItem('token', token)
      toast.success(res.data.message);
      route("/signin");
    },
  });

  const data = [
    "Full Name",
    "Email",
    "Password",
    "Confirm Password",
  ];

  return (
    <div className="flex align-middle justify-center bg-[#F3F4F6] p-4 space-y-6">
      <div className="bg-[#FFFFFF] p-6 rounded-lg shadow-sm w-[50%]">
        <h2 className="text-3xl font-bold font-sans text-center capitalize">
          create account
        </h2>
        <p className="text-center text-gray-600">Join NovaGadget today</p>
        <form onSubmit={formik.handleSubmit} className="space-y-3z">
          {data.map((field) => (
            <div key={field}>
              <label htmlFor="">{field}</label>
              <input
                type={field}
                name={field}
                placeholder={field}
                value={formik.values[field]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full rounded-lg p-2 m-2 border space-y-6 ${
                  formik.touched[field] && formik.errors[field]
                    ? "is-invalid"
                    : ""
                }`}
              />
              {formik.touched[field] && formik.errors[field] && (
                <span className="text-red-500 small italic block mt-1">
                  {formik.errors[field]}
                </span>
              )}
            </div>
          ))}
          <div className="flex justify-between">
            <p>I agree to the</p>
            <Link
              to="/terms"
              className="text-blue-950 text-decoration-none ms-2"
            >
              Terms and Conditions
            </Link>
          </div>
            <button
              type="submit"
              className="bg-[#4F46E5] w-full p-3 text-lg rounded-md capitalize cursor-pointer hover:scale-101"
            >
              create account
            </button>
          <p className="text-center mt-3">
            Already have an account?
            <Link
              to="/signin"
              className="text-blue-950 text-decoration-none ms-2"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
