import { convertTimeToDMY, countTimeAgo } from "../../utils/ConvertTime";

function Comment(props) {
  const handleScrollButton = () => {
    props.setIsVisible(true);
    props.messagesEndRef.current.scrollIntoView({
      behavior: "smooth",
    })
    props.setHaveNewComment(false);
  };
  return (
    <div className="comment">
      {props.comment.map((item, index) => (
        <div className="flex items-center py-2 px-2" key={index}>
          <img
            className="w-10 h-10 rounded-full"
            src="https://tecdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
            alt="avatar"
          />
          <div className="flex flex-col mx-2 bg-white p-2 rounded-md">
            <p className="text-sm font-semibold">
              {item.senderInfo.firstname + " " + item.senderInfo.lastname}
            </p>
            <p className="text-sm text-gray-500">{item.comment.content}</p>
            <p className="text-xs text-gray-400 italic">
              {countTimeAgo(item.comment.date).includes(
                "second",
                "minute",
                "hour"
              ) ||
              countTimeAgo(item.comment.date).includes("minute") ||
              countTimeAgo(item.comment.date).includes("hour")
                ? countTimeAgo(item.comment.date)
                : convertTimeToDMY(item.comment.date)}
            </p>
          </div>
        </div>
      ))}
      {props.isGreaterLimit && (
        <button
          onClick={() => {
            props.setLimit(props.limit + 5);
          }}
        >
          Read more
        </button>
      )}
      {props.commentSocket &&
        props.commentSocket.map((item, index) => (
          <div className="flex items-center py-2 px-2" key={index}>
            <img
              className="w-10 h-10 rounded-full"
              src="https://tecdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
              alt="avatar"
            />
            <div className="flex flex-col mx-2 bg-white p-2 rounded-md">
              <p className="text-sm font-semibold">
                {item[0].senderInfo[0].firstname +
                  " " +
                  item[0].senderInfo[0].lastname}
              </p>
              <p className="text-sm text-gray-500">{item[0].comment.content}</p>
              <p className="text-xs text-gray-400 italic">
                {countTimeAgo(item[0].comment.date).includes("second") ||
                countTimeAgo(item[0].comment.date).includes("minute") ||
                countTimeAgo(item[0].comment.date).includes("hour")
                  ? countTimeAgo(item[0].comment.date)
                  : convertTimeToDMY(item[0].comment.date)}
              </p>
            </div>
          </div>
        ))}
      {props.isVisible && (
        <div className="sticky bottom-0 h-14 float-right right-2">
          <button onClick={() => handleScrollButton()}>
            {props.haveNewComment ? "Have a new comment" : "Scroll to bottom"}
          </button>
        </div>
      )}
      <div ref={props.messagesEndRef} />
    </div>
  );
}

export default Comment;
