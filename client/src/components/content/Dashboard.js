import Empty from "./Empty";
import Project from "./Project";

function Dashboard() {
  const project = {
    name: "Project 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    status: "In Progress",
    contributors: "Team Cookie",
  };
  return (
    <div className="px-8 py-8">
      <h2 className="text-xl font-bold">DashBoard</h2>
      {!project && <Empty />}
      {project && <Project project={project} />}
      <div className="summary grid grid-cols-3 gap-4">
        <div className="my-4 w-full h-fit bg-white rounded border-b border-gray-200">
            <h2 className = "text-md px-4 py-2 text-text-color font-bold">Ticket by Type</h2>
        </div>
        <div className="my-4 w-full h-fit bg-white rounded border-b border-gray-200">
            <h2 className = "text-md px-4 py-2 text-text-color font-bold">Ticket by Priority</h2>
        </div>
        <div className="my-4 w-full h-fit bg-white rounded border-b border-gray-200">
            <h2 className = "text-md px-4 py-2 text-text-color font-bold">Ticket by Status</h2>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
