import "./css/signin.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import google from "../assets/google.svg";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSuccessMessage("Login successful!");
      console.log("Response data:", response.data);

      setTimeout(() => {
        navigate("/"); // เปลี่ยนเส้นทางไปยังหน้าที่ต้องการ เช่น /dashboard
      }, 1000);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || "An error occurred.");
      } else {
        setErrorMessage("Cannot connect to the server. Please try again.");
      }
      console.error("Error:", error.message);
    }
  }

  return (
    <div className="container2 flex justify-center items-center">
      <div className="box flex">
        <div className="form">
          <h2 className="sign-up text-center">Login</h2>
          <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Ricky@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="button-signup2 text-white mt-3">
              Login
            </button>
            {errorMessage && (
              <p className="text-red-500 mt-2">{errorMessage}</p>
            )}
            {successMessage && (
              <p className="text-green-500 mt-2">{successMessage}</p>
            )}
            <p className="mt-1">
              Don’t have an account?{" "}
              <a href="/register">
                <span className="font-bold">Register</span>
              </a>
            </p>
            <div className="google flex">
              <img src={google} width="32px" alt="google" />
              <h1 className="mt-1">Login with Google</h1>
            </div>
          </form>
        </div>
        <div className="image">
          <img
            src="https://i.pinimg.com/736x/92/5a/e7/925ae70710cfcfeef6b45f775bc229f6.jpg"
            alt="kid"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
