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

export const postComment = (review_id, input, user) => {
  return ncGames
    .post(`/reviews/${review_id}/comments`, {
      body: input,
      username: user.username,
    })
    .then(({ data }) => data)
    .catch((error) => {
      if (error) {
        return Promise.reject("Post failed");
      }
    });
};

export const patchVotes = (review_id) => {
  return ncGames
    .patch(`/reviews/${review_id}`, { inc_votes: 1 })
    .then(({ data }) => {
      return data;
    });
};

export const patchVotesMinus = (review_id) => {
  return ncGames
    .patch(`/reviews/${review_id}`, { inc_votes: -1 })
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

export const deleteComment = (comment_id) => {
  return ncGames.delete(`/comments/${comment_id}`).then((data) => {});
};

export const getReviewsByCategory = (category) => {
  return ncGames.get(`/reviews?category=${category}`).then(({ data }) => {
    return data;
  });
};
