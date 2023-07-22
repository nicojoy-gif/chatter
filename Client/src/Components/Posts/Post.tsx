import React, { useContext, useRef, useState } from "react";
import avatar from "../../styles/avatar.png";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import DOMPurify from "dompurify";
import TagInput from "../Tags/inputtag";
import { Helmet } from "react-helmet";

function Post() {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [file, setFile] = useState<any>(null);
  const [text, setText] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const desc = useRef<any>(null);

  const navigate = useNavigate();
  const handleTagChange = (tags: string[]) => {
    setTags(tags);
  };

  const tagSuggestions = [
    "Programming",
    "Data Science",
    "Technology",
    "Politics",
    "all",
    "health",
    "javascript",
    "software development",
    "design",
    "product design",
  ];

  const handleTextChange = (value: string) => {
    setText(value);
  };
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handlesubTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubtitle(e.target.value);
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const sanitizedDesc = DOMPurify.sanitize(desc.current?.value, {
      USE_PROFILES: { html: true },
    });
  
    const newPost = {
      userId: user?._id || "",
      desc: sanitizedDesc.replace(/(<([^>]+)>)/gi, ""),
      img: null, // Set the initial value to null
      title,
      subtitle,
      tags,
      text,
    };
  
    if (file) {
      // Handle image upload only if the file is present
      const data = new FormData();
      const fileName = file.name;
      data.append("file", file);
      data.append("name", fileName);
      newPost.img = fileName; // Set the image to the file name
      try {
        await axios.post("https://chattered.onrender.com/api/upload", data);
        navigate("/dash");
      } catch (err) {
        console.log(err);
      }
    }
  
    try {
      await axios.post("https://chattered.onrender.com/api/posts", newPost);
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <div>
      <Helmet>
        <title>Account Post Page </title>
        <meta name="description" content="Welcome to my Account Post Page " />
      </Helmet>
      <form
        className="h-screen justify-center w-full content-center "
        onSubmit={(e) => submitHandler(e)}
      >
        <div className=" rounded bg-gray-100  shadow-lg">
          <div className="flex w-96 h-16">
            <Link to="/dash">
              <svg
                clipRule="evenodd"
                fillRule="evenodd"
                height="32"
                width="32"
                strokeLinejoin="round"
                strokeMiterlimit="2"
                className="my-2 justify-start"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m12.017 1.995c5.517 0 9.997 4.48 9.997 9.998s-4.48 9.998-9.997 9.998c-5.518 0-9.998-4.48-9.998-9.998s4.48-9.998 9.998-9.998zm0 1.5c-4.69 0-8.498 3.808-8.498 8.498s3.808 8.498 8.498 8.498 8.497-3.808 8.497-8.498-3.807-8.498-8.497-8.498zm-1.528 4.715s-1.502 1.505-3.255 3.259c-.147.147-.22.339-.22.531s.073.383.22.53c1.753 1.754 3.254 3.258 3.254 3.258.145.145.335.217.526.217.192-.001.384-.074.531-.221.292-.293.294-.766.003-1.057l-1.977-1.977h6.693c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-6.693l1.978-1.979c.29-.289.287-.762-.006-1.054-.147-.147-.339-.221-.53-.222-.19 0-.38.071-.524.215z"
                  fillRule="nonzero"
                />
              </svg>
            </Link>
            <h2 className="font-bold text-center justify-center m-auto text-2xl">
              Create Post
            </h2>
          </div>
          <hr className="bg-white" />
          <div>
            <div className="bg-white  rounded-xl">
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="Add a Title"
                className="w-full text-center border border-gray-200 py-2"
              />
              <input
                type="text"
                value={subtitle}
                onChange={handlesubTitleChange}
                placeholder="Subtitle"
                className="w-full text-center py-2"
              />
              <TagInput
                placeholder="Type a tag..."
                suggestions={tagSuggestions} // Replace with your tag suggestions
                onChange={handleTagChange}
                onInputChange={(newValue: any, actionMeta: any) => {
                  // Handle tag input change here
                  console.log(newValue); // Log the current input value
                  console.log(actionMeta); // Log the action meta data
                }}
                tag={tags}
              />

              <div>
                {/* Render the selected tag */}
                <React.Fragment>
                  <h3>Selected Tags:</h3>
                  <ul>
                    {tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </React.Fragment>
              </div>

              <ReactQuill
                ref={desc}
                value={text}
                onChange={handleTextChange}
                placeholder={`What's in your mind ${user?.username || ""}?`}
                className="resize-none outline-none w-full h-64"
              />
              <div className="flex">
                {user && (
                  <img
                    className="h-10 w-12  rounded-full  "
                    src={avatar || user.profilePicture}
                    alt="profilepicture"
                  />
                )}
              </div>
              <div className="flex justify-between">
                <div className="flex">
                  <div className="flex  p-2  rounded-r-lg cursor-pointer">
                    <label htmlFor="file" className="shareOption">
                      <span className="shareOptionText">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          className="mr-2"
                        >
                          <path d="M14 9l-2.519 4-2.481-1.96-5 6.96h16l-6-9zm8-5v16h-20v-16h20zm2-2h-24v20h24v-20zm-20 6c0-1.104.896-2 2-2s2 .896 2 2c0 1.105-.896 2-2 2s-2-.895-2-2z" />
                        </svg>
                        {file ? file.name : "Select Image"}
                      </span>
                      <input
                        style={{ display: "none" }}
                        type="file"
                        id="file"
                        name="file"
                        accept=".png,.jpeg,.jpg"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFile(e.target.files?.[0])
                        }
                      />
                    </label>
                  </div>

                  <div className="flex  p-2 rounded-l-lg cursor-pointer">
                    <svg
                      width="24"
                      height="24"
                      xmlns="http://www.w3.org/2000/svg"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    >
                      <path
                        d="M14.101 24l-14.101-14.105v-9.895h9.855l14.145 14.101c-3.3 3.299-6.6 6.599-9.899 9.899zm-4.659-23h-8.442v8.481l13.101 13.105 8.484-8.484c-4.381-4.368-8.762-8.735-13.143-13.102zm-1.702 3.204c.975.976.975 2.56 0 3.536-.976.975-2.56.975-3.536 0-.976-.976-.976-2.56 0-3.536s2.56-.976 3.536 0zm-.708.707c.586.586.586 1.536 0 2.121-.585.586-1.535.586-2.121 0-.585-.585-.585-1.535 0-2.121.586-.585 1.536-.585 2.121 0z"
                        fillRule="nonzero"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex  justify-end  p-2 rounded-r-lg">
                  <svg
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  >
                    <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm-.045 17.51h-.015c-2.285 0-4.469-1.189-6.153-3.349l.789-.614c1.489 1.911 3.394 2.963 5.364 2.963h.013c1.987-.004 3.907-1.078 5.408-3.021l.791.611c-1.693 2.194-3.894 3.405-6.197 3.41zm-3.468-10.01c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm7.013 0c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z" />
                  </svg>
                </div>
              </div>
            </div>
            <hr className="bg-white" />

            <div className=" justify-end flex content-end m-3">
              <Link to="/dash">
                <button className="text-gray-500 mx-5 text-lg font-semibold">
                  Cancel
                </button>
              </Link>
              <button
                className="text-white bg-indigo-700 rounded-xl px-4 py-1"
                onSubmit={(e) => submitHandler(e)}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Post;
