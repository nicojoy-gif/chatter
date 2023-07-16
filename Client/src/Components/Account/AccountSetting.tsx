import React, { useContext, useEffect, useState } from "react";
import { Link} from "react-router-dom";
import avatar from "../../styles/avatar.png";
import edit from "../../styles/edit-423.png";
import { AuthContext } from "../../context/AuthContext";
import firebase from "firebase/compat/app";
import "firebase/auth";
import axios from "axios";

interface AccountSettingProps {}
interface FormData {
  fullname: string;
  username: string;
  email: string;
  occupation: string;
  country: string;
  city: string;
  phone: string;
  github: string;
  LinkedIn: string;
}

const AccountSetting: React.FunctionComponent<AccountSettingProps> = () => {
  const storedFormData = localStorage.getItem("editedFormData");
  const editedFormDatas: FormData | null = storedFormData
    ? JSON.parse(storedFormData)
    : null;
  const [isEditing, setIsEditing] = useState(false);

  const [editedFormData, setEditedFormData] = useState<FormData | null>(
    editedFormDatas
  );
  const [editedBlock, setEditedBlock] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchFormData();
  });

  const fetchFormData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/profile/fetchSubmittedData/${user._id}`
      );
      const data: FormData[] = response.data;
      setEditedFormData(data[0]);
      console.log(editedFormData);
      console.log(editedFormData?.occupation);
    } catch (error) {
      console.error("Failed to fetch submitted form data:", error);
    }
  };

  const handleEditClick = (blockName: string) => {
    setIsEditing(true);
    setEditedBlock(blockName);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    localStorage.setItem("editedFormData", JSON.stringify(editedFormData));
    setIsEditing(false);
  };

  

  const handleDeleteAccount = async () => {
    try {
      await firebase.auth().currentUser?.delete();
      const response = await fetch(
        `http://localhost:5000/api/users/${user._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user._id,
            isAdmin: false,
          }),
        }
      );

      if (response.ok) {
        console.log("Account deleted successfully");
      } else {
        console.error("Account deletion failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {editedFormData ? (
        <div className="flex justify-center items-center w-full bg-white">
          <div className="container mx-auto my-4 px-4">
            <div className="p-8 my-4  lg:w-9/12 w-full mx-auto rounded-2xl shadow-2xl">
              <div className="">
                <div className="grid lg:grid-cols-[15vw_minmax(100vw,_1fr)_80vw] grid-cols-1">
                  <div className="lg:border-r border-gray-200 ">
                    <ul className="list-style-none text-gray-600 my-5 mx-5 lg:mxfont-medium lg:space-y-6">
                      <li>
                        <Link to="/">My Profile</Link>
                      </li>
                      <li>
                        <Link to="/">Notification</Link>
                      </li>
                      <li>
                        <Link to="/dash">Posts</Link>
                      </li>
                      <li>
                        <button onClick={handleDeleteAccount}>
                          Delete Account
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="mx-5 lg:w-1/2 w-full">
                    <h2 className="font-bold text-2xl py-3 ">My Profile</h2>
                    <div className="border border-gray-100 rounded-2xl my-2">
                      <div className="flex m-4 justify-between content-center">
                        <div className="lg:flex ">
                          <div className="w-14 rounded-full h-14 mr-3">
                            <img
                              src={avatar}
                              alt="profile"
                              className="rounded-full"
                            />
                          </div>
                          <div className="text-gray-500 fnt-medium">
                            <>
                              <h3 className="text-black">
                                {editedFormData.fullname}
                              </h3>
                              <p>{editedFormData.occupation}</p>
                              <p>
                                {editedFormData.city}, {editedFormData.country}
                              </p>
                            </>
                          </div>
                        </div>
                        <div className="lg:my-auto"></div>
                      </div>
                    </div>
                    <div className="border border-gray-100 rounded-2xl my-2">
                      <div className="m-4">
                        <div className="flex justify-between">
                          <h3 className="font-semibold">
                            Personal Information
                          </h3>
                          {isEditing && editedBlock === "personalInfo" ? (
                            <button
                              className="border flex content-center rounded-2xl px-3 py-1 border-gray-300 text-gray-400 font-medium"
                              onClick={handleSaveClick}
                            >
                              Save
                            </button>
                          ) : (
                            <button
                              className="border flex content-center rounded-2xl px-3 py-1 border-gray-300 text-gray-400 font-medium"
                              onClick={() => handleEditClick("personalInfo")}
                            >
                              Edit
                              <img
                                src={edit}
                                alt="editicon"
                                className="w-4 my-1 h-4"
                              />
                            </button>
                          )}
                        </div>
                        <div className="grid lg:grid-cols-2 grid-cols-1">
                          {isEditing && editedBlock === "personalInfo" ? (
                            <div>
                              <div className="flex flex-col my-2">
                                <label className="text-gray-500">
                                  Full Name
                                </label>
                                <input
                                  type="text"
                                  name="fullname"
                                  value={editedFormData.fullname}
                                  onChange={handleInputChange}
                                  className="text-sm w-1/2 border-2 p-1"
                                />
                              </div>
                              <div className="flex flex-col my-2">
                                <label className="text-gray-500">Email</label>
                                <input
                                  type="email"
                                  name="email"
                                  value={editedFormData.email}
                                  onChange={handleInputChange}
                                  className="text-sm w-1/2 border-2 p-1"
                                />
                              </div>
                              <div className="flex flex-col my-2">
                                <label className="text-gray-500">
                                  Occupation
                                </label>
                                <input
                                  type="text"
                                  name="occupation"
                                  value={editedFormData.occupation}
                                  onChange={handleInputChange}
                                  className="text-sm w-1/2 border-2 p-1"
                                />
                              </div>
                              <div className="flex flex-col my-2">
                                <label className="text-gray-500">
                                  Phone Number
                                </label>
                                <input
                                  type="tel"
                                  name="phone"
                                  value={editedFormData.phone}
                                  onChange={handleInputChange}
                                  className="text-sm w-1/2 border-2 p-1"
                                />
                              </div>
                              <div className="flex flex-col my-2">
                                <label className="text-gray-500">
                                  Display Name
                                </label>
                                <input
                                  type="text"
                                  name="Display"
                                  value={editedFormData.username}
                                  onChange={handleInputChange}
                                  className="text-sm w-1/2 border-2 p-1"
                                />
                              </div>
                            </div>
                          ) : (
                            <>
                              <ul className="list-style-none font-medium py-2">
                                <li className="text-gray-500">Full Name</li>
                                <li className="text-sm">
                                  {editedFormData.fullname}
                                </li>
                              </ul>
                              <ul className="list-style-none font-medium py-2">
                                <li className="text-gray-500">Email address</li>
                                <li className="text-sm">
                                  {editedFormData.email}
                                </li>
                              </ul>
                              <ul className="list-style-none font-medium py-2">
                                <li className="text-gray-500">Occupation</li>
                                <li className="text-sm">
                                  {editedFormData.occupation}
                                </li>
                              </ul>
                              <ul className="list-style-none font-medium py-2">
                                <li className="text-gray-500">Phone Number</li>
                                <li className="text-sm">
                                  {editedFormData.phone}
                                </li>
                              </ul>
                              <ul className="list-style-none font-medium py-2">
                                <li className="text-gray-500">Display Name</li>
                                <li className="text-sm">
                                  {editedFormData.username}
                                </li>
                              </ul>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="border border-gray-100 rounded-2xl my-2">
                      <div className="m-4">
                        <div className="flex justify-between">
                          <h3 className="font-semibold">
                            Additional Information
                          </h3>
                          {isEditing && editedBlock === "Additional" ? (
                            <button
                              className="border flex content-center rounded-2xl px-3 py-1 border-gray-300 text-gray-400 font-medium"
                              onClick={handleSaveClick}
                            >
                              Save
                            </button>
                          ) : (
                            <button
                              className="border flex content-center rounded-2xl px-3 py-1 border-gray-300 text-gray-400 font-medium"
                              onClick={() => handleEditClick("Additional")}
                            >
                              Edit
                              <img
                                src={edit}
                                alt="editicon"
                                className="w-4 my-1 h-4"
                              />
                            </button>
                          )}
                        </div>
                        <div className="grid lg:grid-cols-2 grid-cols-1">
                          {isEditing && editedBlock === "Additional" ? (
                            <div>
                              <div className="flex flex-col my-2">
                                <label className="text-gray-500">Country</label>
                                <input
                                  type="text"
                                  name="country"
                                  value={editedFormData.country}
                                  onChange={handleInputChange}
                                  className="text-sm w-1/2"
                                />
                              </div>
                              <div className="flex flex-col my-2">
                                <label className="text-gray-500">City</label>
                                <input
                                  type="text"
                                  name="city"
                                  value={editedFormData.city}
                                  onChange={handleInputChange}
                                  className="text-sm w-1/2"
                                />
                              </div>
                              <div className="flex flex-col my-2">
                                <label className="text-gray-500">
                                  Github Profile
                                </label>
                                <input
                                  type="text"
                                  name="occupation"
                                  value={editedFormData.github}
                                  onChange={handleInputChange}
                                  className="text-sm w-1/2"
                                />
                              </div>
                              <div className="flex flex-col my-2">
                                <label className="text-gray-500">
                                  LinkedIn Profile
                                </label>
                                <input
                                  type="text"
                                  name="linkedin"
                                  value={editedFormData.LinkedIn}
                                  onChange={handleInputChange}
                                  className="text-sm w-1/2"
                                />
                              </div>
                            </div>
                          ) : (
                            <>
                              <div>
                                <ul className="list-style-none font-medium py-2">
                                  <li className="text-gray-500">Country</li>
                                  <li className="text-sm">
                                    {editedFormData.country}
                                  </li>
                                </ul>
                                <ul className="list-style-none font-medium py-2">
                                  <li className="text-gray-500">City/State</li>
                                  <li className="text-sm">
                                    {editedFormData.city}
                                  </li>
                                </ul>
                              </div>
                              <div>
                                <ul className="list-style-none font-medium py-2">
                                  <li className="text-gray-500">
                                    Github Profile
                                  </li>
                                  <li className="text-sm">
                                    {editedFormData.github}
                                  </li>
                                </ul>
                                <ul className="list-style-none font-medium py-2">
                                  <li className="text-gray-500">
                                    LinkedIn Profile
                                  </li>
                                  <li className="text-sm">
                                    {editedFormData.LinkedIn}
                                  </li>
                                </ul>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No data available. Please fill out the form.</p>
      )}
    </div>
  );
};

export default AccountSetting;
