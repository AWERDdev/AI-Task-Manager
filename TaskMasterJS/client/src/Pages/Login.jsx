import { useState } from "react";
import NavBarNoOutline from "../Components/NavBarNoOutline";
import SideBar from "../Components/SideBar";
import { useNavigate } from "react-router-dom";
function Login() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const OpenSidebar = () => setIsOpen(true);
  const CloseSidebar = () => setIsOpen(false);
  const navigate = useNavigate(); // Initialize navigate function

  const Signup = ()=>{
    navigate("/"); // Navigate to the Signup page
  }

  const validateForm = () => {
    let newErrors = {};
    
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted", { email, password });
      Signup()
    }
  };

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

        {/* Login Form */}
        <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-800 via-gray-600 to-gray-100">
          <div className="bg-[#111827] p-10 rounded-lg shadow-lg mb-20 w-[30%]">
            {/* Title Section */}
            <div className="text-center mb-10">
              <h2 className="text-white text-2xl">Welcome back</h2>
              <p className="text-white text-[1rem]">Log in to your TaskMaster account</p>
            </div>

            {/* Input Fields */}
            <form onSubmit={handleSubmit} className="grid gap-5 w-full">
              {/* Email Input */}
              <div>
                <label htmlFor="EmailInput" className="text-white text-[1rem]">Email Address</label>
                <input
                  type="email"
                  id="EmailInput"
                  placeholder="john@example.com"
                  className="w-full px-3 py-2 bg-[#1f2937] text-gray-300 border-none rounded-md focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="PasswordInput" className="text-white text-[1rem]">Password</label>
                <input
                  type="password"
                  id="PasswordInput"
                  placeholder="●●●●●●●●"
                  className="w-full px-3 py-2 bg-[#1f2937] text-gray-300 border-none rounded-md focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                  Login
                </button>
                <p className="text-center mt-4 text-gray-600">
                  Don’t have an account? <a href="/Signup" className="text-blue-500">Sign up</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;

