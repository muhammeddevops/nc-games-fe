import { useState } from "react";
import { postComment } from "../api/api";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { DarkModeContext } from "../contexts/DarkModeContext";

export const PostComment = ({ setCommentsArr, review_id }) => {
  const [input, setInput] = useState("");
  const [posting, setPosting] = useState(false);
  const userValueFromContext = useContext(UserContext);
  const darkModeValueFromContext = useContext(DarkModeContext);

  const darkModeVar = darkModeValueFromContext.darkMode === true;

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
          setCommentsArr((currComments) => {
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
    <>
      <form onSubmit={handlePost} id="postCommForm">
        <input
          id="postCommBox"
          className="form-input"
          value={input}
          type="text"
          placeholder="Add a comment..."
          onChange={handleComment}
          disabled={posting}
        />
        <Button
          type="submit"
          id={`${darkModeVar ? "postCommBtn-dark" : "postCommBtn-light"}`}
          className="post-comm-btn"
        >
          Post
        </Button>
      </form>
    </>
  );
};
