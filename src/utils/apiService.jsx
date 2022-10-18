import axios from 'axios';

const KEY = '79ad0a2173e039ba91f7fd244ef16e89';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export const getPopularMovies = async () => {
  const response = await axios(`/trending/movie/day?api_key=${KEY}`);
  return response.data.results;
};

export const getMovieDetails = async id => {
  const response = await axios(`/movie/${id}?api_key=${KEY}`);
  return response.data;
};

export const getCast = async id => {
  const response = await axios(`/movie/${id}/credits?api_key=${KEY}`);
  return response.data.cast;
};

export const getReviews = async id => {
  const response = await axios(`/movie/${id}/reviews?api_key=${KEY}`);
  return response.data.results;
};

export const getMoviesByName = async name => {
  const response = await axios(`/search/movie?query=${name}&api_key=${KEY}`);
  return response.data.results;
};
