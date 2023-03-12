import React, { useContext, useEffect, useState } from "react";
import { HomeContext } from "../../Context/HomeContext";
import { useNavigate } from "react-router-dom";
import { convertTimeToDMY, countTimeAgo } from "../../utils/ConvertTime";
import Member from "./Member";
import ProjectTicket from "./ProjectTicket";

function ProjectDetail({ id }) {
  // const socket = io('http://localhost:5000');
  // useEffect(() => {
  //   socket.emit('join-room', id);
  //   socket.on('message', (data) => {
  //     console.log(data);
  //   })
  //   return () => {
  //     socket.removeAllListeners();
  //   }
  // },[id, socket])
  const [comment, setComment] = useState("");
  const { project, SERVER_DOMAIN, token, socket } = useContext(HomeContext);
  const history = useNavigate();
  useEffect(() => {
    socket.emit("join-room", id);
    socket.on("message", (data) => {
      console.log(data);
    });
    return () => {
      socket.removeAllListeners();
    };
  }, [id, socket]);

  let thisProject = [];
  project && (thisProject = project.filter((project) => project.project._id === id));
  console.log(thisProject);
  return (
    <div className="px-8 py-8">
      {thisProject &&
        thisProject.map((project) => (
          <div className="mb-4" key={project.project._id}>
            <h2 className="text-xl font-bold">{project.project.name}</h2>
            <p className="text-sm text-red-500">
              {convertTimeToDMY(project.project.end) +
                " - " +
                countTimeAgo(project.project.end)}
            </p>
            <q className="text-sm text-gray-500 italic">
              {project.project.description}
            </q>
            <button
              className="btn btn-secondary block float-right w-20 hover:text-white"
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
        <div className="flex items-center">
          <textarea
            className="w-1/3 p-2 border border-gray-200 rounded focus:outline-none focus:border-blue-500 focus:border-2 resize-none"
            type="text"
            placeholder="Input comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => {
              e.key === "Enter" &&
                fetch(`${SERVER_DOMAIN}/user/project/comment?token=${token}`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    content: comment,
                    type: 0,
                    receiveId: id,
                  }),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    console.log(data);
                    setComment("");
                  });
            }}
          />
          <button
            className="bg-blue-500 text-white rounded-md p-2 ml-2 hover:opacity-90 hover:shadow-md transition-opacity duration-300 ease-in-out"
            onClick={() => {
              fetch(`${SERVER_DOMAIN}/user/project/comment?token=${token}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  content: comment,
                  type: 0,
                  receiveId: id,
                }),
              })
                .then((res) => res.json())
                .then((data) => console.log(data));
            }}
          >
            Comment
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
