import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostComment } from "./PostComment.jsx";
import { useContext } from "react";
import { getCommentsOfReview } from "../api/api";
import { DarkModeContext } from "../contexts/DarkModeContext";
import { SingleComment } from "./SingleComment.jsx";

export const CommentsSection = ({ users }) => {
  const { review_id } = useParams();
  const [commentsObj, setCommentsObj] = useState({});
  const [commentsArr, setCommentsArr] = useState([]);
  const [numCommsDeleted, setNumCommsDeleted] = useState(0);

  const darkModeValueFromContext = useContext(DarkModeContext);

  const darkModeVar = darkModeValueFromContext.darkMode === true;

  useEffect(() => {
    getCommentsOfReview(review_id).then((comments) => {
      setCommentsObj(comments);
      setCommentsArr(comments.results);
    });
  }, [review_id, numCommsDeleted]);

  return (
    <div className="right-column">
      <h3 className={`comments-hdr ${darkModeVar ? "dark-mode" : ""}`}>
        Comments
      </h3>
      <div id="comments-container">
        {commentsArr.map((comment) => {
          return (
            <SingleComment
              commentId={comment.comment_id}
              review_id={review_id}
              key={comment.comment_id}
              setNumCommsDeleted={setNumCommsDeleted}
              commentsArr={commentsArr}
              commentsObj={commentsObj}
              setCommentsArr={setCommentsArr}
              setCommentsObj={setCommentsObj}
              users={users}
            />
          );
        })}
      </div>
      <PostComment setCommentsArr={setCommentsArr} review_id={review_id} />
    </div>
  );
};
