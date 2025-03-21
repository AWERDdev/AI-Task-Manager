import { useState } from "react";
import NoAuthNavNoOutline from "../Components/NoAuthNavNoOutline";
import NoAuthSideBar from "../Components/SideBar";

function Task() {
    const [isOpen, setIsOpen] = useState(false);
    const OpenSidebar = () => setIsOpen(true);
    const CloseSidebar = () => setIsOpen(false);
    
    const HandleFuntions = () =>{

    }
    return (
      <>
        <main className="relative w-screen h-screen overflow-hidden">
          {/* Navbar */}
          <header>
            <NoAuthNavNoOutline OpenSidebar={OpenSidebar} />
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
            <NoAuthSideBar CloseSidebar={CloseSidebar} />
          </section>
  
          {/* Task Creation Form */}
          <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-800 via-gray-600 to-gray-100">
            <div className="bg-[#111827] p-10 rounded-lg shadow-lg w-[30%] min-w-[400px]">
              {/* Title Section */}
              <div className="text-center mb-10">
                <h2 className="text-white text-2xl">Create a Task</h2>
              </div>
  
              {/* Task Form */}
              <form className="grid gap-5 w-full">
                {/* Task Name */}
                <div>
                  <label htmlFor="TaskName" className="text-white text-[1rem]">Task Name</label>
                  <input
                    type="text"
                    id="TaskName"
                    placeholder="Enter task name"
                    className="w-full px-3 py-2 bg-[#1f2937] text-gray-300 border-none rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
  
                {/* Task Description */}
                <div>
                  <label htmlFor="TaskDescription" className="text-white text-[1rem]">Description</label>
                  <textarea
                    id="TaskDescription"
                    placeholder="Enter task description"
                    className="w-full px-3 py-2 bg-[#1f2937] text-gray-300 border-none rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
  
                {/* Task Priority */}
                <div>
                  <label htmlFor="TaskPriority" className="text-white text-[1rem]">Priority</label>
                  <select
                    id="TaskPriority"
                    className="w-full px-3 py-2 bg-[#1f2937] text-gray-300 border-none rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
  
                {/* Task Type */}
                <div>
                  <label htmlFor="TaskType" className="text-white text-[1rem]">Task Type</label>
                  <input
                    type="text"
                    id="TaskType"
                    placeholder="e.g., Personal, Work"
                    className="w-full px-3 py-2 bg-[#1f2937] text-gray-300 border-none rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
  
                {/* Submit Button */}
                <div className="mt-6">
                  <button onClick={HandleFuntions} type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                    Create Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </>
    );
  }
  
  export default Task;
