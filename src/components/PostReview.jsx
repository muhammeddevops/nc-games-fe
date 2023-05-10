import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { postReview } from "../api/api";
import { UserContext } from "../contexts/UserContext";
import { Dropdown, DropdownButton, Navbar, Button } from "react-bootstrap";
import { DarkModeContext } from "../contexts/DarkModeContext";
import logoLight from "../images/logoLight.png";
import logoDark from "../images/logoDark.png";

export const PostReview = ({ categories, setReviews, checked, setChecked }) => {
  const [title, setTitle] = useState("");
  const [reviewBody, setReviewBody] = useState("");
  const [designer, setDesigner] = useState("");
  const [categoryState, setCategoryState] = useState("strategy");
  const [imgUrl, setImgUrl] = useState("");
  const darkModeValueFromContext = useContext(DarkModeContext);
  const userValueFromContext = useContext(UserContext);

  const urlRegex =
    /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleLogOut = () => {
    userValueFromContext.setUser(null);
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

  const handleChange = () => {
    setChecked(!checked);
    if (darkModeValueFromContext.darkMode === false) {
      darkModeValueFromContext.setDarkMode(true);
    } else darkModeValueFromContext.setDarkMode(false);
  };

  const darkModeVar = darkModeValueFromContext.darkMode === true;

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

  return (
    <div className="post-review-pg">
      {!userValueFromContext.user ? (
        <Link to="/">
          <button type="button">Log in</button>
        </Link>
      ) : (
        <div className={`page-body-pr ${darkModeVar ? "dark-mode" : ""}`}>
          <Navbar
            expand="sm"
            id={`${darkModeVar ? "navbar-dark" : "navbar-light"}`}
          >
            <ul className="navbar-nav">
              <li>
                <Link to="/homepage">
                  <img
                    src={`${darkModeVar ? logoDark : logoLight}`}
                    alt=""
                    id="logo"
                  />
                </Link>
              </li>
              <li>
                <Link to="/post-review" className="nav-link">
                  <strong>
                    <p
                      className={`${
                        darkModeVar
                          ? "post-review-p-dark"
                          : "post-review-p-light"
                      }`}
                    >
                      Post a review
                    </p>
                  </strong>
                </Link>
              </li>

              <li className="nav-item dropdown">
                <DropdownButton
                  id={`${darkModeVar ? "dropdown-dark" : "dropdown-light"}`}
                  title="Settings ⚙"
                >
                  <Dropdown.Item
                    id={`${
                      darkModeVar ? "dropdown-item-dark" : "dropdown-item-light"
                    }`}
                  >
                    Logged in as{" "}
                    <strong>{userValueFromContext.user.username}</strong>
                    <img
                      className="nav-item"
                      id="display-pic-in-dropdown"
                      src="https://vignette.wikia.nocookie.net/mrmen/images/7/7e/MrMen-Bump.png/revision/latest?cb=20180123225553"
                      alt="Logo"
                    />
                  </Dropdown.Item>
                  <Dropdown.Item
                    id={`${
                      darkModeVar ? "dropdown-item-dark" : "dropdown-item-light"
                    }`}
                  >
                    <div
                      className="form-check form-switch"
                      onClick={function (e) {
                        handleChange();
                        e.stopPropagation();
                      }}
                    >
                      <form>
                        {" "}
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={checked}
                          onChange={handleChange}
                          onClick={function (e) {
                            e.stopPropagation();
                          }}
                        />
                        <label className="form-check-label">Dark Mode</label>
                      </form>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item
                    id={`${
                      darkModeVar ? "dropdown-item-dark" : "dropdown-item-light"
                    }`}
                  >
                    {" "}
                    <Link to="/">
                      <Button
                        type="button"
                        onClick={handleLogOut}
                        id={`${darkModeVar ? "dark-log-out" : "light-log-out"}`}
                      >
                        Log out
                      </Button>
                    </Link>
                  </Dropdown.Item>
                </DropdownButton>
              </li>
              <li className="nav-item me-auto">
                <img
                  id="display-pic"
                  src="https://vignette.wikia.nocookie.net/mrmen/images/7/7e/MrMen-Bump.png/revision/latest?cb=20180123225553"
                  alt="Logo"
                />
              </li>
            </ul>
          </Navbar>

          <h2 className={`post-review-hdr ${darkModeVar ? "dark-mode" : ""}`}>
            Post a review
          </h2>
          <div className={`post-container ${darkModeVar ? "dark-mode" : ""}`}>
            <form action="" className="post-form" onSubmit={handlePost}>
              <div className="mb-3 mt-3">
                <label htmlFor="category" className="form-label">
                  Category:
                </label>
                <select
                  className="form-control"
                  name="trial"
                  id="category"
                  onChange={handleCategory}
                >
                  {categories.map((category) => {
                    const upperCased =
                      category.slug[0].toUpperCase() + category.slug.slice(1);
                    console.log(upperCased);
                    return (
                      <option value={category.slug} key={category.slug}>
                        {upperCased}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-3 mt-3">
                <label htmlFor="review-title" className="form-label">
                  Review Title:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="review-title"
                  placeholder="Title"
                  name="text"
                  onChange={handleTitle}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="review" className="form-label">
                  Review:
                </label>
                <textarea
                  className="form-control"
                  placeholder="Help other users by leaving a detailed review."
                  rows="5"
                  id="review"
                  name="text"
                  onChange={handleReview}
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="designer" className="form-label">
                  Designer:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="designer"
                  name="text"
                  value={designer}
                  placeholder="Board game designer"
                  onChange={handleDesigner}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="designer" className="form-label">
                  Pictures speak a thousand words. Add an image
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="text"
                  value={imgUrl}
                  placeholder="Paste an image url here"
                  id="img-url"
                  onChange={handleUrl}
                />
              </div>

              <button
                type="submit"
                id={`${darkModeVar ? "postRevBtn-dark" : "postRevBtn-light"}`}
                className="btn btn-primary"
              >
                Post
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
