import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";
import { Oval } from "react-loader-spinner";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ForgotPassword() {
  const [email, setEmail] = useState("");

  const {
    forgotPassword,
    error,
    isLoading,
    resetErrorMessage,
    successMessage,
  } = useAuthStore();

  const location = useLocation();

  useEffect(() => {
    resetErrorMessage();
  }, [location.pathname]);

  async function handleForgotPassword(e) {
    e.preventDefault();

    try {
      await forgotPassword(email);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <title>Forgot Password</title>
      <div
        className="bg-gradient-to-br from-primaryBg to-secondaryBg min-h-screen text-white flex justify-center items-center
      "
      >
        <div className="bg-primaryBg py-12 rounded-3xl flex items-start flex-col px-16 shadow-[0_0_40px_rgba(34,211,238,0.24)]">
          <h1 className="text-4xl font-bold ">Forgot your password?</h1>

          <div className="flex flex-col gap-5 mt-10 mb-2 items-end w-full">
            <input
              placeholder="Enter your email"
              className="bg-secondaryBg text-textMain placeholder:text-textMuted w-full p-3 rounded-2xl text-base"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
          {successMessage && (
            <p className="text-emerald-500 font-semibold mt-2">
              {successMessage}
            </p>
          )}

          <div className="w-full text-center">
            <button
              disabled={isLoading}
              className="bg-accentBlue w-full font-semibold py-3 mt-3 rounded-2xl text-sm cursor-pointer flex justify-center"
              onClick={handleForgotPassword}
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
                "Request reset link"
              )}
            </button>
            <p className="mt-3">
              Go to{" "}
              <Link to="/login" className="text-accentBlue underline">
                Login Page
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
