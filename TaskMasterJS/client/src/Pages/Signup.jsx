import { useState } from "react";
import NavBarNoOutline from "../Components/NavBarNoOutline";
import SideBar from "../Components/SideBar";

function Signup() {
  const [isOpen, setIsOpen] = useState(false);
  const OpenSidebar = () => setIsOpen(true);
  const CloseSidebar = () => setIsOpen(false);

  return (
    <>
      <main className="relative w-screen h-screen overflow-hidden">
        {/* Navbar */}
        <header>
          <NavBarNoOutline OpenSidebar={OpenSidebar} />
        </header>

        {/* Sidebar Overlay */}
        {isOpen && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"
            onClick={CloseSidebar}
          ></div>
        )}

        {/* Sidebar */}
        <section
          className={`fixed h-full w-[70%] max-w-[300px] shadow-lg top-0 left-0 transition-transform duration-300 z-20 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <SideBar CloseSidebar={CloseSidebar} />
        </section>

        {/* Signup Form */}
        <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-800 via-gray-600 to-gray-100">
          <div className="bg-[#111827] p-10 rounded-lg shadow-lg mb-20 w-[30%]">
            {/* Title Section */}
            <div className="text-center mb-6">
              <h2 className="text-white text-2xl font-bold">Create an account</h2>
              <p className="text-gray-400 text-sm">
                Join TaskMaster and start organizing your life
              </p>
            </div>

            {/* Input Fields */}
            <div className="grid gap-5 w-full">
              {/* Full Name Input */}
              <div>
                <label htmlFor="FullNameInput" className="text-white text-[1rem]">Full Name</label>
                <input
                  type="text"
                  id="FullNameInput"
                  placeholder="John Doe"
                  className="w-full px-3 py-2 bg-[#1f2937] text-gray-300 border-none rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="EmailInput" className="text-white text-[1rem]">Email Address</label>
                <input
                  type="email"
                  id="EmailInput"
                  placeholder="john@example.com"
                  className="w-full px-3 py-2 bg-[#1f2937] text-gray-300 border-none rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="PasswordInput" className="text-white text-[1rem]">Password</label>
                <input
                  type="password"
                  id="PasswordInput"
                  placeholder="●●●●●●●●"
                  className="w-full px-3 py-2 bg-[#1f2937] text-gray-300 border-none rounded-md focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-gray-400 text-xs mt-1">
                  Password must be at least 8 characters long
                </p>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-center gap-2">
                <input type="checkbox" id="terms" className="w-4 h-4 rounded-lg cursor-pointer bg-[#111827]" />
                <label htmlFor="terms" className="text-gray-400 text-sm">
                  I agree to the{" "}
                  <a href="#" className="text-blue-500">Terms of Service</a> and{" "}
                  <a href="#" className="text-blue-500">Privacy Policy</a>
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6">
              <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                Create Account
              </button>
              <p className="text-center mt-4 text-gray-600">
                Already have an account?{" "}
                <a href="/login" className="text-blue-500">Log in</a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Signup;
