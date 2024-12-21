import "./css/signup.css";
import google from "../assets/google.svg";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate(); // สร้าง navigate instance

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (password !== passwordConfirm) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/register", {
        name,
        email,
        password,
        passwordConfirm,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setSuccessMessage("Registration successful!");
      console.log("Response data:", response.data);

      // เปลี่ยนหน้าไป Login หลังจากสำเร็จ
      setTimeout(() => {
        navigate("/login"); // Redirect ไปที่หน้า /login
      }, 1000); // รอ 1 วินาทีเพื่อแสดงข้อความสำเร็จ

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
    <div className="container flex justify-center items-center">
      <div className="box flex">
        <div className="form">
          <h2 className="sign-up text-center">Register</h2>
          <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <div className="mb-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Rick grimes"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
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
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="passwordConfirm"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password Confirm
              </label>
              <input
                type="password"
                id="passwordConfirm"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="button-signup text-white mt-3">
              Sign up
            </button>
            <p className="mt-1">
              Already have an account?{" "}
              <a href="/login"><span className="font-bold">Login</span></a>
            </p>
            <div className="google flex">
              <img src={google} width="32px" alt="google" />
              <h1 className="mt-1">Login with Google</h1>
            </div>
          </form>
        </div>
        <div className="image">
          <img
            src="https://i.pinimg.com/1200x/fc/df/e5/fcdfe56d7cb34be5d31e0467eff0ecd0.jpg"
            alt="kid"
          />
        </div>
      </div>
    </div>
  );
}

export default register;
