import axios from "axios";

const ncGames = axios.create({
  baseURL: "https://nc-games-uawn.onrender.com/api",
});

export const getReviews = () => {
  return ncGames.get("/reviews").then(({ data }) => {
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

export const postComment = (review_id, input, user) => {
  return ncGames.post(`/reviews/${review_id}/comments`, {
    body: input,
    username: user.user.username,
  });
};

export const patchVotes = (review_id) => {
  return ncGames
    .patch(`/reviews/${review_id}`, { inc_votes: 1 })
    .then(({ data }) => {
      return data;
    });
};

export const getUsers = () => {
  return ncGames.get("/users").then(({ data }) => {
    return data.users;
  });
};

export const getCategories = () => {
  return ncGames.get("/categories").then(({ data }) => {
    return data.categories;
  });
};
