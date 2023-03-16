import { useState } from "react";
import { postComment } from "../api/api";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

export const PostComment = ({ setComments, review_id }) => {
  const [input, setInput] = useState("");
  const [posting, setPosting] = useState(false);
  const userValueFromContext = useContext(UserContext);

  const handleComment = (event) => {
    setInput(event.target.value);
  };

  const handlePost = (event) => {
    event.preventDefault();
    if (input !== "") {
      setPosting(true);
      //^^ attempt at disabling text area whilst the comment is being posted
      postComment(review_id, input, userValueFromContext.user)
        .then((newCommentFromApi) => {
          setComments((currComments) => {
            return [newCommentFromApi, ...currComments];
          });
        })
        .catch((err) => {
          console.log(err);
        });
      setInput("");
      setPosting(false);
    }
  };
  return (
    <form onSubmit={handlePost}>
      <input
        value={input}
        type="text"
        placeholder="Add a comment..."
        onChange={handleComment}
        disabled={posting}
      />
      <button type="submit">Post</button>
    </form>
  );
};
