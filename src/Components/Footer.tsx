import React from "react";
import { NavLink } from "react-router-dom";
function Footer() {
  return (
    <div>
      <section className="bg-rose-50 py-4  ">
        <div className=" grid lg:grid-cols-4  grid-cols-1 w-5/6 mx-auto content-center my-8 gap-8 ">
          <div>
            <NavLink className="text-3xl font-bold font-heading" to="/">
              <h1 className="text-indigo-600 font-bold">CHATTER</h1>
            </NavLink>
          </div>
          <div>
            <ul className="list-none text-sm space-y-4 font-mediun">
              <li>
                <h3 className="font-semibold text-lg ">Explore</h3>
              </li>
              <li>community</li>
              <li>Trending blogs</li>
              <li>Chatter for teams</li>
            </ul>
          </div>
          <div>
            <ul className="list-none text-sm space-y-4 font-mediun">
              <li>
                <h3 className="font-semibold text-lg ">Support</h3>
              </li>
              <li>Support docs</li>
              <li>Join slack</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <ul className="list-none text-sm space-y-4 font-mediun">
              <li>
                <h3 className="font-semibold text-lg ">Official blog</h3>
              </li>
              <li>Official blog</li>
              <li>Engineering blog</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
