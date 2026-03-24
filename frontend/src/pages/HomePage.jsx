import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";
import { Oval } from "react-loader-spinner";

function HomePage() {
  const { user, logout, isLoading } = useAuthStore();
  const navigate = useNavigate();

  async function handleLogout(e) {
    e.preventDefault();
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <title>Home</title>

      <div className="bg-gradient-to-br from-primaryBg to-secondaryBg min-h-screen text-white flex justify-center items-center">
        <div className="bg-primaryBg py-12 rounded-3xl flex items-start flex-col px-16 shadow-[0_0_40px_rgba(34,211,238,0.24)]">
          <h1 className="mx-auto font-semibold text-4xl">Dashboard</h1>
          <div className="border border-accentBlue/30 bg-secondaryBg p-7 rounded-2xl mt-5 w-full">
            <h3 className="text-2xl font-semibold text-accentBlue mb-3">
              Profile Information
            </h3>

            <p className="text-textMain">
              Name: <span className="text-white font-medium">{user.name}</span>
            </p>

            <p className="text-textMain">
              Email:{" "}
              <span className="text-white font-medium">{user.email}</span>
            </p>

            <div className="w-full flex justify-center">
              <button
                onClick={handleLogout}
                disabled={isLoading}
                className="cursor-pointer bg-red-500 hover:bg-red-600 transition w-full px-4 py-2 rounded-xl text-sm font-semibold mt-5 mx-auto"
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
                  "Log out"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
