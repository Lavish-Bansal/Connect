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
        <div style={{ marginTop: -32, height: 74, backgroundColor: "#f05454", position: "relative" }} className="flex justify-between items-center w-full h-20 px-4 text-white fixed nav">
            {/* <header className="bg-[color:var(--white-color)] fixed top-0 z-50 w-full shadow-md text-[color:var(--darker-secondary-color)]"> */}
            <div className="container mx-auto flex items-center flex-col lg:flex-row justify-between p-4">
                <div
                    onClick={() => router.push("/users/dashboard")}
                    className="flex items-center gap-x-3 cursor-pointer"
                >
                    <img
                        src="/favicon/favicon.ico"
                        width={500}
                        height={500}
                        style={{ marginLeft: 95 }}
                        alt="Logo"
                        className="h-12 w-auto object-contain"
                    />
                    <h1 className="m-2 text-black font-bold text-4xl">
                        {"CampusConnect"}
                    </h1>
                </div>
                <nav className="text-sm">
                    <ul className="flex items-center">
                        <li
                            onClick={() => router.push("/users/dashboard")}
                            className="mr-4 cursor-pointer"
                        >
                            <a>Dashboard</a>
                        </li>
                        <li
                            onClick={() =>
                                router.push("/users/past_events")
                            }
                            className="mr-4 cursor-pointer"
                        >
                            <a>Past Events</a>
                        </li>
                        <li
                            onClick={() => router.push("/")}
                            className="mr-4 cursor-pointer"
                        >
                            <a>About us</a>
                        </li>
                        <UserDropdown userData={userData}/>
                    </ul>
                </nav>
            </div>
            {/* </header> */}
        </div>
    );
}
