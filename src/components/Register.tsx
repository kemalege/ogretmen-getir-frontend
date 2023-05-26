import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState, useEffect } from "react";
import logo from "../assets/images/logo.svg";
import logintexture from "../assets/images/logintexture.jpg";
import { registerUser } from "../features/auth/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../features/auth/authApiSlice";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

const Register = () => {
  const userRef = useRef<HTMLInputElement>(null); // component yüklendiğinde focus olmayı sağlayacak
  const errRef = useRef<HTMLInputElement>(null); // hata aldığımızda buraya focus olacak ve error farkedilecek

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [role, setRole] = useState("")
  const navigate = useNavigate();
  
  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // girilen user inputun geçerliliğini kontrol ediyoruz
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    // pwd ve matchpwd senkron olarak kontrol ediliyor. match değeri de değiştiğinde kontrol edilir.
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    // gösterilen hata, user input bilgilerini değiştirmeye başladığında sıfırlanır
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; // bu routa nerden geldiğimizi tutar ancak önceki konum bilgisi yoksa homepage'e yönlendirir

  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(event.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if button enabled with JS hack
    // const v1 = USER_REGEX.test(user);
    // const v2 = PWD_REGEX.test(pwd);
    // if (!v1 || !v2) {
    //   setErrMsg("Invalid Entry");
    //   return;
    // }
    try {
      const userData = await register({ email: user, password: pwd, role: role }).unwrap(); // unwrap try-catch bloğu içinde kullanmamızı sağlar
      // console.log(userData)
      dispatch(registerUser({ ...userData }));
      navigate("/");
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUser("");
      setPwd("");
      setMatchPwd("");
    } catch (err:any) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      if (errRef.current) {
        errRef.current.focus();
      } // screen readerin errore focus olması için
    }
  };
  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="#"></a>
          </p>
        </section>
      ) : (
        <>
          <section className="flex flex-col lg:flex-row lg:pl-128">
            <header className="flex h-24 py-2 lg:relative lg:right-96 text-neutral-600">
              <img src={logo} alt="My Image" />
            </header>
            <div className="flex lg:w-screen lg:relative">
              <img src={logintexture} className="object-cover" alt="" />
              <p
                ref={errRef}
                className={
                  errMsg
                    ? "bg-pink-200 text-red-600 font-bold p-5 m-5"
                    : "hidden"
                }
              >
                {errMsg}
              </p>

              <form
                className="flex flex-col absolute inset-x-0 w-11/12 md:w-4/5 mx-auto lg:mx-0 lg:w-fit -mt-1 lg:-left-64 lg:top-40"
                onSubmit={handleSubmit}
              >
                <h1 className="text-blue-900 font-extrabold text-5xl my-10">
                  WELCOME
                </h1>
                <div className="flex flex-col p-14 bg-white shadow-lg">
                  <h2 className="text-blue-900 font-extrabold text-2xl my-8 w-2/3">
                    OGRETMEN-GETIR REGISTER
                  </h2>
                  <div className="flex flex-col mr-28 mb-4">
                    <label className="text-gray-400" htmlFor="username">
                      Username
                      <FontAwesomeIcon
                        icon={faCheck}
                        className={validName ? "text-green-400" : "hidden"}
                      />
                      <FontAwesomeIcon
                        icon={faTimes}
                        className={
                          validName || !user ? "hidden" : "text-red-500"
                        }
                      />
                    </label>
                    <input
                      className="text-bold text-2xl outline-0 border-b-2 border-white hover:border-b-2 hover:border-blue-900"
                      type="text"
                      id="username"
                      ref={userRef}
                      placeholder="Username"
                      autoComplete="off"
                      onChange={(e) => setUser(e.target.value)}
                      value={user}
                      required
                      onFocus={() => setUserFocus(true)}
                      onBlur={() => setUserFocus(false)}
                    />

                    <p
                      id="uidnote"
                      className={
                        userFocus && user && !validName ? "flex" : "hidden"
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      4 to 24 characters.
                      <br />
                      Must begin with a letter.
                      <br />
                      Letters, numbers, underscores, hyphens allowed.
                    </p>
                  </div>
                  <div className="flex flex-col mr-28 mb-4">
                    <label htmlFor="password" className="text-gray-400">
                      Password:
                      <FontAwesomeIcon
                        icon={faCheck}
                        className={validPwd ? "text-green-400" : "hidden"}
                      />
                      <FontAwesomeIcon
                        icon={faTimes}
                        className={validPwd || !pwd ? "hidden" : "text-red-500"}
                      />
                    </label>
                    <input
                      className="text-bold text-2xl outline-0 border-b-2 border-white hover:border-b-2 hover:border-blue-900 focus:border-b-2 focus:border-blue-900"
                      type="password"
                      id="password"
                      placeholder="▪▪▪▪▪▪▪"
                      onChange={(e) => setPwd(e.target.value)}
                      value={pwd}
                      required
                      onFocus={() => setPwdFocus(true)}
                      onBlur={() => setPwdFocus(false)}
                    />
                    <p
                      id="pwdnote"
                      className={pwdFocus && !validPwd ? "flex" : "hidden"}
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      8 to 24 characters.
                      <br />
                      Must include uppercase and lowercase letters, a number and
                      a special character.
                      <br />
                      Allowed special characters: <span>!</span> <span>@</span>{" "}
                      <span>#</span> <span>$</span> <span>%</span>
                    </p>
                  </div>
                  <div className="flex flex-col mr-28 mb-4">
                    <label htmlFor="confirm_pwd" className="text-gray-400">
                      Confirm Password:
                      <FontAwesomeIcon
                        icon={faCheck}
                        className={
                          validMatch && matchPwd ? "text-green-400" : "hidden"
                        }
                      />
                      <FontAwesomeIcon
                        icon={faTimes}
                        className={
                          validMatch || !matchPwd ? "hidden" : "text-red-500"
                        }
                      />
                    </label>
                    <input
                      className="text-bold text-2xl outline-0 border-b-2 border-white hover:border-b-2 hover:border-blue-900"
                      type="password"
                      id="confirm_pwd"
                      onChange={(e) => setMatchPwd(e.target.value)}
                      value={matchPwd}
                      required
                      onFocus={() => setMatchFocus(true)}
                      onBlur={() => setMatchFocus(false)}
                    />
                    <p
                      id="confirmnote"
                      className={matchFocus && !validMatch ? "" : "hidden"}
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      Must match the first password input field.
                    </p>
                  </div>
                  <div className="mb-3 -mx-2 flex items-end">
                      <div className="px-2 w-1/2">
                          <label className="text-gray-400 font-semibold text-sm mb-2">JOIN AS</label>
                          <div>
                              <select value={role} onChange={handleRoleChange} className="htmlForm-select text-gray-400 w-full py-2 mb-1 border-b border-gray-200 focus:outline-none focus:border-sky-600 transition-colors cursor-pointer">
                                  <option value="student">Student</option>
                                  <option value="instructor">Instructor</option>          
                              </select>
                          </div>
                      </div> 
                    </div>
                </div>
                <div className="mt-8 flex lg:flex-row justify-between items-center">
                  <button
                    className="px-12 py-3 rounded bg-sky-600 text-white hover:cursor-auto"
                    // disabled={
                    //   !validName || !validPwd || !validMatch ? true : false
                    // }
                  >
                    SIGN UP
                  </button>
                  <p className="flex items-center">
                    <br />
                    <span className="inline-block">
                      {/*put router link here*/}
                      <Link
                        to='/login' className="underline underline-offset-4 font-bold font-large text-blue-900 hover:underline underline-offset-4"
                      >
                        ALREADY REGISTERED ?
                      </Link>
                    </span>
                  </p>
                </div>
              </form>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Register;
