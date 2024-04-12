import { setUserToken } from "@/utils/setUserToken";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import Cookies from "universal-cookie";

export async function getServerSideProps(context) {
    const cookies = new Cookies(context.req.headers.cookie);
    const userId = cookies.get("user_token");
    if (!userId) {
        return {
            props: { userIdCookie: null },
        };
    }
    return {
        props: { userIdCookie: userId },
    };
}

export default function signin({ userIdCookie }) {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState(1);
    const [message, setMessage] = useState({ errorMsg: "", successMsg: "" });
    const router = useRouter();

    useEffect(() => {
        if (userIdCookie) {
            setStep(3);
            setTimeout(() => {
                setMessage({
                    errorMsg: "",
                    successMsg: "Redirecting you ...",
                });
            }, 500);

            setTimeout(() => {
                router.push("/users/dashboard");
            }, 800);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleVerifyEmail = async (event) => {
        event.preventDefault();
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user/signin`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                }),
            }
        );
        const data = await response.json();
        if (response.status === 200) {
            setMessage({ errorMsg: "", successMsg: data.msg });
            console.log(data);
            setStep(2);
        } else {
            console.error(`Failed with status code ${response.status}`);
            setMessage({ errorMsg: data.msg, successMsg: "" });
            setTimeout(() => {
                setMessage({
                    errorMsg: "Redirecting you to SignUp ...",
                    successMsg: "",
                });
            }, 1700);

            // Redirect to dashboard
            setTimeout(() => {
                router.push("/users/signup");
            }, 2500);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user/signin/verify`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    otp: otp,
                }),
            }
        );
        const data = await response.json();
        if (response.status === 200) {
            setMessage({ errorMsg: "", successMsg: data.msg });
            console.log(data);
            setStep(3);

            setUserToken(data.user_id);
        } else {
            console.error(`Failed with status code ${response.status}`);
            setMessage({ errorMsg: data.msg, successMsg: "" });
        }
    };

    return (
        <div className="m-2">
            <FiArrowLeft
                onClick={() => router.push("/")}
                size={24}
                className="cursor-pointer"
            />
          <div className="text-center text-3xl font-bold">Signin Page</div>

            <div className="max-w-3xl mx-auto mt-10">
                <div className="flex items-center justify-center">
                    {/* <div
                        className={`w-full h-24 lg:h-fit ${
                            step === 1 ? `font-medium` : ``
                        }`}
                    >
                        <div
                            className={`h-full border-2 rounded-l-lg px-5 py-2 ${
                                step >= 1
                                    ? `text-white bg-[color:var(--darker-secondary-color)] border-r-white border-[color:var(--darker-secondary-color)]`
                                    : `border-[color:var(--darker-secondary-color)] border-dashed`
                            }`}
                        >
                            <div>01</div>
                            Verify Email
                        </div>
                    </div> */}

                    {/* <div
                        className={`w-full h-24 lg:h-fit ${
                            step === 2 ? `font-medium` : ``
                        }`}
                    >
                        <div
                            className={`h-full border-2 border-l-0 px-5 py-2 ${
                                step >= 2
                                    ? `text-white bg-[color:var(--darker-secondary-color)] border-r-white border-[color:var(--darker-secondary-color)]`
                                    : `border-[color:var(--darker-secondary-color)] border-dashed`
                            }`}
                        >
                            <div>02</div>
                            OTP Verification
                        </div>
                    </div>

                    <div
                        className={`w-full h-24 lg:h-fit ${
                            step === 3 ? `font-medium` : ``
                        }`}
                    >
                        <div
                            className={`h-full border-2 border-l-0 rounded-r-lg px-5 py-2 ${
                                step >= 3
                                    ? `text-white bg-[color:var(--darker-secondary-color)] border-[color:var(--darker-secondary-color)]`
                                    : `border-[color:var(--darker-secondary-color)] border-dashed`
                            }`}
                        >
                            <div>03</div>
                            Go to Dashboard!
                        </div>
                    </div> */}
                </div>

                {message.errorMsg && (
                    <h1 className="rounded p-3 my-2 bg-red-200 text-red-600 font-medium">
                        {message.errorMsg}
                    </h1>
                )}

                {message.successMsg && (
                    <h1 className="rounded p-3 my-2 bg-green-200 text-green-600 font-medium">
                        {message.successMsg}
                    </h1>
                )}

                <div className="bg-white p-5 rounded-lg mt-2">
                    {
                        step === 1 && (
                            <form onSubmit={handleVerifyEmail}>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Enter your Registered Email address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    className="bg-gray-100 p-2 mx-2 mb-4 focus:outline-none rounded-lg w-full"
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <button
                                    type="submit"
                                    className="mt-4 bg-[color:var(--darker-secondary-color)] text-white py-2 px-4 rounded hover:bg-[color:var(--secondary-color)]"
                                >
                                    Verify
                                </button>
                            </form>
                        )
                    }
                    {
                        step === 2 && (
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Enter Verification Code
                                    </label>

                                    <input
                                        type="text"
                                        id="otp"
                                        name="otp"
                                        autoComplete="none"
                                        required
                                        value={otp}
                                        className="bg-gray-100 p-2 mx-2 mb-4 focus:outline-none rounded-lg w-10/12"
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="mt-4 bg-[color:var(--darker-secondary-color)] text-white py-2 px-4 rounded hover:bg-[color:var(--secondary-color)]"
                                >
                                    Submit
                                </button>
                            </form>
                        )
                    }
                    {
                        step === 3 && (
                            <div>
                                <div className="bg-green-50 border-b border-green-400 text-green-800 text-sm p-4 flex justify-between">
                                    <div>
                                        <div className="flex items-center">
                                            <p>
                                                <span className="font-bold">
                                                    Hey there!{" "}
                                                </span>
                                                Welcome back, you are
                                                successfully signed in!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() =>
                                        router.push("/users/dashboard")
                                    }
                                    className="mt-4 bg-[color:var(--darker-secondary-color)] text-white py-2 px-4 rounded hover:bg-[color:var(--secondary-color)] transition ease-in-out"
                                >
                                    Go to your dashboard
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}