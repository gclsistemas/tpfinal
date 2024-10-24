import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/register-service";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { setUserLogged } from "../../../redux/slices/user-slice";

export const RegisterForm = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: name,
      email: email,
      password: password,
    };
    try {
      if (data.email === "" || data.name === "" || data.password === "") {
        message.info("Faltan datos.");
        return;
      }
      setIsLoading(true);
      const response = await register(data);
      console.log("respuesta del Register", response.data);
      const accessToken = response.data.backendTokens.accessToken;
      localStorage.setItem("accessToken", accessToken);
      dispatch(setUserLogged(response.data.user));
      nav("/home");
    } catch (error) {
      message.error("Credenciales invalidas");
      console.log("error at register", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className=" w-full flex flex-col gap-4 items-center"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-4 w-full">
        <input
          placeholder="name"
          type="text"
          className="border-none outline-none rounded-sm p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="user@example.com"
          type="text"
          className="border-none outline-none rounded-sm p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="*****"
          type="password"
          className="border-none outline-none rounded-sm p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-4 items-center">
        <button
          className={`bg-white px-4 py-1 rounded-md font-semibold text-blue-500 ${isLoading ? "opacity-40" : ""
            }`}
          disabled={isLoading}
        >
          {isLoading ? "cargando.." : "Registrate"}
        </button>
        {/* <p className="text-white">
          You dont have account?{" "}
          <Link to={"/register"} className="underline font-semibold">
            Register
          </Link>
        </p> */}
      </div>
    </form>
  );
}
