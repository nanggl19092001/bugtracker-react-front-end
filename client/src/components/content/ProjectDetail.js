import React, { useContext, useEffect, useState } from "react";
import { HomeContext } from "../../Context/HomeContext";
import { useNavigate } from "react-router-dom";
import { convertTimeToDMY, countTimeAgo } from "../../utils/ConvertTime";
import Member from "./Member";

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
  project && (thisProject = project.filter((project) => project._id === id));
  return (
    <div className="px-8 py-8">
      {thisProject &&
        thisProject.map((project) => (
          <div className="mb-4" key={project._id}>
            <h2 className="text-xl font-bold">{project.name}</h2>
            <p className="text-sm text-red-500">
              {convertTimeToDMY(project.end) +
                " - " +
                countTimeAgo(project.end)}
            </p>
            <q className="text-sm text-gray-500 italic">
              {project.description}
            </q>
          </div>
        ))}
      <div className="bg-white rounded-md p-4 min-h-[80vh]">
        <div className="grid grid-cols-3 gap-4">
          <Member thisProject={thisProject} />
          <div className="tickets col-span-2 shadow-md">
            <h2 className="text-lg text-text-color font-bold">Ticket</h2>
          </div>
        </div>
        <button className="btn btn-secondary" onClick={() => history("/")}>
          Back
        </button>
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
