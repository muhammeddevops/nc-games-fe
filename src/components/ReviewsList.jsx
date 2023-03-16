import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getReviews } from "../api/api";

export const ReviewsList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [selectedSortBy, setSelectedSortBy] = useState("created_at");
  const [selectedOrderBy, setSelectedOrderBy] = useState("DESC");
  const [selectedLimit, setSelectedLimit] = useState(10);
  const [currPage, setCurrPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    getReviews(selectedSortBy, selectedOrderBy, selectedLimit, currPage).then(
      (reviews) => {
        setReviews(reviews);
        setIsLoading(false);
      }
    );
  }, [selectedSortBy, selectedOrderBy, selectedLimit, currPage]);

  const handleSort = (event) => {
    setSelectedSortBy(event.target.value);
  };

  const handleOrder = (event) => {
    setSelectedOrderBy(event.target.value);
  };

  const handleLimit = (event) => {
    setSelectedLimit(event.target.value);
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

  if (isLoading) {
    return <h3>Loading content...</h3>;
  } else {
    return (
      <div>
        <div id="filter-results-sec">
          <div className="sortby-tools">
            <label htmlFor="sortby">Sort by:</label>
            <select
              name="sortby"
              id="sortby"
              value={selectedSortBy}
              onChange={handleSort}
            >
              <option value="created_at">Date</option>
              <option value="owner">Owner</option>
              <option value="title">Title</option>
              <option value="review_id">Review id</option>
              <option value="votes">Votes</option>
              <option value="designer">Designer</option>
              <option value="comment_count">Num of comments</option>
            </select>
          </div>

          <div className="orderby-tools">
            <label htmlFor="orderby">Order by:</label>
            <select
              name="orderby"
              id="orderby"
              value={selectedOrderBy}
              onChange={handleOrder}
            >
              <option value="ASC">Ascending</option>
              <option value="DESC">Descending</option>
            </select>
          </div>

          <div className="limit-tools">
            <label htmlFor="limit">Results per page:</label>
            <select
              name="limit"
              id="limit"
              value={selectedLimit}
              onChange={handleLimit}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
            </select>
          </div>

          <p>{reviews.range}</p>
        </div>
        <div id="reviews-container">
          {reviews.results.map((review) => {
            const formattedDate = new Date(review.created_at).toLocaleString(
              "en-US",
              {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }
            );
            return (
              <Link to={`/reviews/${review.review_id}`} key={review.review_id}>
                <div className="review-square">
                  <img src={review.review_img_url} alt={review.review_id} />
                  <h4>{review.title}</h4>
                  <div className="author-date">
                    <p>By {review.owner}</p>
                    <p>{formattedDate}</p>
                    <p>Votes: {review.votes}</p>
                  </div>
                  <p> {review.comment_count} comments </p>
                </div>
              </Link>
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
