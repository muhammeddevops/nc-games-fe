import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getReviews } from "../api/api";
import { Profile } from "./Profile.jsx";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Card, Button, Dropdown, DropdownButton } from "react-bootstrap";
import { DarkModeContext } from "../contexts/DarkModeContext";

export const ReviewsList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [selectedSortBy, setSelectedSortBy] = useState("created_at");
  const [selectedOrderBy, setSelectedOrderBy] = useState("DESC");
  const [selectedLimit, setSelectedLimit] = useState(10);
  const [currPage, setCurrPage] = useState(1);
  const [onFirstPage, setOnFirstPage] = useState(false);
  const [onLastPage, setOnLastPage] = useState(false);
  const [onMiddlePage, setOnMiddlePage] = useState(false);
  const [checked, setChecked] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const userValueFromContext = useContext(UserContext);
  const darkModeValueFromContext = useContext(DarkModeContext);

  console.log(darkModeValueFromContext.darkMode);

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
    if (reviews.page === 1) {
      setOnFirstPage(true);
      setOnLastPage(false);
      setOnMiddlePage(false);
    } else if (
      reviews.page !== undefined &&
      reviews.page === reviews.accNumofPages
    ) {
      setOnLastPage(true);
      setOnFirstPage(false);
      setOnMiddlePage(false);
    } else if (reviews.page !== 1 && reviews.page !== reviews.accNumofPages) {
      setOnMiddlePage(true);
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

  const lightModeVar = darkModeValueFromContext.darkMode === false;

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
      <div className="loading-spinner">
        <h3>Loading content...</h3>
        <div className="spinner-border"></div>
      </div>
    );
  } else {
    return (
      <div className={`page-body ${darkModeVar ? "dark-mode" : ""}`}>
        <div id="filter-results-sec">
          <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
            <ul className="navbar-nav">
              <li>
                <Link to="/categories" className="nav-link">
                  <p>Categories</p>
                </Link>
              </li>
              <li>
                <Link to="/post-review" className="nav-link">
                  <p>Post a review</p>
                </Link>
              </li>

              {/* <!-- Dropdown --> */}
              <li className="nav-item dropdown ">
                <DropdownButton
                  id="dropdown-basic-button"
                  title={`Sort by: ${selectedSortByDisplay}`}
                >
                  <Dropdown.Item onClick={() => handleSort("created_at")}>
                    Date
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSort("owner")}>
                    Owner
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSort("title")}>
                    Title
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSort("votes")}>
                    Votes
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSort("designer")}>
                    Designer
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSort("comment_count")}>
                    Num of comments
                  </Dropdown.Item>
                </DropdownButton>
              </li>

              <li className="nav-item dropdown">
                <DropdownButton
                  id="dropdown-basic-button"
                  title={`${
                    selectedOrderBy === "DESC" ? "High - Low" : "Low - High"
                  }`}
                >
                  <Dropdown.Item onClick={() => handleOrder("DESC")}>
                    Descending
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleOrder("ASC")}>
                    Ascending
                  </Dropdown.Item>
                </DropdownButton>
              </li>

              <li className="nav-item dropdown">
                <DropdownButton
                  id="dropdown-basic-button"
                  title={`Results per page: ${selectedLimit}`}
                >
                  <Dropdown.Item onClick={() => handleLimit("5")}>
                    5
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleLimit("10")}>
                    10
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleLimit("15")}>
                    15
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleLimit("20")}>
                    20
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleLimit("25")}>
                    25
                  </Dropdown.Item>
                </DropdownButton>
              </li>
              {/* 
              <li class="nav-item secondary">
                <Profile className="nav-item" />
              </li> */}
              {/* <li class="nav-item">
                {" "}
                <Link to="/">
                  <button type="button" onClick={handleLogOut}>
                    Log out
                  </button>
                </Link>
              </li> */}

              <li className="nav-item dropdown">
                <DropdownButton id="dropdown-basic-button" title="Settings">
                  <Dropdown.Item>
                    Logged in as{" "}
                    <strong>{userValueFromContext.user.username}</strong>
                    <img
                      className="nav-item"
                      id="display-pic-in-dropdown"
                      src="https://vignette.wikia.nocookie.net/mrmen/images/7/7e/MrMen-Bump.png/revision/latest?cb=20180123225553"
                      alt="Logo"
                    />
                  </Dropdown.Item>
                  <Dropdown.Item>
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
                  <Dropdown.Item>
                    {" "}
                    <Link to="/">
                      <button
                        type="button"
                        onClick={handleLogOut}
                        className="btn btn-primary log-out-btn"
                      >
                        Log out
                      </button>
                    </Link>
                  </Dropdown.Item>
                </DropdownButton>
              </li>
            </ul>

            <img
              className="nav-item"
              id="display-pic"
              src="https://vignette.wikia.nocookie.net/mrmen/images/7/7e/MrMen-Bump.png/revision/latest?cb=20180123225553"
              alt="Logo"
            />
          </nav>
        </div>

        <div className={`results-range ${darkModeVar ? "dark-mode" : ""}`}>
          <p>{reviews.range}</p>
        </div>

        <div className={`reviews-container ${darkModeVar ? "dark-mode" : ""}`}>
          {reviews.results.map((review) => {
            const dDate = new Date(review.created_at).toLocaleString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            });
            return (
              <Card
                style={{ width: "20rem" }}
                className={`review-card ${
                  darkModeVar ? "bg-secondary" : "bg-light"
                }`}
                key={review.review_id}
              >
                {" "}
                <Card.Img variant="top" src={review.review_img_url} />
                <Card.Body>
                  <Link
                    to={`/reviews/${review.review_id}`}
                    key={review.review_id}
                  >
                    <Card.Title
                      className={`review-title ${
                        darkModeVar ? "dark-mode" : ""
                      }`}
                    >
                      {review.title}
                    </Card.Title>
                  </Link>
                  <Card.Text>
                    By {review.owner}
                    <br />
                    Votes: {review.votes}
                  </Card.Text>
                </Card.Body>
              </Card>
              // <Link to={`/reviews/${review.review_id}`} key={review.review_id}>
              //   <div className="review-square">
              //     <img src={review.review_img_url} alt={review.review_id} />
              //     <h4>{review.title}</h4>
              //     <div className="author-date">
              //       <p>By {review.owner}</p>
              //       <p>{formattedDate}</p>
              //       <p>Votes: {review.votes}</p>
              //     </div>
              //     <p> {review.comment_count} comments </p>
              //   </div>
              // </Link>
            );
          })}
        </div>
        <div className={`pagination-unit ${darkModeVar ? "dark-mode" : ""}`}>
          <ul className="pagination justify-content-center">
            <li className="page-item">
              <button
                className={`page-link ${onFirstPage ? "disabled" : ""}`}
                type="button"
                onClick={() => {
                  prevPage(reviews.page, reviews.accNumofPages);
                }}
              >
                Prev
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
                    {pageNum}
                  </a>
                </li>
              );
            })}

            <li className="page-item">
              <button
                className={`page-link ${onLastPage ? "disabled" : ""}`}
                type="button"
                onClick={() => {
                  nextPage(reviews.page, reviews.accNumofPages);
                }}
              >
                Next
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
};
