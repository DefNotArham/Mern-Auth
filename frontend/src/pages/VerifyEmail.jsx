import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";
import { Oval } from "react-loader-spinner";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function VerifyEmail() {
  const [code, setCode] = useState("");
  const [isVerified, setIsverified] = useState(false);
  const { verifyEmail, error, isLoading, resetErrorMessage } = useAuthStore();

  const location = useLocation();

  useEffect(() => {
    resetErrorMessage();
  }, [location.pathname]);

  async function handleVerify(e) {
    e.preventDefault();

    try {
      await verifyEmail(code);
      setIsverified(true);
    } catch (error) {
      console.log(error);
      setIsverified(false);
    }
  }

  return (
    <>
      <title>Verify Email</title>
      <div
        className="bg-gradient-to-br from-primaryBg to-secondaryBg min-h-screen text-white flex justify-center items-center
      "
      >
        <div className="bg-primaryBg py-12 rounded-3xl flex items-start flex-col px-16 shadow-[0_0_40px_rgba(34,211,238,0.24)]">
          <h1 className="text-4xl font-bold ">Check your email to verify</h1>
          {!isVerified ? (
            <>
              <div className="flex flex-col gap-5 mt-10 mb-2 items-end w-full">
                <input
                  placeholder="Enter your verification code"
                  className="bg-secondaryBg text-textMain placeholder:text-textMuted w-full p-3 rounded-2xl text-base"
                  type="text"
                  onChange={(e) => setCode(e.target.value)}
                  value={code}
                />
              </div>
              {error && (
                <p className="text-red-500 font-semibold mt-2">{error}</p>
              )}

              <div className="w-full text-center">
                <button
                  disabled={isLoading}
                  className="bg-accentBlue w-full font-semibold py-3 mt-3 rounded-2xl text-sm cursor-pointer flex justify-center"
                  onClick={handleVerify}
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
                    "Verify"
                  )}
                </button>
                <p className="mt-3">
                  Go to{" "}
                  <Link to="/login" className="text-accentBlue underline">
                    Login Page
                  </Link>
                </p>
              </div>
            </>
          ) : (
            <>
              <p className="text-emerald-500 my-3 mx-auto">
                Successfully verified account
              </p>
              <p className="mt-3 mx-auto">
                Go to{" "}
                <Link to="/login" className="text-accentBlue underline">
                  Login Page
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default VerifyEmail;
