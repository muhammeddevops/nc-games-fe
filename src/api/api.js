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

export const postComment = (review_id, input) => {
  console.log(review_id);
  console.log(input, "input in api.js");
  return ncGames
    .post(`/reviews/${review_id}/comments`, {
      body: input,
      username: "grumpy19",
    })
    .then(({ data }) => {
      console.log(data, "AJAKJDKLJL");
      return data;
    });
};
