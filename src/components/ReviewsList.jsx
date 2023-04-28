import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getReviews } from "../api/api";
import { Profile } from "./Profile.jsx";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Card, Button, Dropdown, DropdownButton } from "react-bootstrap";

export const ReviewsList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [selectedSortBy, setSelectedSortBy] = useState("created_at");
  const [selectedOrderBy, setSelectedOrderBy] = useState("DESC");
  const [selectedLimit, setSelectedLimit] = useState(10);
  const [currPage, setCurrPage] = useState(1);
  const userValueFromContext = useContext(UserContext);

  useEffect(() => {
    setIsLoading(true);
    getReviews(selectedSortBy, selectedOrderBy, selectedLimit, currPage).then(
      (reviews) => {
        setReviews(reviews);
        setIsLoading(false);
      }
    );
  }, [selectedSortBy, selectedOrderBy, selectedLimit, currPage]);

  const handleSort = (sortBy) => {
    setSelectedSortBy(sortBy);
  };

  const handleOrder = (orderBy) => {
    setSelectedOrderBy(orderBy);
  };

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
    return <h3>Loading content...</h3>;
  } else {
    return (
      <div>
        <div id="filter-results-sec">
          <nav class="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
            <ul class="navbar-nav">
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
              <li class="nav-item dropdown">
                <DropdownButton
                  id="dropdown-basic-button"
                  title={`Sort by: ${selectedSortByDisplay}`}
                >
                  <Dropdown.Item onClick={() => handleSort("created_at")}>
                    Date
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSort("Owner")}>
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

              <li class="nav-item dropdown">
                <DropdownButton
                  id="dropdown-basic-button"
                  title={`Order by: ${
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

              <li class="nav-item dropdown">
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
                  <Dropdown.Item onClick={() => handleSort("20")}>
                    20
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSort("25")}>
                    25
                  </Dropdown.Item>
                </DropdownButton>
              </li>

              <li class="nav-item">
                <Profile className="nav-item" />
              </li>
              <li class="nav-item">
                {" "}
                <Link to="/">
                  <button type="button" onClick={handleLogOut}>
                    Log out
                  </button>
                </Link>
              </li>
            </ul>
            <img
              class="nav-item"
              id="display-pic"
              src="https://vignette.wikia.nocookie.net/mrmen/images/7/7e/MrMen-Bump.png/revision/latest?cb=20180123225553"
              alt="Logo"
            />
          </nav>

          <p>{reviews.range}</p>
        </div>
        <div id="reviews-container">
          {reviews.results.map((review) => {
            const dDate = new Date(review.created_at).toLocaleString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            });
            return (
              <Link>
                <Card style={{ width: "18rem" }}></Card>
                <Card.Img variant="top" src={review.review_img_url} />
                <Card.Body>
                  <Card.Title>{review.title}</Card.Title>
                  <Card.Text>
                    <p>By {review.owner}</p>
                    <p>Votes: {review.votes}</p>
                  </Card.Text>
                </Card.Body>
              </Link>
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
        <p>Page: {reviews.page}</p>
        {reviews.page > 1 ? (
          <button
            type="button"
            onClick={() => {
              prevPage(reviews.page, reviews.accNumofPages);
            }}
          >
            {" "}
            &lt;
          </button>
        ) : null}

        {reviews.page < reviews.accNumofPages ? (
          <button
            type="button"
            onClick={() => {
              nextPage(reviews.page, reviews.accNumofPages);
            }}
          >
            &gt;
          </button>
        ) : null}
      </div>
    );
  }
};
