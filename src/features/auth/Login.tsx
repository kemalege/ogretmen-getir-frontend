import React, { useRef, useState, useEffect, ChangeEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logintexture from "../../assets/images/logintexture.jpg";
import logo from "../../assets/images/logo.svg";

import { useDispatch } from "react-redux";

import { useLoginMutation } from "./authApiSlice";
import { setCredentials } from "./authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const LOGIN_URL = "/auth/login";

const Login = () => {
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; // bu routa nerden geldiğimizi tutar ancak önceki konum bilgisi yoksa homepage'e yönlendirir

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userData = await login({ email: user, password: pwd }).unwrap(); // unwrap try-catch bloğu içinde kullanmamızı sağlar
      dispatch(setCredentials({ ...userData }));
      setUser("");
      setPwd("");
      navigate(from);
    } catch (err: any) {
      if (!err?.data) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg(err.data.message);
      }
      if (errRef.current) {
        errRef.current.focus();
      }
    }
  };

  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) =>
    setUser(e.target.value);

  const handlePwdInput = (e: ChangeEvent<HTMLInputElement>) =>
    setPwd(e.target.value);

  const content = (
    <section className="flex flex-col lg:flex-row lg:pl-128">
      <header className="flex h-24 py-2 lg:relative lg:right-96 text-neutral-600">
        <img src={logo} alt="My Image" />
      </header>
      <div className="flex lg:w-screen lg:relative">
        <img src={logintexture} className="object-cover" alt="" />

        <form
          onSubmit={handleSubmit}
          className="flex flex-col absolute inset-x-0 w-11/12 md:w-4/5 mx-auto lg:mx-0 lg:w-fit -mt-1 lg:-left-64 lg:top-40"
        >
          <h1 className="text-blue-900 font-extrabold text-5xl my-10">
            WELCOME
          </h1>
          <div className="flex flex-col p-14 bg-white shadow-lg">
            <h2 className="text-blue-900 font-extrabold text-2xl my-8 w-2/3">
              OGRETMEN-GETIR LOGIN
            </h2>
            <div
              className={errMsg? "bg-orange-100 border-orange-400 text-orange-700 p-2" : "none"}
              role="alert"
            >
              <p className="font-bold">Error</p>
              <p ref={errRef} aria-live="assertive">{errMsg}</p>
            </div>
    
            <div className="flex flex-col mr-28 mb-4">
              <label className="text-gray-400" htmlFor="username">
                Username:
              </label>
              <input
                className="text-bold text-2xl outline-0 border-b-2 border-white hover:border-b-2 hover:border-blue-900"
                type="text"
                id="username"
                ref={userRef}
                value={user}
                onChange={handleUserInput}
                // autoComplete="off"
                required
              />
            </div>
            <div className="flex flex-col mr-28 mb-4">
              <label className="text-gray-400" htmlFor="password">
                Password:
              </label>
              <input
                className="text-bold text-2xl outline-0 border-b-2 border-white hover:border-b-2 hover:border-blue-900 focus:border-b-2 focus:border-blue-900"
                type="password"
                id="password"
                onChange={handlePwdInput}
                value={pwd}
                required
              />
            </div>
          </div>
          <div className="mt-8 flex lg:flex-row justify-between items-center">
            <button className="px-12 py-3 w-40 rounded bg-sky-600 text-white hover:cursor-auto">
              {isLoading ? (
                <FontAwesomeIcon icon={faCircleNotch} spin />
              ) : (
                "SIGN IN"
              )}
            </button>
            <p className="flex items-center">
              <br />
              <span className="inline-block">
                {/*put router link here*/}
                <Link
                  to="/register"
                  className="underline underline-offset-4 font-bold font-large text-blue-900 hover:underline underline-offset-4"
                >
                  REGISTER
                </Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </section>
  );

  return content;
};

export default Login;
