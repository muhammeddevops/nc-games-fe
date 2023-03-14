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
