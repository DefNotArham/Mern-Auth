import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";
import { Oval } from "react-loader-spinner";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading, resetErrorMessage } = useAuthStore();
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    resetErrorMessage();
  }, [location.pathname]);

  async function handleSignup(e) {
    e.preventDefault();

    try {
      await signup(email, password, name);
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <title>Signup</title>
      <div
        className="bg-gradient-to-br from-primaryBg to-secondaryBg min-h-screen text-white flex justify-center items-center
      "
      >
        <div className="bg-primaryBg py-12 rounded-3xl flex items-start flex-col px-16 shadow-[0_0_40px_rgba(34,211,238,0.24)]">
          <h1 className="text-4xl font-bold ">Create an account</h1>
          <div className="flex flex-col gap-5 my-10 items-center w-full">
            <input
              placeholder="Email"
              className="bg-secondaryBg text-textMain placeholder:text-textMuted w-full p-3 rounded-2xl text-base"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              placeholder="Password"
              className="bg-secondaryBg text-textMain placeholder:text-textMuted w-full p-3 rounded-2xl text-base"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <input
              placeholder="Name"
              className="bg-secondaryBg text-textMain placeholder:text-textMuted w-full p-3 rounded-2xl text-base"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}

          <div className="w-full text-center">
            <button
              disabled={isLoading}
              className="bg-accentBlue w-full font-semibold py-3 mt-3 rounded-2xl text-sm cursor-pointer flex justify-center"
              onClick={handleSignup}
            >
              {isLoading ? (
                <Oval
                  height={21}
                  width={21}
                  color="#ffff"
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="#ffff"
                  strokeWidth={2}
                  strokeWidthSecondary={2}
                />
              ) : (
                "Create an account"
              )}
            </button>
            <p className="mt-3">
              Already have an account?{" "}
              <Link to="/login" className="text-accentBlue underline">
                Log in
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
