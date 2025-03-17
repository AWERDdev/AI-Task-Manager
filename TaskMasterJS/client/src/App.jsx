import { useState } from "react";
import "./App.css";
import NoAuthNavNoOutline from "./Components/NoAuthNavNoOutline";
import NoAuthSideBar from "./Components/NoAuthSideBar";

function App() {
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
    <main className="relative bg-gradient-to-b from-gray-800 via-gray-600 to-gray-100 w-screen h-screen overflow-x-hidden">
      <header>
        <NoAuthNavNoOutline OpenSidebar={OpenSidebar} />
      </header>
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"
          onClick={CloseSidebar}
        ></div>
      )}

      <section
        className={`SideBar fixed h-full w-[70%] max-w-[300px] shadow-lg top-0 left-0 transition-transform duration-300 z-20 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <NoAuthSideBar CloseSidebar={CloseSidebar} />
      </section>

      <section className="SectionOne"></section>
      <section className="SectionTwo-Cards"></section>
      <section className="SectionThree"></section>
    </main>
  );
}

export default App;
