import { setAdminToken } from "@/utils/setAdminToken";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import Cookies from "universal-cookie";

export async function getServerSideProps(context) {
  const cookies = new Cookies(context.req.headers.cookie);
  const adminId = cookies.get("admin_token");
  if (!adminId) {
    return {
      props: { adminIdCookie: null },
    };
  }
  return {
    props: { adminIdCookie: adminId },
  };
}

export default function signin({ adminIdCookie }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState({ errorMsg: "", successMsg: "" });
  const router = useRouter();

  useEffect(() => {
    if (adminIdCookie) {
      setStep(2);

      setTimeout(() => {
        setMessage({
          errorMsg: "",
          successMsg: "Redirecting you ...",
        });
      }, 500);

      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 800);
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await response.json();
    if (response.status === 200) {
      setMessage({ errorMsg: "", successMsg: data.msg });
      console.log(data);
      setStep(2);

      setAdminToken(data.admin_token);
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
      <div className="text-center text-3xl font-bold">
        Admin Authentication Page
      </div>

      <div className="max-w-3xl mx-auto mt-10">
        <div className="flex items-center justify-center"></div>

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
          {step === 1 && (
            <form onSubmit={handleSubmit}>
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

              <label className="block mb-2 text-sm font-medium text-gray-700">
                Enter your Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                className="bg-gray-100 p-2 mx-2 mb-4 focus:outline-none rounded-lg w-full"
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="submit"
                className="btn text-white bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)] w-full mt-4 mb-4 sm:w-auto sm:mb-0"
              >
                Verify
              </button>
            </form>
          )}
          {step === 2 && (
            <div>
              <div className="bg-green-50 border-b border-green-400 text-green-800 text-sm p-4 flex justify-between">
                <div>
                  <div className="flex items-center">
                    <p>
                      <span className="font-bold">Hey there! </span>
                      Welcome back, you re successfully signed in!
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => router.push("/admin/dashboard")}
                className="mt-4 bg-[color:var(--darker-secondary-color)] text-white py-2 px-4 rounded hover:bg-[color:var(--secondary-color)] transition ease-in-out"
              >
                Go to your dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
