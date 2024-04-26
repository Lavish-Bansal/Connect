import { getAdminToken } from "@/utils/getAdminToken";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AdminDropdown from "@/components/AdminDropdown";
import Link from "next/link";

export default function NavBar() {
    const router = useRouter();

    const adminIdCookie = getAdminToken();
    // console.log(adminIdCookie);
    const [adminData, setAdminData] = useState({});

    const fetchAdminData = async () => {
        if (!adminIdCookie) {
            console.error("No cookie found! Please authenticate");
            router.push("/admin/auth");
        }
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/admin/details`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    admin_id: adminIdCookie,
                }),
            }
        );
        if (!response.ok)
            throw new Error(`${response.status} ${response.statusText}`);

        try {
            const data = await response.json();
            setAdminData(data);
        } catch (error) {
            console.error("Invalid JSON string:", error.message);
        }
    };

    useEffect(() => {
        fetchAdminData();
    }, []);

    const links = [
        {
            id: 1,
            link: "/admin/dashboard",
            text: "Dashboard"
        },
        {
            id: 2,
            link: "#",
            text: "About Us"
        },
    ];

    return (
        <div style={{ marginTop: -32, height: 74, backgroundColor: "#f05454", position: "relative" }} className="flex justify-between items-center w-full h-20 px-4 text-white fixed nav">
            <div
                style={{ display: "flex" }}>
                <div onClick={() => router.push("/admin/dashboard")}
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
                    <Link legacyBehavior href="/admin/dashboard">
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
                <AdminDropdown adminData={adminData} />
            </ul>
        </div>
    );
}
