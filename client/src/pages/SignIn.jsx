import { IoIosFitness } from "react-icons/io";
import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignIn() {
  const [formData, setFormData] = useState({
    login: "", // For email or username
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    setErrorMsg({ ...errorMsg, [e.target.id]: "" }); // Clear error on input change
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
    if (Object.keys(errors).length > 0) return setErrorMsg(errors);

    try {
      setLoading(true);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed. Please try again.");
      }
      setLoading(false);
      navigate("/home"); // Redirect to the home page
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
            <Label value="Email or Username" />
            <TextInput
              type="text"
              placeholder="Enter your email or username"
              id="login"
              value={formData.login}
              onChange={handleChange}
              className={`${
                errorMsg.login ? "border-red-500 focus:ring-red-500" : ""
              }`}
              aria-invalid={!!errorMsg.login}
              aria-live="polite"
            />
            {errorMsg.login && (
              <Alert color="failure" className="mt-2">
                {errorMsg.login}
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
                errorMsg.password ? "border-red-500 focus:ring-red-500" : ""
              }`}
              aria-invalid={!!errorMsg.password}
              aria-live="polite"
            />
            {errorMsg.password && (
              <Alert color="failure" className="mt-2">
                {errorMsg.password}
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

          {errorMsg.form && (
            <Alert color="failure" className="mt-3">
              {errorMsg.form}
            </Alert>
          )}
        </form>

        {/* Footer */}
        <div className="mt-4 text-center">
          <p className="text-sm">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
