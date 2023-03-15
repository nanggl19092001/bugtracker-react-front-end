import React, { useContext } from "react";
import { HomeContext } from "../../Context/HomeContext";
import { useNavigate } from "react-router-dom";

import Member from "./Member";
import ProjectTicket from "./ProjectTicket";
import InfoProject from "./InfoProject";
import CommentProject from "./CommentProject";
import { io } from "socket.io-client";
import { SERVER_DOMAIN } from "../../utils/Constaint";

function ProjectDetail({ id }) {
  const socket = io(SERVER_DOMAIN);
  const { project } = useContext(HomeContext);
  const history = useNavigate();
  let thisProject = [];
  project &&
    (thisProject = project.filter((project) => project.project._id === id));
  return (
    <div className="px-8 py-8">
      {thisProject &&
        thisProject.map((project) => (
          <div className="mb-4" key={project.project._id}>
            <h2 className="inline text-xl font-bold">{project.project.name}</h2>
            <button
              className="inline float-right w-20 hover:text-white"
              onClick={() => history("/")}
            >
              <svg
                className="w-6 h-6 bg-blue-500 rounded-full text-white float-left text-8xl"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              Back
            </button>
          </div>
        ))}
      <div className="bg-white rounded-md p-4 min-h-[80vh]">
        <div className="grid grid-cols-3 gap-4">
          <Member thisProject={thisProject} />
          <ProjectTicket thisProject={thisProject} />
        </div>
        <div className="grid grid-cols-3 gap-4 2xl:grid-cols-2">
          <InfoProject thisProject={thisProject} />
          <CommentProject
            thisProject={thisProject}
            socket={socket}
            idProject={id}
          />
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
