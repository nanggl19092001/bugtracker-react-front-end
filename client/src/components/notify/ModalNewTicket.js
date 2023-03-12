function ModalNewTicket(props) {
    return ( 
        <>
        {props.isOpenTicketModal && (
          <div className="fixed z-20 bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={props.toggleModal}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
              <form>
                <h2 className="text-xl font-bold pb-4 text-center">New Project</h2>
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
                    className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:border-blue-500 focus:border-2"
                  />
                </div>
                {/* <div className="mb-4">
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
                </div> */}
                <div className="flex items-center w-full justify-end mt-4">
                  <button
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-400"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        </>
     );
}

export default ModalNewTicket;