import axios from "axios";

const ncGames = axios.create({
  baseURL: "https://nc-games-uawn.onrender.com/api",
});

export const getReviews = (sort_by, order_by, limit, p) => {
  return ncGames
    .get("/reviews", {
      params: {
        sort_by,
        order_by,
        limit,
        p,
      },
    })
    .then(({ data }) => {
      return data;
    });
};

export const getSingleReview = (review_id) => {
  return ncGames.get(`/reviews/${review_id}`).then(({ data }) => {
    return data;
  });
};

export const getCommentsOfReview = (review_id) => {
  return ncGames.get(`/reviews/${review_id}/comments`).then(({ data }) => {
    return data;
  });
};

export const patchVotes = (review_id) => {
  return ncGames
    .patch(`/reviews/${review_id}`, { inc_votes: 1 })
    .then(({ data }) => {
      return data;
    });
};
