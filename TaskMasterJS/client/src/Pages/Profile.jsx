import { FaBell, FaCog, FaSignOutAlt, FaUser, FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useUser } from "../tools/userUtils";

function Profile() {
  const { user, loading, logoutUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/Intro");
  };

  const goToLogin = () => {
    navigate("/Login");
  };

  return (
    <main className="relative bg-gradient-to-b from-gray-800 via-gray-600 to-gray-100 w-screen h-screen overflow-x-hidden text-gray-300 flex">
      {/* Sidebar */}
      <div className="hidden lg:flex lg:flex-col w-64 min-h-screen h-screen bg-gray-900 p-30 items-center shadow-lg">
        <aside className="hidden lg:flex lg:flex-col w-64 min-h-screen h-screen bg-gray-900 p-3 items-center shadow-lg">
          <div className="w-24 h-24 bg-gray-700 rounded-full mb-4"></div>
          <h2 className="text-xl font-semibold">{user ? user.name || "User" : "Guest"}</h2>
          <p className="text-gray-400 text-sm">{user ? user.email : "Not logged in"}</p>
          <nav className="mt-6 w-full">
            <ul className="space-y-4">
              <li className="flex items-center space-x-2 p-2 bg-gray-800 rounded-lg cursor-pointer">
                <FaUser /> <span>Account</span>
              </li>
              <li className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
                <FaBell /> <span>Notifications</span>
              </li>
              <li className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
                <FaCog /> <span>Preferences</span>
              </li>
              {user ? (
                <li
                  className="hover:bg-red-600 cursor-pointer ml-3 flex items-center space-x-2 justify-start py-2 rounded-lg"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </li>
              ) : (
                <li
                  onClick={goToLogin}
                  className="hover:bg-blue-600 cursor-pointer ml-3 flex items-center space-x-2 justify-start py-2 rounded-lg"
                >
                  <FaSignInAlt />
                  <span>Login</span>
                </li>
              )}
            </ul>
          </nav>
        </aside>
      </div>

      {/* Profile Content */}
      <section className="flex-1 p-2">
        <h1 className="text-2xl font-semibold mb-6">Profile</h1>
        <section className="mt-6 w-full flex justify-center mb-5">
          <div className="grid md:flex gap-5 bg-gray-700 max-w-[450px] p-4 rounded">
            <button className="filter text-gray-300 focus:text-white focus:bg-[#1e3a8a] rounded-md w-full p-2">
              Account
            </button>
            <button className="filter text-gray-300 focus:text-white focus:bg-[#1e3a8a] rounded-md w-full p-2">
              Notifications
            </button>
            <button className="filter text-gray-300 focus:text-white focus:bg-[#1e3a8a] rounded-md w-full p-2">
              Preferences
            </button>
            {user ? (
              <button
                className="hover:bg-red-600 cursor-pointer ml-3 flex items-center space-x-2 justify-start py-2 rounded-lg"
                onClick={handleLogout}
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            ) : (
              <button
                onClick={goToLogin}
                className="hover:bg-blue-600 cursor-pointer ml-3 flex items-center space-x-2 justify-start py-2 rounded-lg"
              >
                <FaSignInAlt />
                <span>Login</span>
              </button>
            )}
          </div>
        </section>

        {loading ? (
          <div className="text-center py-10">Loading user data...</div>
        ) : (
          <>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-700 p-2 rounded">{user?.firstName || "John"}</div>
                <div className="bg-gray-700 p-2 rounded">{user?.lastName || "Doe"}</div>
                <div className="bg-gray-700 p-2 rounded col-span-1 md:col-span-2">{user?.email || "john@example.com"}</div>
                <label htmlFor="BiosBar">Bios</label>
                <textarea id="BiosBar" className="bg-gray-700 p-2 rounded col-span-1 md:col-span-2 resize-none" rows="4" defaultValue={user?.bio || ""}></textarea>
                <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded col-span-1 md:col-span-2">
                  Save Bios
                </button>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl mb-4">Password</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-700 p-2 rounded">Current Password</div>
                <input type="password" placeholder="New Password" className="bg-gray-700 p-2 rounded" />
                <input type="password" placeholder="Confirm New Password" className="bg-gray-700 p-2 rounded col-span-1 md:col-span-2" />
                <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded col-span-1 md:col-span-2">
                  Update Password
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default Profile;