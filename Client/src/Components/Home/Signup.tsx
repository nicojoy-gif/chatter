import b1 from "../../styles/sign.png";
import { useState } from "react";
import { auth } from "../../Config/firebase";
import { useNavigate, Link } from "react-router-dom";
import logging from "../../Config/logging";
import ErrorText from "../Error";
import { useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {Helmet} from 'react-helmet'
type User = {
  fullname: string;
  userName: string;
  selects: string;
  occupation: string;
  email: string;
  passwords: string;
  confirms: string | null;
};
const getCharacterValidationError = (str: string) => {
  return `Your password must have at least 1 ${str} character`;
};
const AddUserSchema = yup.object().shape({
  fullname: yup.string().required("Fullname is required"),

  userName: yup
    .string()
    .required("Username is required")
    .test("check-username", "Username already exists", async (value) => {
      try {
        const response = await axios.get(
          `https://chattered.onrender.com/api/auth/register/${value}`
        );

        return response.data.available;
      } catch (error) {
        console.log(error);
        return false;
      }
    }),
  selects: yup.string().required("Select an option"),
  occupation: yup.string().required("Occupation is required"),
  email: yup
    .string()
    .required("Enter an email address")
    .email("Email is invalid"),
  passwords: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters")
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
  confirms: yup.string().required("confirm password"),
});
function Sign() {
  const [active, setActive] = useState<boolean>(true);
  const [registers, setRegister] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [CshowPassword, CsetShowPassword] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const CtogglePasswordVisibility = () => {
    CsetShowPassword(!CshowPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver<any>(AddUserSchema),
  });

  const activate = () => {
    setActive(!active);
  };
  const onSubmit = (data: User) => {
    console.log(JSON.stringify(data, null, 2));

    if (data.passwords === data.confirms) {
      setRegister(true);
    } else {
      setError("Please make sure your password match");
    }
    if (error !== "") setError("");
    setRegister(true);
    auth
      .createUserWithEmailAndPassword(data.email, data.passwords)
      .then((result) => {
        logging.info(result);
      })
      .catch((error) => {
        logging.error(error);
        if (error.code.includes("auth/weak-password")) {
          setError("Please enter a stronger password ");
        } else if (error.code.includes("auth/email-already-in-use")) {
          setError("Email already in use");
        } else {
          setError("Unable to register");
        }
        setRegister(false);
      });
    const handleClick = async () => {
      const user = {
        username: data.userName,
        email: data.email,
        occupation: data.occupation,
        password: data.passwords,
        fullname: data.fullname,
      };
      console.log(user);
      try {
        await axios.post("https://chattered.onrender.com/api/auth/register", user);
        navigate("/login", { state: { isNewUser: true } });

        console.log(user);
      } catch (err) {
        console.log(err);
      }
    };
    handleClick();
  };
  

  return (
    <div>
      <Helmet>
        <title>Account Signup Page </title>
        <meta name="description" content='Welcome to my Signup Page' />
      </Helmet>
      <section className="h-full w-full">
        <div className="container gap-20  grid lg:grid-cols-2  ">
          <div className="brightness-30 relative hidden lg:block  ">
            <img
              src={b1}
              alt="signup"
              className="brightness-50 w-screen  h-full relative"
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
                <div className="font-semibold flex text-sm ">
                  <div>
                    <p className="py-3">REGISTER</p>
                    <div
                      className={`w-48 h-1 cursor-pointer ${
                        active ? "bg-indigo-700" : "bg-gray-100"
                      }`}
                      onClick={activate}
                    ></div>
                  </div>
                  <div>
                    <p className="py-3 text-end">LOG IN</p>
                    <Link to="/login">
                      <div className="w-48 h-1 bg-gray-100"></div>
                    </Link>
                  </div>
                </div>
                <h2 className="font-semibold w-80 text-center text-2xl py-3">
                  Register as a Writer/Reader
                </h2>
              </header>
              <div className="block  bg-white  ">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid  gap-2 mt-4 grid-cols-2">
                    <div>
                      <label className="text-gray-600" htmlFor="fname">
                        Full name
                      </label>
                      <input
                        id="fname"
                        type="text"
                        required
                        placeholder="John"
                        {...register("fullname")}
                        className="block w-full px-5 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md  shadow-sm focus:border-blue-200 focus:outline-none focus:ring"
                      />
                      {errors.fullname && (
                        <p className="text-red-500">
                          {errors.fullname.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-gray-600" htmlFor="username">
                        Username
                      </label>
                      <input
                        id="username"
                        type="text"
                        required
                        placeholder="Username"
                        {...register("userName")}
                        className="block w-full px-5 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md  shadow-sm focus:border-blue-200 focus:outline-none focus:ring"
                      />
                      {errors.userName && (
                        <p className="text-red-500">
                          {errors.userName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid   mt-4 grid-cols-1 ">
                    <div className="">
                      <label className="text-gray-600" htmlFor="select">
                        You are joining as?
                      </label>
                      <div className="block w-full px-3 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md  shadow-sm focus:border-blue-200 focus:outline-none focus:ring">
                        <select
                          data-te-select-init
                          className="block w-full focus:outline-none "
                          {...register("selects")}
                        >
                          <option value="1">Writer</option>
                          <option value="2">Reader</option>
                          <option value="3">Both</option>
                        </select>

                        {errors.selects && <p>{errors.selects.message}</p>}
                      </div>
                    </div>
                    <div className="grid  mt-4 grid-cols-1">
                      <div>
                        <label className="text-gray-600" htmlFor="email">
                          Email Address
                        </label>

                        <input
                          id="email"
                          type="email"
                          placeholder="JohnDoe@gmail.com"
                          required
                          {...register("email")}
                          className="block w-full px-5 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md  shadow-sm focus:border-blue-200 focus:outline-none focus:ring"
                        />

                        {errors.email && (
                          <p className="text-red-500">{errors.email.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="grid  gap-2 mt-4 ">
                      <div>
                        <label className="text-gray-600" htmlFor="occupation">
                          Occupation
                        </label>
                        <input
                          id="occupation"
                          type="text"
                          required
                          placeholder="Software Engineer"
                          {...register("occupation")}
                          className="block w-full px-5 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md  shadow-sm focus:border-blue-200 focus:outline-none focus:ring"
                        />
                        {errors.occupation && (
                          <p className="text-red-500">
                            {errors.occupation.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="grid  mt-4 grid-cols-1">
                      <div>
                        <label className="text-gray-600" htmlFor="password">
                          Password
                        </label>

                        <div className="relative">
                          <div>
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
                          </div>
                          <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="........."
                            required
                            autoComplete="new-password"
                            {...register("passwords")}
                            className="block w-full px-5 py-2 cursor-pointer mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  shadow-sm focus:border-blue-200 focus:outline-none focus:ring"
                          />
                          {errors.passwords && (
                            <p className="text-red-500">
                              {errors.passwords.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="grid  mt-4 grid-cols-1">
                      <div>
                        <label className="text-gray-600" htmlFor="Cpassword">
                          Confirm password
                        </label>

                        <div className="relative">
                          <div>
                            {!CshowPassword && (
                              <svg
                                width="20"
                                height="11"
                                viewBox="0 0 20 11"
                                onClick={CtogglePasswordVisibility}
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-3 cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-3 "
                              >
                                <path
                                  d="M19.375 8.40625C19.2893 8.4551 19.1948 8.48658 19.097 8.49888C18.9991 8.51118 18.8998 8.50406 18.8047 8.47794C18.7097 8.45182 18.6207 8.4072 18.5428 8.34664C18.465 8.28608 18.3999 8.21076 18.3512 8.125L16.57 5.0125C15.5344 5.7127 14.392 6.24018 13.1875 6.57438L13.7378 9.87625C13.754 9.97346 13.7509 10.0729 13.7287 10.1689C13.7065 10.2649 13.6656 10.3556 13.6083 10.4358C13.551 10.516 13.4784 10.5841 13.3948 10.6363C13.3112 10.6884 13.2181 10.7235 13.1209 10.7397C13.0809 10.7462 13.0405 10.7497 13 10.75C12.8225 10.7497 12.6509 10.6866 12.5157 10.5717C12.3804 10.4569 12.2903 10.2978 12.2612 10.1228L11.7203 6.88094C10.5795 7.03969 9.42227 7.03969 8.28151 6.88094L7.74058 10.1228C7.71147 10.2982 7.62103 10.4575 7.48538 10.5723C7.34974 10.6872 7.1777 10.7502 6.99995 10.75C6.9585 10.7498 6.91712 10.7464 6.8762 10.7397C6.77898 10.7235 6.6859 10.6884 6.60227 10.6363C6.51864 10.5841 6.44611 10.516 6.38882 10.4358C6.33153 10.3556 6.29061 10.2649 6.26839 10.1689C6.24617 10.0729 6.24309 9.97346 6.25933 9.87625L6.81245 6.57438C5.60835 6.23912 4.46664 5.71069 3.43183 5.00969L1.6562 8.125C1.55675 8.2983 1.39252 8.425 1.19965 8.47722C1.00678 8.52943 0.801067 8.5029 0.627765 8.40344C0.454462 8.30398 0.327767 8.13976 0.27555 7.94689C0.223333 7.75402 0.249871 7.5483 0.349327 7.375L2.22433 4.09375C1.56573 3.52476 0.960125 2.89719 0.414952 2.21875C0.346964 2.14284 0.295158 2.05387 0.262698 1.95727C0.230238 1.86067 0.217804 1.75847 0.226156 1.65691C0.234507 1.55535 0.263469 1.45655 0.311273 1.36655C0.359077 1.27655 0.42472 1.19724 0.504196 1.13346C0.583672 1.06967 0.675313 1.02275 0.773525 0.995564C0.871737 0.968374 0.97446 0.961484 1.07542 0.975315C1.17639 0.989146 1.27347 1.02341 1.36075 1.07601C1.44804 1.12861 1.52368 1.19844 1.58308 1.28125C3.13933 3.20688 5.86183 5.5 9.99995 5.5C14.1381 5.5 16.8606 3.20406 18.4168 1.28125C18.4755 1.19675 18.551 1.12523 18.6386 1.07115C18.7261 1.01707 18.8238 0.98158 18.9257 0.966893C19.0275 0.952205 19.1313 0.958632 19.2306 0.985775C19.3298 1.01292 19.4224 1.06019 19.5026 1.12466C19.5828 1.18913 19.6489 1.26942 19.6968 1.36052C19.7446 1.45162 19.7732 1.5516 19.7807 1.65422C19.7883 1.75684 19.7746 1.85992 19.7406 1.95704C19.7066 2.05416 19.653 2.14324 19.5831 2.21875C19.0379 2.89719 18.4323 3.52476 17.7737 4.09375L19.6487 7.375C19.699 7.46054 19.7319 7.55521 19.7454 7.65353C19.7588 7.75186 19.7527 7.85188 19.7272 7.9478C19.7017 8.04372 19.6575 8.13364 19.597 8.21233C19.5366 8.29103 19.4611 8.35694 19.375 8.40625Z"
                                  fill="#212529"
                                />
                              </svg>
                            )}
                          </div>
                          <input
                            id="Cpassword"
                            type={CshowPassword ? "text" : "password"}
                            autoComplete="new-password"
                            required
                            placeholder="........."
                            {...register("confirms")}
                            className="block w-full px-5 cursor-pointer py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  shadow-sm focus:border-blue-200 focus:outline-none focus:ring"
                          />
                          {errors.confirms && (
                            <p className="text-red-500">
                              {errors.confirms.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="grid  mt-4 grid-cols-1">
                        <div>
                          <input
                            id="submit"
                            type="submit"
                            value="Create account"
                            disabled={registers}
                            onSubmit={() => handleSubmit(onSubmit)}
                            className="block w-full px-5 py-2 mt-3 text-center text-gray-100 font-medium pointer-cursor bg-indigo-700 rounded-md  shadow-sm focus:border-blue-200 focus:outline-none focus:ring"
                          />
                        </div>
                      </div>
                     
                      <div className="relative font-medium ">
                        <div className="mx-auto text-center">
                          
                          <ErrorText error={error} />
                        </div>
                      </div>
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

export default Sign;
