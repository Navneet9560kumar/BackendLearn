import React, { useState } from "react";
const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    handleLogin(email, password); // ✅ now this works

    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="bg-[#1f1f1f] border border-emerald-500 shadow-lg rounded-xl p-10 w-[90%] max-w-md">
        <h2 className="text-3xl font-semibold text-center text-emerald-400 mb-8">
          Login
        </h2>
        <form onSubmit={submitHandler} className="flex flex-col space-y-6">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            placeholder="Enter your email"
            className="text-white border border-emerald-500 bg-transparent rounded-full text-lg py-3 px-5 outline-none focus:ring-2 focus:ring-emerald-400 placeholder:text-gray-400"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            placeholder="Enter your password"
            className="text-white border border-emerald-500 bg-transparent rounded-full text-lg py-3 px-5 outline-none focus:ring-2 focus:ring-emerald-400 placeholder:text-gray-400"
          />

          <button
            type="submit"
            className="bg-emerald-600 text-white font-medium py-3 rounded-full text-lg hover:bg-emerald-700 transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Don’t have an account?{" "}
          <span className="text-emerald-400 cursor-pointer hover:underline">
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
