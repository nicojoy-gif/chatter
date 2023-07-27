import b1 from "../../styles/sign.png";
import { useContext, useState } from "react";
import { auth } from "../../Config/firebase";
import { useNavigate, Link, useLocation } from "react-router-dom";
import ErrorText from "../Error";
import { AuthContext } from "../../context/AuthContext";
import { loginCall } from "../../Apicalls";
import {Helmet} from 'react-helmet';

interface UserCredential {
  email: string;
  password: string;
}
function Login() {
  const { user, errors, dispatch } = useContext(AuthContext);
  const [active, setActive] = useState<boolean>(true);
  const [authenticate, setAuthenticate] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const isNewUser = location.state && location.state.isNewUser;

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      // Show any previous error
      setError("");
      console.log(error);
      setAuthenticate(true);
  
      const userCredential: UserCredential = {
        email: email,
        password: password,
      };
  
      // Wait for the loginCall to complete and get the result (user object or error)
      const user = await loginCall(userCredential, dispatch);
  console.log(user)
      // If login is successful, navigate to the appropriate page
      if (user) {
        if (isNewUser) {
          console.log("New user signed in");
          navigate("/onboarding");
        } else {
          console.log("Existing user signed in");
          navigate("/dash");
        }
      } else {
        // If login fails, set the error message
        setError("Unable to sign in. Please check your email and password.");
        setAuthenticate(false); // Reset authenticate state here
      }
      localStorage.setItem("authToken", user.token);
    } catch (error) {
      console.log(error);
      setError("An error occurred during login. Please try again later.");
      setAuthenticate(false); // Reset authenticate state here
    }
  };
  
  // ... (remaining code)
  
  
  const activate = () => {
    setActive(!active);
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Helmet>
        <title>Account Login Page </title>
        <meta name="description" content='Welcome to my Login Page ' />
      </Helmet>
      <section className="h-full w-full">
        <div className="container gap-20  grid lg:grid-cols-2 ">
          <div className="brightness-30 relative hidden lg:block  ">
            <img
              src={b1}
              alt="signup"
              className="brightness-50 w-screen h-full relative"
            />
            <div className="text-white absolute w-5/6 top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <h2 className="font-semibold text-2xl py-3">CHATTER</h2>
              <p className="py-3 ">
                Unleash the Power of Words, Connect with Like-minded Readers and
                Writers
              </p>
            </div>
          </div>
          <div className=" mx-5">
            <div className="mx-5 ">
              <header className="">
                <div className="font-semibold flex text-sm mb-5">
                  <div>
                    <p className="py-3">REGISTER</p>
                    <Link to="/sign">
                      <div className="w-48 h-1 bg-gray-100"></div>
                    </Link>
                  </div>
                  <div className="mb-5">
                    <p className="py-3 text-end">LOG IN</p>
                    <Link to="/login">
                      <div
                        className={`w-48 h-1 cursor-pointer ${
                          active ? "bg-indigo-700" : "bg-gray-100"
                        }`}
                        onClick={activate}
                      ></div>
                    </Link>
                  </div>
                </div>
                <h2 className="font-semibold w-80 text-center text-2xl grid m-auto py-3">
                  Welcome back
                </h2>
              </header>
              <div className="block  bg-white  ">
                <form onSubmit={handleLogin}>
                  <div className="grid   mt-4 grid-cols-1">
                    <div className="grid  mt-4 grid-cols-1">
                      <div>
                        <label className="text-gray-600" htmlFor="email">
                          Email Address
                        </label>

                        <input
                          id="email"
                          type="email"
                          value={email}
                          required
                          onChange={(event) => setEmail(event.target.value)}
                          className="block w-full px-5 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md  shadow-sm focus:border-blue-200 focus:outline-none focus:ring"
                        />
                      </div>
                    </div>
                    <div className="grid  mt-4 grid-cols-1">
                      <div>
                        <label className="text-gray-600" htmlFor="password">
                          Password
                        </label>

                        <div className="relative">
                          {!showPassword && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              onClick={togglePasswordVisibility}
                              className="w-6 h-3 cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-3"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          )}
                          <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="new-password"
                            value={password}
                            placeholder=".........."
                            required
                            onChange={(event) =>
                              setPassword(event.target.value)
                            }
                            className="block w-full px-5 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  shadow-sm focus:border-blue-200 focus:outline-none focus:ring"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid  mt-4 grid-cols-1">
                      <div>
                        <input
                          id="submit"
                          type="submit"
                          value="Login"
                          disabled={authenticate}
                         
                          className="block w-full px-5 py-2 mt-3 text-center text-gray-100 font-medium pointer-cursor bg-indigo-700 rounded-md  shadow-sm focus:border-blue-200 focus:outline-none focus:ring"
                        />
                      </div>
                      <ErrorText error={error} />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;