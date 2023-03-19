import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { postReview } from "../api/api";
import { UserContext } from "../contexts/UserContext";
import { Profile } from "./Profile";

export const PostReview = ({ categories, setReviews }) => {
  const [input, setInput] = useState("");
  const [title, setTitle] = useState("");
  const [reviewBody, setReviewBody] = useState("");
  const [designer, setDesigner] = useState("");
  const [categoryState, setCategoryState] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const userValueFromContext = useContext(UserContext);

  const urlRegex =
    /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleReview = (event) => {
    setReviewBody(event.target.value);
  };

  const handleCategory = (event) => {
    setCategoryState(event.target.value);
  };

  const handleDesigner = (event) => {
    setDesigner(event.target.value);
  };
  const handleUrl = (event) => {
    setImgUrl(event.target.value);
  };

  const handlePost = (event) => {
    event.preventDefault();
    if (
      title !== "" ||
      reviewBody !== "" ||
      designer !== "" ||
      categoryState !== "" ||
      urlRegex.test(imgUrl)
    ) {
      postReview(
        userValueFromContext.user.username,
        title,
        reviewBody,
        designer,
        categoryState,
        imgUrl
      )
        .then((newReviewFromApi) => {
          setReviews((currReviews) => {
            return [newReviewFromApi, ...currReviews];
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  console.log(title);
  console.log(reviewBody);
  console.log(designer);
  console.log(categoryState);
  console.log(imgUrl);
  console.log(userValueFromContext.user);

  return (
    <div>
      {!userValueFromContext.user ? (
        <Link to="/">
          <button type="button">Log in</button>
        </Link>
      ) : (
        <div>
          <Profile />
          <h2>Post a review</h2>
          <form onSubmit={handlePost}>
            <label htmlFor="title">Review Title</label>
            <input
              value={title}
              type="text"
              placeholder="Title"
              id="title"
              onChange={handleTitle}
            />

            <label htmlFor="review-body">Review</label>
            <input
              value={reviewBody}
              type="text"
              placeholder="Review"
              id="review-body"
              onChange={handleReview}
            />

            <label htmlFor="designer">Designer</label>
            <input
              value={designer}
              type="text"
              placeholder="Designer"
              id="designer"
              onChange={handleDesigner}
            />

            <label htmlFor="category">Category</label>
            <select
              name="category"
              value={categoryState}
              type="text"
              placeholder="category"
              id="title"
              onChange={handleCategory}
            >
              {categories.map((category) => {
                return <option value={category.slug}>{category.slug}</option>;
              })}
            </select>

            <label htmlFor="img-url">
              Pictures speak a thousand words: add an image
            </label>
            <input
              value={imgUrl}
              type="text"
              placeholder="img url"
              id="img-url"
              onChange={handleUrl}
            />
            <button type="submit">Post</button>
          </form>
        </div>
      )}
    </div>
  );
};
