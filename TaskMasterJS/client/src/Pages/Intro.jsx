import { useState } from "react";
import NavBar from "../Components/NavBar";
import SideBar from "../Components/SideBar";
import { ArrowRight } from 'lucide-react';
function Intro() {
  const [isOpen, setIsOpen] = useState(false);

  // Function to Open Sidebar
  const OpenSidebar = () => {
    setIsOpen(true); // Always open the sidebar
  };

  // Function to Close Sidebar
  const CloseSidebar = () => {
    setIsOpen(false); // Always close the sidebar
  };

  return (
    <main className="relative bg-[#111827] w-screen h-screen">
      <header>
        <NavBar OpenSidebar={OpenSidebar} />
      </header>

      {/* Background Overlay - Shows when sidebar is open */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"
          onClick={CloseSidebar} // Clicking the background closes the sidebar
        ></div>
      )}

      {/* Sidebar */}
      <section
        className={`SideBar fixed h-full w-[70%]  shadow-lg top-0 left-0 transition-transform duration-300 z-20 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SideBar CloseSidebar={CloseSidebar} />
      </section>

      <section className="SectionOne ml-22">
        <div className="container">
          <h1 className="text-white mt-40 text-center text-[1rem] md:text-[3rem] font-extrabold mb-4">
            Organize your tasks with <span className="text-blue-500 font-extrabold">TaskMaster</span>
          </h1>
          <p className="text-white  text-center text-[1rem]  font-extrabold mb-4">
            The simple, efficient way to manage your daily tasks, projects, and goals all in one place.
          </p>
          <div className="button-container ml-5 flex justify-center gap-10">
          <button className=" flex  pl-10 gap-5 text-center text-[1rem] w-[13vw] text-black font-bold px-5 py-2 bg-[#1e3a8a] rounded-md hover:bg-blue-500 transition-all duration-300">
          Get started <ArrowRight />
          </button>
            <button className="text-[1rem]  text-white w-[7vw] hover:text-black outline-1 outline-white font-bold px-5 py-2 bg-black rounded-md hover:bg-gray-500 transition-all duration-300">
                Login
            </button>
          </div>
        </div>
      </section>
      <section className="SectionTwo-Cards bg-gradient-to-b from-gray-800 via-gray-600 to-gray-100 ">
        <div className="Card1"></div>
        <div className="Card2"></div>
        <div className="Card3"></div>
      </section>
      <section className="SectionThree"></section>
    </main>
  );
}

export default Intro;