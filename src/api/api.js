import axios from "axios";

const ncGames = axios.create({
  baseURL: "https://nc-games-uawn.onrender.com/api",
});

export const getReviews = () => {
  return ncGames.get("/reviews").then(({ data }) => {
    console.log(data);
    return data;
  });
};

export const getSingleReview = (review_id) => {
  return ncGames.get(`/reviews/${review_id}`).then(({ data }) => {
    console.log(data);
    return data;
  });
};

export const getCommentsOfReview = (review_id) => {
  return ncGames.get(`/reviews/${review_id}/comments`).then(({ data }) => {
    console.log(data);
    return data;
  });
};

export const patchVotes = (review_id) => {
  console.log(review_id);
  return ncGames
    .patch(`/reviews/${review_id}`, { inc_votes: 1 })
    .then(({ data }) => {
      console.log(data);
      return data;
    });
};
