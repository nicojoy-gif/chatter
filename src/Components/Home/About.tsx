import React from "react";
import a2 from "../../styles/a2.png";
import vector from "../../styles/Vector.png";
import carbon from "../../styles/carbon_analytics.png";
import community from "../../styles/community.png";
import a3 from "../../styles/a6.png";
import a5 from "../../styles/a5.png";
import a4 from "../../styles/a4.png";
import a6 from "../../styles/a3.png";
import { Link } from "react-router-dom";
import Nav from "../Nav/nav";
function About() {
  return (
    <div>
      <section className="h-full ">
        <Nav />
        <div className=" grid lg:grid-cols-2 grid-cols-1  content-center my-8  ">
          <div className="m-auto w-4/5 ">
            <h2 className="font-bold text-3xl py-4">About Chatter</h2>
            <p className="text-sm font-medium py-3">
              Chatter is a multi-functional platform where authors and readers
              can have access to their own content. It aims to be a traditional
              bookworm's heaven and a blog to get access to more text based
              content. Our vision is to foster an inclusive and vibrant
              community where diversity is celebrated. We encourage
              open-mindedness and respect for all individuals, regardless of
              their backgrounds or beliefs. By promoting dialogue and
              understanding, we strive
            </p>
          </div>
          <div className="rounded-lg px-5 ">
            <img src={a2} className=" px-5" alt="chatter-workshop" />
          </div>
        </div>
        <div className="py-5 ">
          <div className="w-2/3 m-auto ">
            <h2 className="font-bold text-center text-3xl py-4">
              Why you should join chatter
            </h2>
            <p className="text-sm font-medium p-5">
              Our goal is to make writers and readers see our platform as their
              next heaven for blogging, ensuring ease in interactions,
              connecting with like-minded peers, have access to favorite content
              based on interest and able to communicate your great ideas with
              people.
            </p>
          </div>
          <div className=" grid lg:grid-cols-3  grid-cols-1 w-2/3 mx-auto content-center my-8 gap-4 ">
            <div className="border rounded border-gray-300 mx-3">
              <div className="p-3">
                <div className="bg-gray-100 h-16 rounded-full  content-center  justify-center grid   w-16">
                  <img src={carbon} alt="carbon" className=" h-6 w-6" />
                </div>
                <h3 className="font-semibold text-xl py-3">Analytics</h3>
                <p className="text-gray-600 ">
                  Analytics to track the number of views, likes and comment and
                  also analyze the performance of your articles over a period of
                  time
                </p>
              </div>
            </div>
            <div className="border rounded border-gray-300 mx-3">
              <div className="p-3">
                <div className="bg-gray-100 h-16 rounded-full  content-center  justify-center grid   w-16">
                  <img src={community} alt="community" className="  h-6 w-6" />
                </div>
                <h3 className="font-semibold text-xl py-3">
                  Social interactions
                </h3>
                <p className="text-gray-600">
                  Users on the platform can interact with posts they like,
                  comment and engage in discussions
                </p>
              </div>
            </div>
            <div className="border rounded border-gray-300 mx-3">
              <div className="p-3">
                <div className="bg-gray-100 h-16 rounded-full  content-center  justify-center grid   w-16">
                  <img src={vector} alt="vector" className=" h-6 w-6" />
                </div>
                <h3 className="font-semibold text-xl py-3">Content creation</h3>
                <p className="text-gray-600">
                  Write nice and appealing with our in-built markdown, a rich
                  text edtor
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-rose-50  h-72 flex content-center">
        <div className="flex  m-auto">
          <div className="rounded-full lg:block hidden h-54 w-54 mx-12">
            <img src={a3} alt="chatterdev" className="rounded-full" />
          </div>
          <div className="px-5 ">
            <p className="text-xs lg:w-2/3 py-3 font-medium">
              "Chatter has become an integral part of my online experience. As a
              user of this incredible blogging platform, I have discovered a
              vibrant community of individuals who are passioate about sharing
              their ideas and engaging in thoughtful discussions."
            </p>
            <p className="py-4 font-medium">
              <span className="text-xl font-semibold">
                Adebobola Muhydeen,{" "}
              </span>
              Software developer at Apple
            </p>
            <button className="bg-indigo-700 py-2 rounded-lg text-white text-sm w-28">
              <Link to="/sign"> Join chatter</Link>
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white h-96 flex content-center">
        <div className="flex  mx-16 my-auto">
          <div className="relative w-1/2 m-0 lg:block hidden">
            <div className="rounded-full h-28 w-28 ">
              <img src={a4} alt="chatterdev" className="rounded-full" />
            </div>

            <div className="rounded-full h-28 w-28  absolute left-1/2 top-1/3">
              <img src={a5} alt="chatterdev" className="rounded-full" />
            </div>

            <div className="rounded-full h-28 w-28  absolute top-3/4">
              <img src={a6} alt="chatterdev" className="rounded-full" />
            </div>
          </div>
          <div className="px-5">
            <p className="text-3xl leading-10  py-3 font-bold">
              Write, read and connect with great minds on chatter
            </p>
            <p className="py-4  font-medium text-sm">
              Share people your great ideas, and also read write-ups based on
              your interests. connect with people of same interests and goals
            </p>
            <button className="bg-indigo-700 py-2 rounded-lg text-white text-sm w-28">
              <Link to="/sign">Get started</Link>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
