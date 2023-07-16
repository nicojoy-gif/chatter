import React from "react";
import Nav from "../Nav/nav";
import {Helmet} from 'react-helmet'
import About from "./About";
import Footer from "./Footer";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="font-sans ">
      <Helmet>
        <title>Home Page - My ChatterApp</title>
        <meta
          name="description"
          content="Welcome to my website. Learn more about our products and services."
        />
      </Helmet>
      <section className="h-screen " data-testid="main-section">
        <div className=""  data-testid="nav-component">

          <Nav  data-testid="nav-component"/>
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
<div data-testid="about-component">
      <About data-testid="about-component"/>
      </div>
      <div data-testid="footer-component" >
      <Footer data-testid="footer-component" />
    </div>
    </div>
  );
}

export default Home;
