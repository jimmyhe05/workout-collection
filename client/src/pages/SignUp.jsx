import { IoIosFitness } from "react-icons/io";
import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const validateField = (field, value) => {
    switch (field) {
      case "email":
        if (!/\S+@\S+\.\S+/.test(value)) {
          return "Please enter a valid email address.";
        }
        break;
      case "username":
        if (value.length < 3) {
          return "Username must be at least 3 characters long.";
        }
        break;
      case "password":
        if (value.length < 6) {
          return "Password must be at least 6 characters.";
        }
        break;
      default:
        return "";
    }
    return ""; // No error
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value.trim() });

    // Validate field dynamically
    const error = validateField(id, value.trim());
    setErrorMsg({ ...errorMsg, [id]: error });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {
      email: validateField("email", formData.email),
      username: validateField("username", formData.username),
      password: validateField("password", formData.password),
    };

    // Check if there are any errors
    if (Object.values(errors).some((err) => err)) {
      setErrorMsg(errors);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed. Please try again.");
      }
      setLoading(false);
      navigate("/sign-in");
    } catch (err) {
      setErrorMsg({ form: err.message });
      setLoading(false);
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
            <Label value="Email" />
            <input
              type="text"
              placeholder="Enter your email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className={`block w-full px-4 py-2 pr-10 text-gray-900 bg-gray-50 border ${
                errorMsg.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errorMsg.email && (
              <p className="text-sm text-red-500 mt-1">{errorMsg.email}</p>
            )}
          </div>

          <div>
            <Label value="Username" />
            <input
              type="text"
              placeholder="Choose a username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className={`block w-full px-4 py-2 pr-10 text-gray-900 bg-gray-50 border ${
                errorMsg.username
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errorMsg.username && (
              <p className="text-sm text-red-500 mt-1">{errorMsg.username}</p>
            )}
          </div>

          <div className="relative">
            <Label value="Password" />
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Create a password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className={`block w-full px-4 py-2 pr-10 text-gray-900 bg-gray-50 border ${
                errorMsg.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <button
              type="button"
              className="absolute top-9 right-3 flex items-center justify-center text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setPasswordVisible(!passwordVisible)}
              aria-label={passwordVisible ? "Hide password" : "Show password"}
            >
              {passwordVisible ? (
                <HiEyeOff className="w-5 h-5" />
              ) : (
                <HiEye className="w-5 h-5" />
              )}
            </button>
            {errorMsg.password && (
              <p className="text-sm text-red-500 mt-1">{errorMsg.password}</p>
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
                <span className="pl-3">Signing Up...</span>
              </>
            ) : (
              "Join Now"
            )}
          </Button>
          <OAuth />

          {errorMsg.form && (
            <Alert color="failure" className="mt-3">
              {errorMsg.form}
            </Alert>
          )}
        </form>

        {/* Footer */}
        <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
