import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { CommentsSection } from "./CommentsSection.jsx";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { getSingleReview, patchVotes, patchVotesMinus } from "../api/api";
import {
  Button,
  Dropdown,
  DropdownButton,
  Navbar,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { DarkModeContext } from "../contexts/DarkModeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import logoLight from "../images/logoLight.png";
import logoDark from "../images/logoDark.png";

export const IndvReview = ({ checked, setChecked, users }) => {
  const { review_id } = useParams();
  const [review, setReview] = useState({});
  const [hasVoted, setHasVoted] = useState(false);
  const [votes, setVotes] = useState(0);
  const [author, setAuthor] = useState({});

  const userValueFromContext = useContext(UserContext);
  const darkModeValueFromContext = useContext(DarkModeContext);

  const darkModeVar = darkModeValueFromContext.darkMode === true;

  useEffect(() => {
    getSingleReview(review_id).then((review) => {
      setReview(review);
      setVotes(review.votes);
      const findAuthor = users.find((user) => {
        return user.username === review.owner;
      });
      setAuthor(findAuthor);
    });
  }, [review_id]);

  const handleChange = () => {
    setChecked(!checked);
    if (darkModeValueFromContext.darkMode === false) {
      darkModeValueFromContext.setDarkMode(true);
    } else darkModeValueFromContext.setDarkMode(false);
  };

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

  const handleLogOut = () => {
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
          <Button type="button">Log in</Button>
        </Link>
      ) : (
        <Container fluid>
          <Row>
            <Col md={12} id="col-nav">
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
                          darkModeVar
                            ? "dropdown-item-dark"
                            : "dropdown-item-light"
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
                          darkModeVar
                            ? "dropdown-item-dark"
                            : "dropdown-item-light"
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
                            <label className="form-check-label">
                              Dark Mode
                            </label>
                          </form>
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Item
                        id={`${
                          darkModeVar
                            ? "dropdown-item-dark"
                            : "dropdown-item-light"
                        }`}
                      >
                        {" "}
                        <Link to="/">
                          <Button
                            type="button"
                            onClick={handleLogOut}
                            id={`${
                              darkModeVar ? "dark-log-out" : "light-log-out"
                            }`}
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
            </Col>
          </Row>

          <Row
            style={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Col
              md={7}
              style={{ height: "100%" }}
              className={`${
                darkModeVar ? "left-column-dark" : "left-column-light"
              }`}
            >
              <div>
                <h1
                  className={`review-title ${darkModeVar ? "dark-mode" : ""}`}
                >
                  {review.title}
                </h1>
                <div id="nameAndDp">
                  <img src={author.avatar_url} alt="authorDp" id="dpInSingle" />
                  <strong>
                    {" "}
                    <p style={{ marginBottom: "0px" }}>{author.name}</p>
                  </strong>
                  <p id="date">{formattedDate}</p>
                </div>
                <div>
                  <img
                    src={review.review_img_url}
                    alt=""
                    className="left-top"
                  />
                  <div className="vote-sec">
                    <div id="likes-sec">
                      <div>
                        <Button
                          type="toggle"
                          onClick={upVote}
                          id="like-heart-singlepg"
                          className={`btn like-btn ${
                            darkModeVar ? "btn-dark" : "btn-light"
                          }`}
                        >
                          <FontAwesomeIcon
                            icon={faHeart}
                            className={`like-heart ${hasVoted ? "liked" : ""} ${
                              darkModeVar ? "dark-mode" : ""
                            } `}
                            size="2xl"
                          />{" "}
                        </Button>
                      </div>

                      <div id="numLikes">
                        {" "}
                        <p className="vote-text">{votes} likes</p>
                      </div>
                    </div>
                    <div className="commentsOnSingle">
                      <p
                        id={`${
                          darkModeVar
                            ? "commentsOnSingle-dark"
                            : "commentsOnSingle-light"
                        }`}
                      >
                        {" "}
                        <FontAwesomeIcon
                          icon={faComment}
                          size="xl"
                          id="card-heart"
                        />
                      </p>{" "}
                      <p> {review.comment_count} Comments</p>
                    </div>
                  </div>
                  <p className="reviewBody-full"> {review.review_body}</p>
                </div>
              </div>
            </Col>
            <Col
              md={5}
              style={{ height: "100%" }}
              className={`${
                darkModeVar ? "right-column-dark" : "right-column-light"
              }`}
            >
              <CommentsSection
                author={author}
                formattedDate={formattedDate}
                users={users}
              />
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};
