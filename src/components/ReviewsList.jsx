import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getReviews } from "../api/api";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import {
  Card,
  Button,
  Dropdown,
  DropdownButton,
  Navbar,
} from "react-bootstrap";
import { DarkModeContext } from "../contexts/DarkModeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import logoLight from "../images/logoLight.png";
import logoDark from "../images/logoDark.png";

export const ReviewsList = ({ checked, setChecked, categories }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [selectedSortBy, setSelectedSortBy] = useState("created_at");
  const [selectedOrderBy, setSelectedOrderBy] = useState("DESC");
  const [selectedLimit, setSelectedLimit] = useState(10);
  const [currPage, setCurrPage] = useState(1);
  const [onFirstPage, setOnFirstPage] = useState(false);
  const [onLastPage, setOnLastPage] = useState(false);
  const userValueFromContext = useContext(UserContext);
  const darkModeValueFromContext = useContext(DarkModeContext);

  useEffect(() => {
    setIsLoading(true);
    getReviews(selectedSortBy, selectedOrderBy, selectedLimit, currPage).then(
      (reviews) => {
        setReviews(reviews);
        setIsLoading(false);
      }
    );
  }, [selectedSortBy, selectedOrderBy, selectedLimit, currPage]);

  useEffect(() => {
    if (reviews.page === 1 && reviews.page === reviews.accNumofPages) {
      setOnFirstPage(true);
      setOnLastPage(true);
    } else if (reviews.page === 1) {
      setOnFirstPage(true);
      setOnLastPage(false);
    } else if (
      reviews.page !== undefined &&
      reviews.page === reviews.accNumofPages
    ) {
      setOnLastPage(true);
      setOnFirstPage(false);
    } else if (reviews.page !== 1 && reviews.page !== reviews.accNumofPages) {
      setOnFirstPage(false);
      setOnLastPage(false);
    }
  }, [reviews]);

  const handleSort = (sortBy) => {
    setSelectedSortBy(sortBy);
  };

  const handleOrder = (orderBy) => {
    setSelectedOrderBy(orderBy);
  };

  const handleChange = () => {
    setChecked(!checked);
    if (darkModeValueFromContext.darkMode === false) {
      darkModeValueFromContext.setDarkMode(true);
    } else darkModeValueFromContext.setDarkMode(false);
  };

  const darkModeVar = darkModeValueFromContext.darkMode === true;

  const handleLimit = (limit) => {
    setSelectedLimit(limit);
  };

  const nextPage = (pageOn, totalPages) => {
    if (pageOn < totalPages) {
      setCurrPage((currentPage) => {
        return (currentPage += 1);
      });
    }
  };

  const prevPage = (pageOn, totalPages) => {
    if (pageOn > 1) {
      setCurrPage((currentPage) => {
        return (currentPage -= 1);
      });
    }
  };

  const goToPage = (i) => {
    setCurrPage(i);
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleLogOut = () => {
    userValueFromContext.setUser(null);
  };

  let selectedSortByDisplay = "";

  if (selectedSortBy === "created_at") {
    selectedSortByDisplay = "Date";
  } else if (selectedSortBy === "comment_count") {
    selectedSortByDisplay = "Num of comments";
  } else {
    selectedSortByDisplay = `${selectedSortBy[0].toUpperCase()}${selectedSortBy.slice(
      1
    )}`;
  }

  if (isLoading) {
    return (
      <div
        className={`loading-content ${
          darkModeValueFromContext ? "dark-mode" : ""
        }`}
      >
        <h1>Loading content...</h1>
        <div className="spinner-border"></div>
      </div>
    );
  } else {
    return (
      <div className={`page-body ${darkModeVar ? "dark-mode" : ""}`}>
        <div id="filter-results-sec">
          <Navbar
            expand="sm"
            id={`${darkModeVar ? "navbar-dark" : "navbar-light"}`}
            fixed="top"
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

              <li className="nav-item dropdown ">
                <DropdownButton
                  id={`${darkModeVar ? "dropdown-dark" : "dropdown-light"}`}
                  title={`Sort by: ${selectedSortByDisplay}`}
                >
                  <Dropdown.Item
                    id={`${
                      darkModeVar ? "dropdown-item-dark" : "dropdown-item-light"
                    }`}
                    onClick={() => handleSort("created_at")}
                  >
                    Date
                  </Dropdown.Item>
                  <Dropdown.Item
                    id={`${
                      darkModeVar ? "dropdown-item-dark" : "dropdown-item-light"
                    }`}
                    onClick={() => handleSort("owner")}
                  >
                    Owner
                  </Dropdown.Item>
                  <Dropdown.Item
                    id={`${
                      darkModeVar ? "dropdown-item-dark" : "dropdown-item-light"
                    }`}
                    onClick={() => handleSort("title")}
                  >
                    Title
                  </Dropdown.Item>
                  <Dropdown.Item
                    id={`${
                      darkModeVar ? "dropdown-item-dark" : "dropdown-item-light"
                    }`}
                    onClick={() => handleSort("votes")}
                  >
                    Likes
                  </Dropdown.Item>
                  <Dropdown.Item
                    id={`${
                      darkModeVar ? "dropdown-item-dark" : "dropdown-item-light"
                    }`}
                    onClick={() => handleSort("designer")}
                  >
                    Designer
                  </Dropdown.Item>
                  <Dropdown.Item
                    id={`${
                      darkModeVar ? "dropdown-item-dark" : "dropdown-item-light"
                    }`}
                    onClick={() => handleSort("comment_count")}
                  >
                    Num of comments
                  </Dropdown.Item>
                </DropdownButton>
              </li>

              <li className="nav-item dropdown">
                <DropdownButton
                  id={`${darkModeVar ? "dropdown-dark" : "dropdown-light"}`}
                  title={`${
                    selectedOrderBy === "DESC" ? "High - Low" : "Low - High"
                  }`}
                >
                  <Dropdown.Item
                    id={`${
                      darkModeVar ? "dropdown-item-dark" : "dropdown-item-light"
                    }`}
                    onClick={() => handleOrder("DESC")}
                  >
                    Descending
                  </Dropdown.Item>
                  <Dropdown.Item
                    id={`${
                      darkModeVar ? "dropdown-item-dark" : "dropdown-item-light"
                    }`}
                    onClick={() => handleOrder("ASC")}
                  >
                    Ascending
                  </Dropdown.Item>
                </DropdownButton>
              </li>

              <li className="nav-item dropdown">
                <DropdownButton
                  id={`${darkModeVar ? "dropdown-dark" : "dropdown-light"}`}
                  title={`Results per page: ${selectedLimit}`}
                >
                  <Dropdown.Item
                    id={`${
                      darkModeVar ? "dropdown-item-dark" : "dropdown-item-light"
                    }`}
                    onClick={() => handleLimit("5")}
                  >
                    5
                  </Dropdown.Item>
                  <Dropdown.Item
                    id={`${
                      darkModeVar ? "dropdown-item-dark" : "dropdown-item-light"
                    }`}
                    onClick={() => handleLimit("10")}
                  >
                    10
                  </Dropdown.Item>
                  <Dropdown.Item
                    id={`${
                      darkModeVar ? "dropdown-item-dark" : "dropdown-item-light"
                    }`}
                    onClick={() => handleLimit("15")}
                  >
                    15
                  </Dropdown.Item>
                  <Dropdown.Item
                    id={`${
                      darkModeVar ? "dropdown-item-dark" : "dropdown-item-light"
                    }`}
                    onClick={() => handleLimit("20")}
                  >
                    20
                  </Dropdown.Item>
                  <Dropdown.Item
                    id={`${
                      darkModeVar ? "dropdown-item-dark" : "dropdown-item-light"
                    }`}
                    onClick={() => handleLimit("25")}
                  >
                    25
                  </Dropdown.Item>
                </DropdownButton>
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
                      src={userValueFromContext.user.avatar_url}
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
                  src={userValueFromContext.user.avatar_url}
                  alt="Logo"
                />
              </li>
            </ul>
          </Navbar>
        </div>

        <div className="filter-by-cat">
          <h5 id={`${darkModeVar ? "filter-hdr-dark" : "filter-hdr-light"}`}>
            Filter by category
          </h5>
          <ul className="category-ul">
            <Link to="/homepage" id="category-item">
              <li>
                <p
                  type="button"
                  className={`${
                    darkModeVar
                      ? "category-list-item-dark"
                      : "category-list-item-light"
                  }`}
                >
                  All
                </p>
              </li>
            </Link>
            {categories.map((category) => {
              const upperCase = capitalizeFirstLetter(category.slug);

              return (
                <Link
                  to={`/categories/${category.slug}`}
                  key={category.slug}
                  id="category-item"
                >
                  <li key={category.slug}>
                    <p
                      type="button"
                      className={`${
                        darkModeVar
                          ? "category-list-item-dark"
                          : "category-list-item-light"
                      }`}
                    >
                      {`${upperCase}`}
                    </p>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>

        <div>
          <p className={`results-range ${darkModeVar ? "dark-mode" : ""}`}>
            {reviews.range}
          </p>
        </div>

        <div className={`reviews-container ${darkModeVar ? "dark-mode" : ""}`}>
          {reviews.results.map((review) => {
            return (
              <Card
                style={{ width: "20rem" }}
                id={`${darkModeVar ? "card-dark-mode" : "card-light-mode"}`}
                key={review.review_id}
              >
                {" "}
                <Card.Body>
                  <Link
                    to={`/reviews/${review.review_id}`}
                    key={review.review_id}
                    id="review-link"
                  >
                    <Card.Img
                      variant="top"
                      src={review.review_img_url}
                      className="card-img"
                    />
                    <Card.Title
                      id={`${darkModeVar ? "dark-title" : "light-title"}`}
                    >
                      {review.title}
                    </Card.Title>
                  </Link>
                  <Card.Text
                    id={`${
                      darkModeVar ? "cards-text-dark" : "cards-text-light"
                    }`}
                  >
                    <p>By {review.owner}</p>
                    <div className="likesOnList">
                      <p id="heartOnList">
                        {" "}
                        <FontAwesomeIcon
                          icon={faHeart}
                          size="sm"
                          id="card-heart"
                        />
                      </p>{" "}
                      <p> {review.votes} Likes</p>
                    </div>
                    <div className="likesOnList">
                      <p
                        id={`${
                          darkModeVar
                            ? "commentsOnList-dark"
                            : "commentsOnList-light"
                        }`}
                      >
                        {" "}
                        <FontAwesomeIcon
                          icon={faComment}
                          size="sm"
                          id="card-heart"
                        />
                      </p>{" "}
                      <p> {review.comment_count} Comments</p>
                    </div>
                  </Card.Text>
                  <Card.Text
                    id={`${
                      darkModeVar
                        ? "dark-reviewSynopsis"
                        : "light-reviewSynopsis"
                    }`}
                  >
                    {review.review_body}
                  </Card.Text>
                </Card.Body>
                <Link to={`/reviews/${review.review_id}`}>
                  <Button
                    className="readMoreBtn"
                    id={`${darkModeVar ? "read-more-dark" : "read-more-light"}`}
                  >
                    Read More...
                  </Button>
                </Link>
              </Card>
            );
          })}
        </div>
        <div
          className={`pagination-unit ${
            darkModeVar ? "dark-mode" : "light-mode"
          }`}
        >
          <ul
            className={`pagination justify-content-center ${
              darkModeVar ? "dark-mode" : "light-mode"
            }`}
          >
            <li className="page-item">
              <button
                className={`page-link ${onFirstPage ? "disabled" : ""}`}
                type="button"
                onClick={() => {
                  prevPage(reviews.page, reviews.accNumofPages);
                }}
              >
                <strong className="boldest">Prev</strong>
              </button>
            </li>
            {Array.from(Array(reviews.accNumofPages), (e, i) => {
              const pageNum = i + 1;
              return (
                <li className="page-item" key={i}>
                  <a
                    className={`page-link ${
                      reviews.page === pageNum ? "active" : ""
                    }`}
                    onClick={() => {
                      goToPage(pageNum);
                    }}
                  >
                    <strong className="boldest">{pageNum}</strong>
                  </a>
                </li>
              );
            })}

            <li className="page-item">
              <Button
                className={`page-link ${onLastPage ? "disabled" : ""}`}
                type="button"
                onClick={() => {
                  nextPage(reviews.page, reviews.accNumofPages);
                }}
              >
                <strong className="boldest">Next</strong>
              </Button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
};
