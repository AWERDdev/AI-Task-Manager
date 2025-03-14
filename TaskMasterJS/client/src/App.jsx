import { useState } from "react";
import "./App.css";
import NavBar from "./Components/NavBar";
import SideBar from "./Components/SideBar";

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
    <main className="relative">
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

      <section className="SectionOne"></section>
      <section className="SectionTwo-Cards"></section>
      <section className="SectionThree"></section>
    </main>
  );
}

export default App;
