import { Menu } from "lucide-react";

function NavBar() {
  return (
    <nav className="h-[7vh] w-full shadow-lg rounded-none top-0 left-0 bg-[#111827] outline-1 outline-[#d1d5db]">
      <header className="flex justify-between items-center h-full px-5">
        {/* Left Side: Title & Menu Button */}
        <div className="title flex items-center gap-2">
          <button className="options-BTN flex items-center justify-center lg:hidden hover:bg-[#9ca3af] hover:text-black p-2 rounded-md text-[#9ca3af] ">
            <Menu className="transition-all duration-300" />
          </button>
          <h1 className="text-[1rem] text-[#ffffff] font-bold flex items-center transition-all duration-300">
            TaskMaster
          </h1>
        </div>

        {/* Right Side: Links */}
        <div className="Links flex items-center gap-5">
          <button className="text-[1rem] text-[#ffffff] hover:text-black hover:bg-gray-500 font-bold px-4 py-2 rounded-md transition-all duration-300">
            Login
          </button>
          <button className="text-[1rem] text-black font-bold px-5 py-2 bg-[#1e3a8a] rounded-md hover:bg-blue-500 transition-all duration-300 ">
            Sign Up
          </button>
        </div>
      </header>
    </nav>
  );
}

export default NavBar;
