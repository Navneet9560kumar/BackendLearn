import React, { useState } from "react";

const Login = () => {

      const [email, setEmail ] = useState("");
      const [password, setPassword ] = useState("");

  const sumbitHandler = (e) => {
    e.preventDefault(); // 🚀 page reload hone se rokta hai
    console.log("email is ", email);
    console.log("password is", password);
    
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="border-2 border-emerald-600 p-20">
        <form
          onSubmit={sumbitHandler}
          className="flex flex-col items-center justify-center "
        >
          <input
            value={email}
            
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            type="email"
            placeholder="Enter your email"
            className=" text-black border-2 bg-transparent border-emerald-600 rounded-full text-xl outline-none placeholder:text-white"
          />
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            type="password"
            placeholder="Enter your password"
            className="text-black border-2 bg-transparent border-emerald-600 rounded-full text-xl outline-none mt-[30px] placeholder:text-white"
          />
          <button className="bg-red-600 text-white py-2 rounded mt-5 hover:bg-red-700">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
