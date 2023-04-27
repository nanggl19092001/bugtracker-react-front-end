import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { SERVER_DOMAIN } from "../utils/Constaint";

function Register() {
  const { setNotify } = useContext(AppContext);

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //check information
    if (password !== confirmPassword) {
      setMessage("Confirm Password not match");
      return;
    }
    try {
      let res = await fetch(`${SERVER_DOMAIN}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          firstname: firstName,
          lastname: lastName,
          password: password,
        }),
      });
      let resJson = await res.json();
      if (resJson.status === 200) {
        setNotify("Register Successfully");
        console.log("Register Successfully");
        navigate("/login");
      } else {
        setMessage(resJson.message);
        setShowModal(true);
      }
      console.log(firstName, lastName, email, password, confirmPassword);
    } catch (error) {
      console.log(error);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [messageActive, setMessageActive] = useState("");

  return (
    <section className="h-screen">
      <div className="px-6 h-full text-gray-800">
        {showModal && (
          <div className="fixed z-20 bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={() => {
                setMessageActive("");
                setShowModal(false);
              }}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
              <form>
                <h2 className="text-xl font-bold pb-4 text-center">
                  Confirm code
                </h2>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium mb-2 after:content-['*'] after:text-red-500"
                    htmlFor="name"
                    autocomplete = "off"
                  >
                    Code activation account:
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter code activation account"
                    className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:border-blue-500 focus:border-2"
                  />
                </div>
                <div className="mb-4">
                  {messageActive ? (
                    <div
                      className="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base red-yellow-700"
                      role="alert"
                    >
                      {messageActive}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex items-center w-full justify-end mt-4">
                  <button
                    type="button"
                    onClick={() => setMessageActive("abc")}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-400"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
          <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample"
            />
          </div>
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <form>
              <h2 className="text-center font-bold text-3xl py-2 text-blue-600">
                Register Form
              </h2>
              <div className="mb-6">
                <input
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Email address"
                  value={email ? email : ""}
                  onChange={handleEmail}
                />
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="First Name"
                  value={firstName ? firstName : ""}
                  onChange={handleFirstName}
                />
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Last Name"
                  value={lastName ? lastName : ""}
                  onChange={handleLastName}
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Password"
                  value={password ? password : ""}
                  onChange={handlePassword}
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Confirm password"
                  value={confirmPassword ? confirmPassword : ""}
                  onChange={handleConfirmPassword}
                />
              </div>

              <div className="text-center lg:text-left">
                <button
                  type="submit"
                  className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  onClick={handleSubmit}
                >
                  Register
                </button>
                <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                  Do have an account?
                  <Link
                    to="/login"
                    className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                  >
                    Login
                  </Link>
                </p>
                {message ? (
                  <div
                    className="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3"
                    role="alert"
                  >
                    {message}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
