import "./App.css";
import NoAuthNavNoOutline from "./Components/NoAuthNavNoOutline";
import NoAuthSideBar from "./Components/NoAuthSideBar";
import MainAppSideBar from "./Components/MainAppSideBar";
import Button from "./Components/Button";
import TaskCard from "./Components/TaskCard";
import { useEffect } from "react";
// Import the sidebar utility
import { useSidebar } from "./tools/sidebarUtils";
import { useNavigation } from "./tools/navigationUtils"
import  { RequestTasks } from "./tools/TaskRequester";
function App() {
  // Use the sidebar utility instead of managing state directly
  const { isOpen, openSidebar, closeSidebar } = useSidebar();
  const { goToCreateTask  } =  useNavigation()

  const RequestUsersTasks = async () => {
    try {
      const result = await RequestTasks()
      if (result.success) {
        console.log('fetching Tasks succesful successful');
      }else{
        console.log('fetching Tasks  failed:', result.message);
      }
    }catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    useEffect(() => {
      RequestUsersTasks();
    }, []);
  return (
    <main className="relative bg-[#111827] w-screen h-screen overflow-x-hidden text-gray-300">
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full z-30 bg-[#0f172a] shadow-md">
        <NoAuthNavNoOutline OpenSidebar={openSidebar} />
      </header>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-20"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <section
        className={`fixed h-full w-[280px] bg-[#1f2937] shadow-lg top-0 left-0 transition-transform duration-300 z-30 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <NoAuthSideBar CloseSidebar={closeSidebar} />
      </section>

      {/* Main Content */}
      <div className="pl-5 lg:pl-[300px] pt-[70px] pr-5">
        <section className="mb-4">
          <MainAppSideBar />
        </section>

        {/* Header */}
        <section className="flex justify-between items-center mt-4">
          <h1 className="text-white text-[1.8rem] font-bold">My Tasks</h1>
          <Button text="+ Add Task" buttonClick={goToCreateTask} />
        </section>

        {/* Search and Filters */}
        <section className="mt-6">
          <div className="w-auto grid justify-center bg-[#1f2937] p-4 rounded lg:flex gap-4">
            <input
              type="text"
              placeholder="🔍 Search tasks..."
              className="w-[80vw] lg:w-[40vw] px-3 py-2 bg-[#374151] text-gray-300 border-none rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <select defaultValue="" className="cursor-pointer p-2 bg-[#374151] text-white border-none rounded-md">
              <option value="" disabled>All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <select defaultValue="" className="p-2 cursor-pointer bg-[#374151] text-white border-none rounded-md">
              <option value="" disabled>All Tags</option>
              <option value="Work">Work</option>
              <option value="Urgent">Urgent</option>
              <option value="Health">Health</option>
              <option value="Personal">Personal</option>
            </select>
            <select defaultValue="" className="p-2 cursor-pointer bg-[#374151] text-white border-none rounded-md">
              <option value="" disabled >Due Date</option>
              <option value="Now">Now</option>
              <option value="In_a_week">In A week</option>
            </select>
          </div>
        </section>

        {/* Filters */}
        <section className="mt-6 grid md:flex lg:justify-start md:justify-center w-full gap-5">
          <div className="grid lg:flex gap-5 lg:justify-start justify-center items-center bg-gray-700 max-w-[400px] p-4 rounded">
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
          
        </section>
      </div>
    </main>
  );
}

export default App;