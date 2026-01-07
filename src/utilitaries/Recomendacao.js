

export const getUserReviews = () => {
  return Object.keys(localStorage)
    .filter(key => key.startsWith("movie_"))
    .map(key => JSON.parse(localStorage.getItem(key)));
};

export const getFavoriteGenres = () => {
  const reviews = getUserReviews();
  const genreCount = {};

  reviews.forEach(review => {
    if (review.rating >= 4 && review.genres) {
      review.genres.forEach(genreId => {
        genreCount[genreId] = (genreCount[genreId] || 0) + 1;
      });
    }
  });

  return Object.entries(genreCount)
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => id);
};

export const getReviewByMovieId = (id) => {
  const data = localStorage.getItem(`movie_${id}`);
  return data ? JSON.parse(data) : null;
};

