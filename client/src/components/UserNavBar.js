import UserDropdown from "@/components/UserDropdown";
import { getUserToken } from "@/utils/getUserToken";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

export default function NavBar() {
    const router = useRouter();

    const userIdCookie = getUserToken();
    const [userData, setUserData] = useState({});

    // fetch the user data as soon as the page loads
    const fetchUserData = async () => {
        // If cookie was manually removed from browser
        if (!userIdCookie) {
            console.error("No cookie found! Please signin");
            return;
            // redirect to signin
            // router.push("/users/signin");
        }
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user/details`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_token: userIdCookie,
                }),
            }
        );
        if (!response.ok)
            throw new Error(`${response.status} ${response.statusText}`);

        // User Details fetched from API `/user/details`
        try {
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error("Invalid JSON string:", error.message);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const links = [
        {
            id: 1,
            link: "/users/dashboard",
            text: "Dashboard"
        },
        {
            id: 2,
            link: "/users/past_events",
            text: "Past Events"
        },
        {
            id: 3,
            link: "#",
            text: "About Us"
        },
    ];

    return (
        <div style={{ marginTop: -32, height: 74, backgroundColor: "#f05454", position: "sticky" }} className="flex justify-between items-center w-full h-20 px-4 text-white fixed nav">
            <div
                style={{ display: "flex" }}>
                <div onClick={() => router.push("/users/dashboard")}
                >
                <img
                    src="/favicon/favicon.ico"
                    width={500}
                    height={500}
                    style={{ marginLeft: 95 }}
                    alt="Logo"
                    className="h-8 w-8"
                />
                </div>        
                <h1 style={{ fontFamily: "Courier New, Courier, monospace" }} className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 text-white-500 duration-200 link-underline">
                    <Link legacyBehavior href="/users/dashboard">
                        <a
                            className="link-underline link-underline-black"
                            style={{
                                fontFamily: "Courier New, Courier, monospace",
                                fontSize: 20,
                                padding: 10,
                                marginTop: 10,
                                color: "white",
                                fontWeight: 700,
                            }}
                        >
                            CampusConnect
                        </a>
                    </Link>
                </h1>
            </div>

            <ul style={{ alignItems: "center" }} className="hidden md:flex">
                {links.map(({ id, link, text }) => (
                    <li
                        key={id}
                        className="nav-links px-4 cursor-pointer capitalize font-medium text-white-500 hover:scale-105 hover:text-black duration-200 link-underline"
                    >
                        <Link href={link}>{text}</Link>
                    </li>
                ))}
                <UserDropdown userData={userData} />
            </ul>
        </div>
    );
}
