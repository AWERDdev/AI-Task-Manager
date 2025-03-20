import { useState } from "react";
import "./App.css";
import NoAuthNavNoOutline from "./Components/NoAuthNavNoOutline";
import NoAuthSideBar from "./Components/NoAuthSideBar";
import MainAppSideBar from "./Components/MainAppSideBar";
import Button from "./Components/Button";
import TaskCard from "./Components/TaskCard";
function App() {
  const [isOpen, setIsOpen] = useState(false);

  const OpenSidebar = () => setIsOpen(true);
  const CloseSidebar = () => setIsOpen(false);
  const CreateTask = () => console.log("Creating Task...");

  return (
    <main className="relative bg-[#111827] w-screen h-screen overflow-x-hidden text-gray-300">
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full z-30 bg-[#0f172a] shadow-md">
        <NoAuthNavNoOutline OpenSidebar={OpenSidebar} />
      </header>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-20"
          onClick={CloseSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <section
        className={`fixed h-full w-[280px] bg-[#1f2937] shadow-lg top-0 left-0 transition-transform duration-300 z-30 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <NoAuthSideBar CloseSidebar={CloseSidebar} />
      </section>

      {/* Main Content */}
      <div className="pl-[300px] pt-[70px] pr-5">
        <section className="mb-4">
          <MainAppSideBar />
        </section>

        {/* Header */}
        <section className="flex justify-between items-center mt-4">
          <h1 className="text-white text-[1.8rem] font-bold">My Tasks</h1>
          <Button text="+ Add Task" buttonClick={CreateTask} />
        </section>

        {/* Search and Filters */}
        <section className="mt-6">
          <div className="w-auto bg-[#1f2937] p-4 rounded flex gap-4">
            <input
              type="text"
              placeholder="🔍 Search tasks..."
              className="w-[40vw] px-3 py-2 bg-[#374151] text-gray-300 border-none rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <select className="cursor-pointer p-2 bg-[#374151] text-white border-none rounded-md">
              <option value="" disabled selected>All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <select className="p-2 cursor-pointer bg-[#374151] text-white border-none rounded-md">
              <option value="" disabled selected>All Tags</option>
              <option value="Work">Work</option>
              <option value="Urgent">Urgent</option>
              <option value="Health">Health</option>
              <option value="Personal">Personal</option>
            </select>
            <select className="p-2 cursor-pointer bg-[#374151] text-white border-none rounded-md">
              <option value="" disabled selected>Due Date</option>
              <option value="Priority">Priority</option>
              <option value="Alphabetical">Alphabetical</option>
            </select>
          </div>
        </section>

        {/* Filters */}
        <section className="mt-6">
          <div className="flex gap-5 bg-gray-700 max-w-[400px] p-4 rounded">
            <button className="filter text-gray-300 focus:text-white focus:bg-[#1e3a8a] rounded-md w-full p-2">
              All
            </button>
            <button className="filter text-gray-300 focus:text-white focus:bg-[#1e3a8a] rounded-md w-full p-2">
              Today
            </button>
            <button className="filter text-gray-300 focus:text-white focus:bg-[#1e3a8a] rounded-md w-full p-2">
              Upcoming
            </button>
            <button className="filter text-gray-300 focus:text-white focus:bg-[#1e3a8a] rounded-md w-full p-2">
              Completed
            </button>
          </div>
        </section>

        {/* Task Cards */}
        <section className="mt-6">
          <div className="bg-[#1f2937] p-4 rounded-md mb-3">
            <h2 className="text-white font-semibold">Update Portfolio Website</h2>
            <p className="text-gray-400">Add recent projects and update skills section</p>
            <p className="text-sm text-gray-400 mt-2">
              <span className="bg-blue-600 text-white px-2 py-1 rounded">Low</span>
              <span className="ml-2">📅 Friday, 12:00 PM</span>
            </p>
          </div>
            
          <div className="bg-[#1f2937] p-4 rounded-md mb-3">
            <h2 className="text-white font-semibold">Schedule Dentist Appointment</h2>
            <p className="text-gray-400">Next week</p>
            <p className="text-sm text-gray-400 mt-2">
              <span className="bg-yellow-600 text-white px-2 py-1 rounded">Medium</span>
              <span className="ml-2">🏥 Personal • Health</span>
            </p>
          </div>

          <div className="bg-[#1f2937] p-4 rounded-md mb-3">
            <h2 className="text-white font-semibold">Prepare Presentation for Client</h2>
            <p className="text-gray-400">Create slides and gather data</p>
            <p className="text-sm text-gray-400 mt-2">
              <span className="bg-red-600 text-white px-2 py-1 rounded">High</span>
              <span className="ml-2">📅 Thursday, 2:00 PM</span>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
