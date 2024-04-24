import Link from "next/link";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const [nav, setNav] = useState(false);

    const links = [
        {
            id: 1,
            link: "/admin/auth",
            text: "Event Manager"
        },
        {
            id: 2,
            link: "#",
            text: "Learn More"
        },
        {
            id: 3,
            link: "#",
            text: "About"
        },
        {
            id: 4,
            link: "/users/signup",
            text: "Register"
        },
        {
            id: 5,
            link: "/users/signin",
            text: "Log In"
        },
    ];

    return (
        <div style={{ height: 74, backgroundColor: "#f05454", zIndex: -1 }} className="flex justify-between items-center w-full h-20 px-4 text-white fixed nav">
            <div style={{ display: "flex" }}>
                <img
                    src="/favicon/favicon.ico"
                    width={500}
                    height={500}
                    style={{ marginLeft: 95 }}
                    alt="Logo"
                    className="h-8 w-8"
                />        <h1 style={{ fontFamily: "Courier New, Courier, monospace" }} className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 text-white duration-200 link-underline">
                    <a
                        className="link-underline link-underline-black"
                        style={{
                            fontFamily: "Courier New, Courier, monospace", fontSize: 20, padding: 10, marginTop: 10,
                            color: "white", fontWeight: 700,
                        }}
                        href="http://localhost:3000/"
                        // target="_blank"
                        rel="noreferrer"
                    >
                        CampusConnect
                    </a>
                </h1>
            </div>

            <ul className="hidden md:flex">
                {links.map(({ id, link, text }) => (
                    <li
                        key={id}
                        className="nav-links px-4 cursor-pointer capitalize font-medium text-white-500 hover:scale-105 hover:text-black duration-200 link-underline"
                    >
                        <Link href={link}>{text}</Link>
                    </li>
                ))}
            </ul>

            <div
                onClick={() => setNav(!nav)}
                className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
            >
                {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
            </div>

            {nav && (
                <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
                    {links.map(({ id, link }) => (
                        <li
                            key={id}
                            className="px-4 cursor-pointer capitalize py-6 text-4xl"
                        >
                            <Link onClick={() => setNav(!nav)} href={link}>
                                {link}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Navbar;
