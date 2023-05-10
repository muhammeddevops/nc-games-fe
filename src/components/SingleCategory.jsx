import { Link, useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { getReviewsByCategory } from "../api/api";
import { DarkModeContext } from "../contexts/DarkModeContext";
import {
  Dropdown,
  DropdownButton,
  Card,
  Navbar,
  Button,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import logoLight from "../images/logoLight.png";
import logoDark from "../images/logoDark.png";

export const SingleCategory = ({ checked, setChecked, categories }) => {
  const { category } = useParams();
  const [filteredReviewsObj, setFilteredReviewsObj] = useState({});
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [selectedSortBy, setSelectedSortBy] = useState("created_at");
  const [selectedOrderBy, setSelectedOrderBy] = useState("DESC");
  const [selectedLimit, setSelectedLimit] = useState(10);
  const [currPage, setCurrPage] = useState(1);
  const [onFirstPage, setOnFirstPage] = useState(false);
  const [onLastPage, setOnLastPage] = useState(false);

  const darkModeValueFromContext = useContext(DarkModeContext);
  const userValueFromContext = useContext(UserContext);

  const darkModeVar = darkModeValueFromContext.darkMode === true;

  useEffect(() => {
    getReviewsByCategory(
      category,
      selectedSortBy,
      selectedOrderBy,
      selectedLimit,
      currPage
    ).then((reviews) => {
      console.log(reviews);
      setFilteredReviewsObj(reviews);
      setFilteredReviews(reviews.results);
    });
  }, [category, selectedSortBy, selectedOrderBy, selectedLimit, currPage]);

  useEffect(() => {
    if (
      filteredReviewsObj.page === 1 &&
      filteredReviewsObj.page === filteredReviewsObj.accNumofPages
    ) {
      setOnFirstPage(true);
      setOnLastPage(true);
    } else if (filteredReviewsObj.page === 1) {
      setOnFirstPage(true);
      setOnLastPage(false);
    } else if (
      filteredReviewsObj.page !== undefined &&
      filteredReviewsObj.page === filteredReviewsObj.accNumofPages
    ) {
      setOnLastPage(true);
      setOnFirstPage(false);
    } else if (
      filteredReviewsObj.page !== 1 &&
      filteredReviewsObj.page !== filteredReviewsObj.accNumofPages
    ) {
      setOnFirstPage(false);
      setOnLastPage(false);
    }
  }, [filteredReviewsObj]);

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

  const handleSort = (sortBy) => {
    setSelectedSortBy(sortBy);
  };

  const handleOrder = (orderBy) => {
    setSelectedOrderBy(orderBy);
  };

  const handleLimit = (limit) => {
    setSelectedLimit(limit);
  };

  const handleChange = () => {
    setChecked(!checked);
    if (darkModeValueFromContext.darkMode === false) {
      darkModeValueFromContext.setDarkMode(true);
    } else darkModeValueFromContext.setDarkMode(false);
  };

  const upperCase = capitalizeFirstLetter(category);
  let selectedSortByDisplay = "";
  return (
    <div>
      {!userValueFromContext.user ? (
        <Link to="/">
          <button type="button">Log in</button>
        </Link>
      ) : (
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
                        darkModeVar
                          ? "dropdown-item-dark"
                          : "dropdown-item-light"
                      }`}
                      onClick={() => handleSort("created_at")}
                    >
                      Date
                    </Dropdown.Item>
                    <Dropdown.Item
                      id={`${
                        darkModeVar
                          ? "dropdown-item-dark"
                          : "dropdown-item-light"
                      }`}
                      onClick={() => handleSort("owner")}
                    >
                      Owner
                    </Dropdown.Item>
                    <Dropdown.Item
                      id={`${
                        darkModeVar
                          ? "dropdown-item-dark"
                          : "dropdown-item-light"
                      }`}
                      onClick={() => handleSort("title")}
                    >
                      Title
                    </Dropdown.Item>
                    <Dropdown.Item
                      id={`${
                        darkModeVar
                          ? "dropdown-item-dark"
                          : "dropdown-item-light"
                      }`}
                      onClick={() => handleSort("votes")}
                    >
                      Likes
                    </Dropdown.Item>
                    <Dropdown.Item
                      id={`${
                        darkModeVar
                          ? "dropdown-item-dark"
                          : "dropdown-item-light"
                      }`}
                      onClick={() => handleSort("designer")}
                    >
                      Designer
                    </Dropdown.Item>
                    <Dropdown.Item
                      id={`${
                        darkModeVar
                          ? "dropdown-item-dark"
                          : "dropdown-item-light"
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
                        darkModeVar
                          ? "dropdown-item-dark"
                          : "dropdown-item-light"
                      }`}
                      onClick={() => handleOrder("DESC")}
                    >
                      Descending
                    </Dropdown.Item>
                    <Dropdown.Item
                      id={`${
                        darkModeVar
                          ? "dropdown-item-dark"
                          : "dropdown-item-light"
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
                        darkModeVar
                          ? "dropdown-item-dark"
                          : "dropdown-item-light"
                      }`}
                      onClick={() => handleLimit("5")}
                    >
                      5
                    </Dropdown.Item>
                    <Dropdown.Item
                      id={`${
                        darkModeVar
                          ? "dropdown-item-dark"
                          : "dropdown-item-light"
                      }`}
                      onClick={() => handleLimit("10")}
                    >
                      10
                    </Dropdown.Item>
                    <Dropdown.Item
                      id={`${
                        darkModeVar
                          ? "dropdown-item-dark"
                          : "dropdown-item-light"
                      }`}
                      onClick={() => handleLimit("15")}
                    >
                      15
                    </Dropdown.Item>
                    <Dropdown.Item
                      id={`${
                        darkModeVar
                          ? "dropdown-item-dark"
                          : "dropdown-item-light"
                      }`}
                      onClick={() => handleLimit("20")}
                    >
                      20
                    </Dropdown.Item>
                    <Dropdown.Item
                      id={`${
                        darkModeVar
                          ? "dropdown-item-dark"
                          : "dropdown-item-light"
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
                    title="⚙"
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
                          <label className="form-check-label">Dark Mode</label>
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

            <div className="filter-by-cat">
              <h5
                id={`${darkModeVar ? "filter-hdr-dark" : "filter-hdr-light"}`}
              >
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
                          onClick={() => {}}
                        >
                          {`${upperCase}`}
                        </p>
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </div>

            <div id="reviews-container">
              <h2 id={`${darkModeVar ? "cat-hdr-dark" : "cat-hdr-light"}`}>
                {upperCase} games
              </h2>
              <div
                className={`reviews-container ${
                  darkModeVar ? "dark-mode" : ""
                }`}
              >
                {filteredReviews.map((review) => {
                  return (
                    <Card
                      style={{ width: "20rem" }}
                      id={`${
                        darkModeVar ? "card-dark-mode" : "card-light-mode"
                      }`}
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
                                size="0.5x"
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
                                size="0.5x"
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
                          id={`${
                            darkModeVar ? "read-more-dark" : "read-more-light"
                          }`}
                        >
                          Read More...
                        </Button>
                      </Link>
                    </Card>
                  );
                })}
              </div>
            </div>
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
                    prevPage(
                      filteredReviewsObj.page,
                      filteredReviewsObj.accNumofPages
                    );
                  }}
                >
                  <strong className="boldest">Prev</strong>
                </button>
              </li>
              {Array.from(Array(filteredReviewsObj.accNumofPages), (e, i) => {
                const pageNum = i + 1;
                return (
                  <li className="page-item" key={i}>
                    <a
                      className={`page-link ${
                        filteredReviewsObj.page === pageNum ? "active" : ""
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
                    nextPage(
                      filteredReviewsObj.page,
                      filteredReviewsObj.accNumofPages
                    );
                  }}
                >
                  <strong className="boldest">Next</strong>
                </Button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
