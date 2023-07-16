import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import {Helmet} from 'react-helmet'

interface AccountProps {}

const Account: React.FunctionComponent<AccountProps> = () => {
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [github, setGithub] = useState("");
  const [LinkedIn, setLinkedIn] = useState("");
  const [isFormValid] = useState(false);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case "phone":
        setPhone(value);
        break;
      case "country":
        setCountry(value);
        break;
      case "city":
        setCity(value);
        break;
      case "github":
        setGithub(value);
        break;
      case "LinkedIn":
        setLinkedIn(value);
        break;
      default:
        break;
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      fullname: user.fullname,
      userId: user._id,
      username: user.username,
      email: user.email,
      occupation: user.occupation,
      phone,
      country,
      city,
      LinkedIn,
      github,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/profile/submitFormData",
        formData
      );

      if (response.status === 200) {
        navigate("/setting", { state: formData });
        console.log(response);
      } else {
        console.error("Failed to submit form data");
      }
    } catch (error) {
      console.error("Failed to submit form data", error);
    }
  };

  return (
    <div>
       <Helmet>
        <title>Account Profile Setting </title>
        <meta name="description" content='Welcome to my Account Profile Setting ' />
      </Helmet>
      <section>
        <form onSubmit={handleFormSubmit}>
          <div className="flex justify-center items-center w-full bg-white">
            <div className="container mx-auto my-4 px-4 lg:px-20">
              <div className="w-full p-8 my-4 md:px-12 lg:w-9/12 mx-auto rounded-2xl shadow-2xl">
                <div className="text-center">
                  <h1 className="font-bold text-3xl text-center py-3">
                    Create your Account
                  </h1>
                  <p>Lets start your writing Journey</p>
                </div>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                  <input
                    className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    type="text"
                    name="fullname"
                    placeholder="Full Name"
                    value={user.fullname}
                    onChange={handleInputChange}
                  />
                  <input
                    className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    type="text"
                    name="username"
                    placeholder="Display Name"
                    value={user.username}
                    onChange={handleInputChange}
                  />
                  <input
                    className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={handleInputChange}
                  />
                  <input
                    className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    type="text"
                    name="phone"
                    placeholder="Phone number"
                    value={phone}
                    onChange={handleInputChange}
                  />
                  <input
                    className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={country}
                    onChange={handleInputChange}
                  />
                  <input
                    className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    type="text"
                    name="city"
                    placeholder="City"
                    value={city}
                    onChange={handleInputChange}
                  />
                  <input
                    className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    type="text"
                    name="github"
                    placeholder="GitHub Profile"
                    value={github}
                    onChange={handleInputChange}
                  />
                  <input
                    className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    type="text"
                    name="LinkedIn"
                    placeholder="LinkedIn Profile"
                    value={LinkedIn}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex justify-center mt-6">
                  <button
                    className={`py-2 px-4 bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ${
                      !isFormValid && "opacity-50 cursor-not-allowed"
                    }`}
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Account;
