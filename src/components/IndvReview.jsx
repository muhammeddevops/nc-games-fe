import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PostComment } from "./PostComment.jsx";
import { Profile } from "./Profile.jsx";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import {
  deleteComment,
  getCommentsOfReview,
  getSingleReview,
  patchVotes,
  patchVotesMinus,
} from "../api/api";

export const IndvReview = () => {
  const { review_id } = useParams();
  const [review, setReview] = useState({});
  const [comments, setComments] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [votes, setVotes] = useState(0);

  const userValueFromContext = useContext(UserContext);

  useEffect(() => {
    getSingleReview(review_id).then((review) => {
      setReview(review);
      setVotes(review.votes);
    });
  }, [review_id]);

  useEffect(() => {
    getCommentsOfReview(review_id).then((comments) => {
      setComments(comments.results);
    });
  }, [review_id, comments]);

  const upVote = () => {
    if (!hasVoted) {
      setHasVoted(true);
      setVotes((currVotes) => currVotes + 1);
      patchVotes(review_id).catch((err) => {
        if (err) {
          setVotes((currVotes) => currVotes - 1);
        }
      });
    } else {
      setHasVoted(false);
      setVotes((currVotes) => currVotes - 1);
      patchVotesMinus(review_id).catch((err) => {
        if (err) {
          setVotes((currVotes) => currVotes + 1);
        }
      });
    }
  };

  const handleDelete = (comment_id) => {
    deleteComment(comment_id).then(() => {
      setComments((currComments) => {
        const deletedComment = currComments.filter((comment) => {
          return comment.comment_id === comment_id;
        });
        const indexOfDeletedComment = currComments.indexOf(deletedComment);
        const newComments = [...currComments];
        newComments.splice(indexOfDeletedComment, 1);
        return newComments;
      });
    });
  };

  const handleLogOut = () => {
    userValueFromContext.setUser(null);
  };

  const handleLogIn = () => {
    userValueFromContext.setUser(null);
  };

  const formattedDate = new Date(review.created_at).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <div>
      {!userValueFromContext.user ? (
        <Link to="/">
          <button type="button" onClick={handleLogIn}>
            Log in
          </button>
        </Link>
      ) : (
        <div>
          <Link to="/">
            <button type="button" onClick={handleLogOut}>
              Log out
            </button>
          </Link>
          <Profile />
          <div id="review-pg-container">
            <div id="review-container">
              <h1>{review.title}</h1>
              <img src={review.review_img_url} alt={review.title} />
              <p>{review.review_body}</p>
              <p>By {review.owner}</p>
              <span>
                <p>Votes: {votes}</p>
                <button type="toggle" onClick={upVote}>
                  +
                </button>
              </span>
              <p>{formattedDate}</p>
            </div>
            <div id="comments-container">
              <h3>Comments</h3>
              {comments.map((comment) => {
                const isUserComment =
                  userValueFromContext.user.username === comment.author;
                const formattedCommentDate = new Date(
                  comment.created_at
                ).toLocaleString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                });
                return (
                  <div className="comment-box" key={comment.comment_id}>
                    <p>{comment.body}</p>
                    <p>{formattedCommentDate}</p>
                    <p>By: {comment.author}</p>
                    {isUserComment ? (
                      <button
                        type="button"
                        onClick={() => {
                          handleDelete(comment.comment_id);
                        }}
                      >
                        delete
                      </button>
                    ) : (
                      <></>
                    )}
                  </div>
                );
              })}
            </div>
            <PostComment setComments={setComments} review_id={review_id} />
          </div>
        </div>
      )}
    </div>
  );
};
