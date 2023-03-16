import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostComment } from "./PostComment.jsx";
import { Profile } from "./Profile.jsx";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import {
  deleteComment,
  getCommentsOfReview,
  getSingleReview,
  patchVotes,
} from "../api/api";

export const IndvReview = () => {
  const { review_id } = useParams();
  const [review, setReview] = useState({});
  const [comments, setComments] = useState([]);
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
  }, [review_id]);

  const upVote = () => {
    setVotes((currVotes) => currVotes + 1);
    patchVotes(review_id).catch((err) => {
      if (err) {
        setVotes((currVotes) => currVotes - 1);
      }
    });
  };

  const handleDelete = (comment_id) => {
    deleteComment(comment_id).then(() => {
      setComments((currComments) => {
        const newComments = [...currComments];
        newComments.shift();
        return newComments;
      });
    });
  };

  const formattedDate = new Date(review.created_at).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <div>
      <Profile />
      <div id="review-pg-container">
        <div id="review-container">
          <h1>{review.title}</h1>
          <img src={review.review_img_url} alt={review.title} />
          <p>{review.review_body}</p>
          <p>By {review.owner}</p>
          <span>
            <p>Votes: {votes}</p>
            <button type="button" onClick={upVote}>
              +
            </button>
          </span>
          <p>{formattedDate}</p>
        </div>
        <div id="comments-container">
          <h3>Comments</h3>
          {comments.map((comment) => {
            console.log(comment);
            const isUserComment =
              userValueFromContext.user.username === comment.author;
            const formattedCommentDate = new Date(
              comment.created_at
            ).toLocaleString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            });
            console.log(formattedCommentDate);
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
  );
};
