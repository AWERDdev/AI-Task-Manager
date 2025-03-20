import PropTypes from "prop-types";
function TaskCard({ title, description, dueDate, priority }) {
  return (
<>
<div className="bg-[#1f2937] p-4 rounded-md mb-3">
    <h2 className="text-white font-semibold">{title}</h2>
    <p className="text-gray-400">{description}</p>
    <p className="text-sm text-gray-400 mt-2">
      <span className="bg-blue-600 text-white px-2 py-1 rounded">{priority}</span>
      <span className="ml-2">📅 {dueDate}</span>
    </p>
  </div> 
</>  
);
}
TaskCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  dueDate: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
};
export default TaskCard;