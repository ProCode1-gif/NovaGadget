import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      const url = "http://localhost:2574/user/signin";
      const res = axios.post(url, values);
      const token = res.data.token
      if (!token) {
        toast.error('Token not provided')
      }
      localStorage.setItem('token', token)
      toast.success(res.data.message);
      navigate("/");
    },
  });

  const data = ["Email", "Password"];

  return (
    <div className="flex align-middle justify-center bg-[#F3F4F6] p-4">
      <div className="bg-[#FFFFFF] p-6 rounded-lg shadow-lg w-[50%] h-[70%]">
        <h2 className="text-3xl font-bold font-sans text-center capitalize">
          welcome back
        </h2>
        <p className="text-center text-gray-600 m-3 mb-5">
          Sign In to your account
        </p>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
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
                className={`w-full rounded-lg p-2 m-2 border ${
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
            <p className="text-gray-600">Remember me</p>
            <Link to="" className="text-blue-900">
              Forgot Password?
            </Link>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#4F46E5] w-full p-3 text-lg rounded-md capitalize cursor-pointer"
            >
              sign in
            </button>
          </div>
          <p className="text-center mt-3">
            Don‘t have an account?
            <Link
              to="/signin"
              className="text-blue-950 text-decoration-none ms-2"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signin;
