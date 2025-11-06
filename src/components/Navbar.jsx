import React from "react";
import { Link, NavLink } from "react-router";

const Navbar = () => {
    const links = (
        <>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/result">Result</NavLink>
            </li>
            <li>
                <NavLink to="/add-result">Add Result</NavLink>
            </li>
            <li>
                <NavLink to="/add-student">Add Student</NavLink>
            </li>
            <li>
                <NavLink to="/add-course">Add Course</NavLink>
            </li>
            <li>
                <NavLink to="/add-teacher">Add Teacher</NavLink>
            </li>
            
        </>
    );

    return (
        <div className="bg-neutral-300 shadow-sm">
            <div className="navbar max-w-7xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {" "}
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />{" "}
                            </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                        >
                            {links}
                        </ul>
                    </div>
                    <a className="text-xl font-bold">IST</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">{links}</ul>
                </div>
                <div className="navbar-end">
                    <Link to="/teacher-login" className="btn">Login Teacher</Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
