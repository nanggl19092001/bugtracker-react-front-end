import React, { useContext, useRef, useState } from "react";
import Project from "./Project";
import { HomeContext } from "../../Context/HomeContext";
import Notification from "../notify/Notification";
import IsLoading from "../notify/IsLoading";
import { PieChart } from "react-minimal-pie-chart";

function Dashboard() {
  const { project, error, isLoading, SERVER_DOMAIN, token, reload, setReload } =
    useContext(HomeContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
    setMessage("");
  };
  const [message, setMessage] = useState("");
  const [notify, setNotify] = useState("");
  const name = useRef("");
  const description = useRef("");
  const time = useRef("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(`${SERVER_DOMAIN}/user/project?token=${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name:
            name.current.value.charAt(0).toUpperCase() +
            name.current.value.slice(1),
          description: description.current.value,
          deadline: time.current.value,
        }),
      });
      let resJson = await res.json();
      if (resJson.status === 200) {
        setNotify(resJson.message);
        setIsOpen(false);
        setReload(!reload);
      } else {
        setMessage(resJson.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const data = [
    { title: "One", value: 10, color: "#9499a2" },
    { title: "Two", value: 10, color: "#2e64e7" },
    { title: "Three", value: 20, color: "#111826" },
  ];
  const dataSeverity = [
    { title: "Low", value: 15, color: "#9499a2" },
    { title: "Minor", value: 20, color: "#111826" },
    { title: "Major", value: 10, color: "#2e64e7" },
    { title: "Critical", value: 20, color: "#d82b2a" },
  ];
  return (
    <div className="px-8 py-8">
      {notify && <Notification message={notify} type="success" />}
      <h2 className="text-xl font-bold">DashBoard</h2>
      <div className="my-4 px-4 py-2 w-full h-fit min-h-[250px] bg-white rounded">
        <h2 className="text-lg text-text-color font-bold">Project</h2>
        <div className="flex justify-end">
          <button
            className="bg-blue-600 text-white opacity-80 text-[14px] rounded-md 
            font-bold mx-2 mb-4 px-2 py-1 hover:opacity-100 transition duration-300 ease-in-out"
            onClick={toggleModal}
          >
            New Project
          </button>
        </div>
        {isOpen && (
          <div className="fixed z-20 bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={toggleModal}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full box-border">
              <form>
                <h2 className="text-xl font-bold pb-4 text-center">
                  New Project
                </h2>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium mb-2 after:content-['*'] after:text-red-500"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    ref={name}
                    className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:border-blue-500 focus:border-2"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium mb-2"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    type="text"
                    id="description"
                    ref={description}
                    rows="5"
                    className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:border-blue-500 focus:border-2"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium mb-2 after:content-['*'] after:text-red-500"
                    htmlFor="time"
                  >
                    DeadLine
                  </label>
                  <input
                    type="datetime-local"
                    id="time"
                    ref={time}
                    className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:border-blue-500 focus:border-2"
                  />
                </div>
                <div className="mb-4">
                  {message ? (
                    <div
                      className="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base red-yellow-700"
                      role="alert"
                    >
                      {message}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex items-center w-full justify-end mt-4">
                  <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-400"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {isLoading ? <IsLoading /> : project && <Project project={project} />}
        {error && <div className="text-center">{error}</div>}
      </div>
      <div className="summary grid grid-cols-3 gap-4">
        <div className="my-4 w-full h-fit bg-white rounded border-b border-gray-200">
          <h2 className="text-md px-4 py-2 text-text-color font-bold">
            Ticket by Type
          </h2>
          <div className="flex justify-center">
            <div className="w-[50%] h-[50%] m-2">
              <PieChart
                data={data}
                startAngle={180}
                label={(data) => data.dataEntry.title}
                labelPosition={70}
                labelStyle={{
                  fill: "white",
                  fontSize: "5px",
                  fontWeight: "bold",
                }}
                animate={true}
                animationDuration={500}
                animationEasing="linear"
                reveal={100}
              />
            </div>
          </div>
        </div>
        <div className="my-4 w-full h-fit bg-white rounded border-b border-gray-200">
          <h2 className="text-md px-4 py-2 text-text-color font-bold">
            Ticket by Priority
          </h2>
          <div className="flex justify-center">
            <div className="w-[50%] h-[50%] m-2">
              <PieChart
                data={dataSeverity}
                startAngle={180}
                label={(data) => data.dataEntry.title}
                labelPosition={70}
                labelStyle={{
                  fill: "white",
                  fontSize: "5px",
                  fontWeight: "bold",
                }}
                animate={true}
                animationDuration={500}
                animationEasing="ease-out"
                reveal={100}
              />
            </div>
          </div>
        </div>
        <div className="my-4 w-full h-fit bg-white rounded border-b border-gray-200">
          <h2 className="text-md px-4 py-2 text-text-color font-bold">
            Ticket by Status
          </h2>
          <div className="flex justify-center">
            <div className="w-[50%] h-[50%] m-2">
              <PieChart
                data={data}
                startAngle={180}
                label={(data) => data.dataEntry.title}
                labelPosition={70}
                labelStyle={{
                  fill: "white",
                  fontSize: "5px",
                  fontWeight: "bold",
                }}
                animate={true}
                animationDuration={500}
                animationEasing="ease-out"
                reveal={100}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
