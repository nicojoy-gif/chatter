import React from "react";
import Nav from "./nav";

import About from "./About";
import Footer from "./Footer";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="font-sans ">
      <section className="h-screen ">
        <div className="">
          <Nav />
        </div>
        <div className=" h-5/6  bg-blend-darken   bg-no-repeat bg-[url('/src/styles/a1.png')] bg-cover  backdrop-brightness-50">
          <div className=" h-full flex   items-center backdrop-brightness-50">
            <div className="text-white lg:ml-40 mx-5 lg:w-1/2 text-start font-sans">
              <h1 className="text-4xl py-2 font-semibold leading-10">
                Welcome to Chatter: A Haven for Text-Based Content
              </h1>
              <p className="py-2 text-lg">
                Unleash the Power of Words, Connect with Like-minded Readers{" "}
                <br />
                and Writers
              </p>
              <button className="bg-indigo-600 mt-4 p-2 text-sm rounded w-28">
                <Link to="/sign"> Get started</Link>
              </button>
            </div>
          </div>
        </div>
      </section>

      <About />
      <Footer />
    </div>
  );
}

export default Home;
