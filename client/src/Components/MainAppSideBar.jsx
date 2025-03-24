// import PropTypes from 'prop-types';
import Button from "./Button";
import { useNavigation } from "../tools/navigationUtils"

function SideBar() {
  const { goToCreateTask  } =  useNavigation()
  


  return (
    <main className="fixed hidden lg:grid overflow-auto top-[7vh] left-0 h-[calc(100vh-7vh)] w-[20%] shadow-lg bg-[#111827] outline-1 outline-[#d1d5db] p-5 z-40">
      
      {/* Close Button */}
      <div className="TopSide flex justify-between mb-3">
        <h1 className="text-white text-[1.5rem] font-extrabold mb-4">Tasks</h1>
        <Button text="+ New" buttonClick={goToCreateTask} />
      </div>

      {/* Sidebar Filters */}
      <div className="Filters grid gap-4 ml-2">

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search tasks..."
          className="p-2 rounded bg-[#1f2937] text-white border border-gray-600 w-full"
        />

        {/* Filters Section */}
        <div className="space-y-2">
          <button className="flex items-center p-2 bg-[#1f2937] text-white rounded w-full hover:bg-[#374151] focus:bg-[#1e3a8a]">
            📌 All Tasks
          </button>
          <button className="flex items-center p-2 bg-[#1f2937] text-white rounded w-full hover:bg-[#374151] focus:bg-[#1e3a8a]">
            📅 Today
          </button>
          <button className="flex items-center p-2 bg-[#1f2937] text-white rounded w-full hover:bg-[#374151] focus:bg-[#1e3a8a]">
            🔜 Upcoming
          </button>
          <button className="flex items-center p-2 bg-[#1f2937] text-white rounded w-full hover:bg-[#374151] focus:bg-[#1e3a8a]">
            ✅ Completed
          </button>
        </div>

        {/* Priority Filters */}
        <h2 className="text-gray-400 mt-3">Priorities</h2>
        <div className="space-y-2">
          <button className="flex items-center p-2 bg-[#1f2937] text-white rounded w-full hover:bg-[#374151] focus:bg-[#1e3a8a]">
            🔵 Low
          </button>
          <button className="flex items-center p-2 bg-[#1f2937] text-white rounded w-full hover:bg-[#374151] focus:bg-[#1e3a8a]">
            🟡 Medium
          </button>
          <button className="flex items-center p-2 bg-[#1f2937] text-white rounded w-full hover:bg-[#374151] focus:bg-[#1e3a8a]">
            🔴 High
          </button>
        </div>

        {/* Tags */}
        <h2 className="text-gray-400 mt-3">Tags</h2>
        <div className="space-y-2">
          <button className="flex items-center p-2 bg-[#1f2937] text-white rounded w-full hover:bg-[#374151] focus:bg-[#1e3a8a]">
            🎯 Work
          </button>
          <button className="flex items-center p-2 bg-[#1f2937] text-white rounded w-full hover:bg-[#374151] focus:bg-[#1e3a8a]">
            ⚠️ Urgent
          </button>
          <button className="flex items-center p-2 bg-[#1f2937] text-white rounded w-full hover:bg-[#374151] focus:bg-[#1e3a8a]">
            💙 Personal
          </button>
          <button className="flex items-center p-2 bg-[#1f2937] text-white rounded w-full hover:bg-[#374151] focus:bg-[#1e3a8a]">
            📚 Learning
          </button>
          <button className="flex items-center p-2 bg-[#1f2937] text-white rounded w-full hover:bg-[#374151] focus:bg-[#1e3a8a]">
            🏥 Health
          </button>
        </div>
      </div>
    </main>
  );
}

export default SideBar;
