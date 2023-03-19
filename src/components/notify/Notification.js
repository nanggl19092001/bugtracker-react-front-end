import React,{useState, useEffect} from "react";

const Notification = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [color, setColor] = useState("bg-green-500");
  useEffect(() => {
    type === "success" ? setColor("bg-green-500") : setColor("bg-red-500");
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [type]);

  setTimeout(() => {
    message = ""
  }, 5000);
  
  if (!isVisible) {
    return null;
  }
  return (
    <div className="absolute z-100 flex flex-col justify-center mt-2 animate-go-in">
      <div
        className={`${color} shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block mb-3`}
        id="static-example"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        data-mdb-autohide="true"
      >
        <div className={`${color}flex justify-between items-center py-2 px-3 bg-clip-padding border-b border-green-400 rounded-t-lg`}>
          <p className="font-bold text-white flex items-center">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="check-circle"
              className="w-4 h-4 mr-2 fill-current"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
              ></path>
            </svg>
            Thông báo
          </p>
          <div className="flex items-center">
            <p className="text-white opacity-90 text-xs">now</p>
            <button
              type="button"
              className="btn-close btn-close-white box-content w-4 h-4 ml-2 text-white border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-white hover:opacity-75 hover:no-underline"
              data-mdb-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
        </div>
        <div className={`p-3 ${color} rounded-b-lg break-words text-white`}>
          {message}
        </div>
      </div>
    </div>
  );
};

export default Notification;
