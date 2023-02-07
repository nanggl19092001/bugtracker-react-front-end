import Sort from "../icon/Sort";

function Project({ project }) {
  return (
    <div className="my-4 w-fit h-fit bg-white rounded">
      <h2 className="text-md px-4 py-2 text-text-color font-bold">Project</h2>
      <div className="flex justify-end">
        <button
          className="bg-blue-500 text-white text-[14px] rounded-md 
        font-bold mx-2 mb-4 px-2 py-1"
        >
          New Project
        </button>
      </div>
      <table className="table-fixed w-full mx-4 py-2 font-light border-b border-gray-200">
        <thead>
          <tr>
            <th className="w-1/6 text-start">
              Name
              <Sort/>
            </th>
            <th className="w-3/6 text-start">Description</th>
            <th className="w-1/6 text-start">Contributor</th>
            <th className="text-start"></th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-gray-200">
            <td>{project.name}</td>
            <td>{project.description}</td>
            <td>{project.contributors}</td>
            <td className="text-center">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                ></path>
              </svg>
            </td>
          </tr>
          <tr className="border-t border-gray-200">
            <td>{project.name}</td>
            <td>{project.description}</td>
            <td>{project.contributors}</td>
            <td className="text-center">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                ></path>
              </svg>
            </td>
          </tr>
          <tr className="border-t border-gray-200">
            <td>{project.name}</td>
            <td>{project.description}</td>
            <td>{project.contributors}</td>
            <td className="text-center">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                ></path>
              </svg>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-center py-4">
        <nav aria-label="Page navigation">
          <ul className="flex list-style-none">
            <li className="page-item disabled">
              <a
                className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full text-gray-500 pointer-events-none focus:shadow-none"
                href="#1"
                tabIndex="-1"
                aria-disabled="true"
              >
                Previous
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                href="#2"
              >
                1
              </a>
            </li>
            <li className="page-item active">
              <a
                className="page-link relative block py-1.5 px-3 border-0 bg-blue-600 outline-none transition-all duration-300 rounded-full text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md"
                href="#3"
              >
                2 <span className="visually-hidden"></span>
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                href="#4"
              >
                3
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                href="#5"
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Project;
