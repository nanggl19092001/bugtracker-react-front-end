import { useEffect, useState, useContext, useRef } from "react";
import { HomeContext } from "../../Context/HomeContext";
import GetComment from "../../FetchData/GetComment";
import Comment from "./Comment";
import NoComment from "./NoComment";
import IsLoading from "../notify/IsLoading";
import { ProjectContext } from "../../Context/ProjectContext";
// import { io } from "socket.io-client";

function CommentTicket({ idTicket }) {
  const { SERVER_DOMAIN, token, user } = useContext(HomeContext);
  const [limit, setLimit] = useState(5);
  const { data, isLoading, total } = GetComment(
    `${SERVER_DOMAIN}/user/comment?token=${token}&id=${idTicket}&limit=${limit}`
  );
  const { member } = useContext(ProjectContext);
  const [isGreaterLimit, setIsGreaterLimit] = useState(true);
  const [commentSocket, setCommentSocket] = useState([]);
  const messagesEndRef = useRef(null);
  const frameCommentRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [haveNewComment, setHaveNewComment] = useState(false);
  // useEffect(() => {
  //   const socket = io(SERVER_DOMAIN);
  //   socket.emit("join-room", idTicket);
  //   socket.on("message", (data) => {
  //     let sender = member.filter((person) => person._id === data.sender);
  //     let newComment = [];
  //     newComment.push({ comment: data, senderInfo: sender });
  //     setCommentSocket([...commentSocket, newComment]);
  //     setHaveNewComment(true);
  //     if (data.sender === user.id) {
  //       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  //       setHaveNewComment(false);
  //     }
  //   });
  //   return () => {
  //     socket.removeAllListeners();
  //   };
  // }, [idTicket, commentSocket, member, user, SERVER_DOMAIN]);
  useEffect(() => {
    setCommentSocket([]);
  }, [idTicket]);
  useEffect(() => {
    if (messagesEndRef.current && !isVisible) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      setHaveNewComment(false);
    }
  }, [isVisible]);
  useEffect(() => {
    const frameComment = frameCommentRef.current;
    const onScroll = () => {
      try {
        const elementPos =
          messagesEndRef.current.getBoundingClientRect().bottom;
        const frameBot = frameComment.getBoundingClientRect().bottom;
        if (elementPos > frameBot + 100) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } catch (error) {}
    };
    frameComment.addEventListener("scroll", onScroll);
    return () => {
      frameComment.removeEventListener("scroll", onScroll);
    };
  }, [isVisible]);
  const [comment, setComment] = useState("");
  const handleComment = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(
        `${SERVER_DOMAIN}/user/ticket/comment?token=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: user.id,
            content: comment,
            type: 0,
            receiveId: idTicket,
          }),
        }
      );
      let resJson = await res.json();
      if (resJson.status === 200) {
        setComment("");
        let newComment = [];
        let sender = member.filter(
          (person) => person._id === resJson.message.sender
        );
        newComment.push({ comment: resJson.message, senderInfo: sender });
        setCommentSocket([...commentSocket, newComment]);
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
          setHaveNewComment(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="info shadow-md col-span-2 2xl:col-span-1">
      <div className="mx-4 my-2">
        <h2 className="inline text-lg text-text-color font-bold">
          Ticket Comment
        </h2>
        <div
          ref={frameCommentRef}
          className="w-full min-h-[250px] max-h-[250px] overflow-y-scroll overscroll-none bg-slate-100 shadow-inner"
        >
          {isLoading && <IsLoading />}
          {((data && data.length > 0) || commentSocket.length > 0) && (
            <Comment
              comment={data}
              limit={limit}
              setLimit={setLimit}
              isGreaterLimit={isGreaterLimit}
              setIsGreaterLimit={setIsGreaterLimit}
              commentSocket={commentSocket}
              setCommentSocket={setCommentSocket}
              messagesEndRef={messagesEndRef}
              isVisible={isVisible}
              setIsVisible={setIsVisible}
              haveNewComment={haveNewComment}
              setHaveNewComment={setHaveNewComment}
              total={total}
            />
          )}
          {((!data && commentSocket.length === 0) ||
            (data && data.length === 0 && commentSocket.length === 0)) &&
            !isLoading && <NoComment />}
        </div>
        <div className="flex items-center py-2">
          <textarea
            className="w-[90%] p-2 border border-gray-200 rounded focus:outline-none focus:border-blue-500 focus:border-2 resize-none"
            type="text"
            placeholder="Input your comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => {
              e.key === "Enter" && handleComment(e);
            }}
          />
          <button
            className="bg-blue-500 text-white rounded-md p-2 ml-2 hover:opacity-90 hover:shadow-md 
          transition-opacity duration-300 ease-in-out"
            autoComplete="off"
            onClick={(e) => handleComment(e)}
          >
            Comment
          </button>
        </div>
        <p className="text-xs text-slate-300">Press Enter to send comment</p>
      </div>
    </div>
  );
}

export default CommentTicket;
