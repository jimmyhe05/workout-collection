import { IoIosFitness } from "react-icons/io";
import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({
    login: "", // For email or username
    password: "",
  });
  const { loading, error } = useSelector((state) => state.user); // Using Redux state for loading and error
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const validateFields = () => {
    let errors = {};
    if (formData.login.trim() === "")
      errors.login = "Please enter your email or username.";
    if (formData.password.length < 6)
      errors.password = "Password must be at least 6 characters.";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateFields();
    if (Object.keys(errors).length > 0) {
      dispatch(signInFailure(errors));
      return;
    }

    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // console.log(data);
      // console.log(res);

      if (!res.ok) {
        dispatch(
          signInFailure({
            form: data.message || "Sign-in failed. Please try again.",
          })
        );
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/"); // Redirect to the home page
    } catch (err) {
      dispatch(signInFailure(err.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-300 via-orange-400 to-red-400 p-5">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        {/* Logo */}
        <Link
          to="/"
          className="flex justify-center items-center text-2xl font-bold mb-5"
        >
          <IoIosFitness className="text-orange-500 w-8 h-8" />
          <span className="ml-2 text-gray-700 dark:text-white">
            My Workout Collection
          </span>
        </Link>

        {/* Form */}
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <Label value="Email or Username" />
            <TextInput
              type="text"
              placeholder="Enter your email or username"
              id="login"
              value={formData.login}
              onChange={handleChange}
              className={`${
                error?.login ? "border-red-500 focus:ring-red-500" : ""
              }`}
              aria-invalid={!!error?.login}
              aria-live="polite"
            />
            {error?.login && (
              <Alert color="failure" className="mt-2">
                {error.login}
              </Alert>
            )}
          </div>

          <div>
            <Label value="Password" />
            <TextInput
              type="password"
              placeholder="Enter your password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className={`${
                error?.password ? "border-red-500 focus:ring-red-500" : ""
              }`}
              aria-invalid={!!error?.password}
              aria-live="polite"
            />
            {error?.password && (
              <Alert color="failure" className="mt-2">
                {error.password}
              </Alert>
            )}
          </div>

          <Button
            gradientDuoTone="pinkToOrange"
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Logging In...</span>
              </>
            ) : (
              "Log In"
            )}
          </Button>
          <OAuth />

          {error?.form && (
            <Alert color="failure" className="mt-3">
              {error.form}
            </Alert>
          )}
        </form>

        {/* Footer */}
        <div className="mt-4 text-center">
          <p className="text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/sign-up" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
