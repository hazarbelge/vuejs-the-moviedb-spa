export const charactersLimiter = (value, limit) => {
  return value.length > limit ? value.substring(0, limit) + "..." : value;
};
export const imdbLink = (value) => {
  return "https://www.imdb.com/title/" + value + "/";
};
