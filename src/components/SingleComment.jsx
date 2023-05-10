import { useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import {
  deleteComment,
  getCommentsOfReview,
  patchCommentVotes,
  patchCommentVotesMinus,
} from "../api/api";
import { Button } from "react-bootstrap";
import { DarkModeContext } from "../contexts/DarkModeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export const SingleComment = ({
  commentId,
  review_id,
  setNumCommsDeleted,
  commentsArr,
  setCommentsArr,
  users,
}) => {
  const [specificComment, setSpecificComment] = useState({});
  const [hasVoted, setHasVoted] = useState(false);
  const [votes, setVotes] = useState(0);
  const [commentAuth, setCommentAuth] = useState({});

  const userValueFromContext = useContext(UserContext);

  const darkModeValueFromContext = useContext(DarkModeContext);

  const darkModeVar = darkModeValueFromContext.darkMode === true;

  useEffect(() => {
    getCommentsOfReview(review_id).then((comments) => {
      setCommentsArr(comments.results);
      const foundComment = comments.results.find(
        (comment) => comment.comment_id === commentId
      );
      setSpecificComment(foundComment);
      setVotes(foundComment.votes);
      return specificComment;
    });
  }, [commentId, review_id]);

  console.log(commentAuth);

  useEffect(() => {
    console.log(specificComment);
    const findAuthor = users.find((user) => {
      return user.username === specificComment.author;
    });
    setCommentAuth(findAuthor);
  }, [users, specificComment]);

  const handleDelete = (comment_id) => {
    setNumCommsDeleted((currCount) => {
      return currCount + 1;
    });

    const filtered = commentsArr.filter((commentToDelete) => {
      return commentToDelete.comment_id !== comment_id;
    });

    setCommentsArr([...filtered]);
    deleteComment(comment_id)
      .then(() => {})
      .catch((err) => {});
  };

  const upVote = (comment_id) => {
    if (!hasVoted) {
      setHasVoted(true);
      setVotes((currVotes) => currVotes + 1);
      patchCommentVotes(comment_id).catch((err) => {
        if (err) {
          setVotes((currVotes) => currVotes - 1);
        }
      });
    } else {
      setHasVoted(false);
      setVotes((currVotes) => currVotes - 1);
      patchCommentVotesMinus(comment_id).catch((err) => {
        if (err) {
          setVotes((currVotes) => currVotes + 1);
        }
      });
    }
  };

  const isUserComment =
    userValueFromContext.user.username === specificComment.author;
  const formattedCommentDate = new Date(
    specificComment.created_at
  ).toLocaleString("en-US", {
    month: "short",
    // day: "2-digit",
    year: "2-digit",
  });

  return (
    <div>
      {" "}
      <div
        className={`comment-box ${darkModeVar ? "dark-mode" : "light-mode"}`}
        key={specificComment.comment_id}
      >
        <div id="nameAndDpComms">
          {commentAuth ? (
            <img
              src={commentAuth.avatar_url}
              alt="authorDp"
              id="dpInComments"
            />
          ) : (
            <></>
          )}
          <strong>
            {" "}
            <p style={{ marginBottom: "0px" }}>@{specificComment.author}</p>
          </strong>
          <p id="dateInComments">{formattedCommentDate}</p>
        </div>{" "}
        <p>{specificComment.body}</p>
        <div id="likes-sec">
          <div id="numLikes">
            {" "}
            <p className="vote-text">{votes}</p>
          </div>
          <div>
            <Button
              type="toggle"
              onClick={() => {
                upVote(specificComment.comment_id);
              }}
              id={`${
                darkModeVar ? "like-hrt-comms-dark" : "like-hrt-comms-light"
              }`}
              className={`btn like-btn ${
                darkModeVar ? "btn-dark" : "btn-light"
              }`}
            >
              <FontAwesomeIcon
                icon={faHeart}
                className={`like-heart-comms ${hasVoted ? "liked" : ""} ${
                  darkModeVar ? "dark-mode" : ""
                } `}
                size="lg"
              />{" "}
            </Button>
          </div>
          {isUserComment ? (
            <Button
              id="trash-btn"
              type="button"
              className="btn-danger"
              onClick={() => {
                handleDelete(specificComment.comment_id);
              }}
            >
              <FontAwesomeIcon icon={faTrashAlt} size="sm" />
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
