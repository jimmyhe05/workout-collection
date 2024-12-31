import { IoIosFitness } from "react-icons/io";
import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
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
    if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Please enter a valid email address.";
    if (formData.username.length < 3)
      errors.username = "Username must be at least 3 characters long.";
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 bg-[length:200%_200%] animate-gradient p-5">
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
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label value="Email" />
            <TextInput
              type="text"
              placeholder="Enter your email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className={`${
                errorMsg.email ? "border-red-500 focus:ring-red-500" : ""
              }`}
              aria-invalid={!!errorMsg.email}
              aria-live="polite"
            />
            {errorMsg.email && (
              <Alert color="failure" className="mt-2">
                {errorMsg.email}
              </Alert>
            )}
          </div>

          <div>
            <Label value="Username" />
            <TextInput
              type="text"
              placeholder="Choose a username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className={`${
                errorMsg.username ? "border-red-500 focus:ring-red-500" : ""
              }`}
              aria-invalid={!!errorMsg.username}
              aria-live="polite"
            />
            {errorMsg.username && (
              <Alert color="failure" className="mt-2">
                {errorMsg.username}
              </Alert>
            )}
          </div>

          <div>
            <Label value="Password" />
            <TextInput
              type="password"
              placeholder="Create a password"
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
                <span className="pl-3">Signing Up...</span>
              </>
            ) : (
              "Join Now"
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
