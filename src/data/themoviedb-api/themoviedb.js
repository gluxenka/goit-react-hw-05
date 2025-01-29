import axios from "axios";

const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3M2MwMjQ2ZDE4OWI0NThiNTEyZTQ1NTI5YTY0YmQxMCIsIm5iZiI6MTczODE3MDA3MC42OTIsInN1YiI6IjY3OWE1ZWQ2YjRiNmY5MTQ1M2E5OGM4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SiVP34QKRvvyBy5yvRluzPQc9NOWNowdiPFn9jrBOYs";

const MOVIE_SEARCH_URL =
  "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1";
const getMovieTrendingUrl = (timeWindow) =>
  `https://api.themoviedb.org/3/trending/movie/${timeWindow}`;
const getMovieDetailsUrl = (id) => `https://api.themoviedb.org/3/movie/${id}`;
const getMovieExtraInfoUrl = (id, extraInfoType) =>
  `${getMovieDetailsUrl(id)}/${extraInfoType}`;

function getHeadersOptions() {
  return {
    // Замість api_read_access_token вставте свій токен
    Authorization: `Bearer ${API_TOKEN}`,
  };
}

export async function getMoviesTrendingList(timeWindow = "day") {
  try {
    const response = await axios.get(getMovieTrendingUrl(timeWindow), {
      headers: getHeadersOptions(),
    });

    return response.data.results.map((item) => ({
      id: item.id,
      title: item.title,
    }));
  } catch {
    return [];
  }
}

export async function searchMovies(query) {
  try {
    const response = await axios.get(MOVIE_SEARCH_URL, {
      headers: getHeadersOptions(),
      params: {
        query,
      },
    });

    return response.data.results.map((item) => ({
      id: item.id,
      title: item.title,
    }));
  } catch {
    return [];
  }
}

export async function getMovieById(id) {
  try {
    const response = await axios.get(getMovieDetailsUrl(id), {
      headers: getHeadersOptions(),
    });

    return response.data;
  } catch {
    return null;
  }
}

export async function getMovieExtraInfo(id, extraInfoType) {
  try {
    const response = await axios.get(getMovieExtraInfoUrl(id, extraInfoType), {
      headers: {
        // Замість api_read_access_token вставте свій токен
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    return response.data;
  } catch {
    return null;
  }
}

export function getImageUrl(file, resolution = "w500") {
  return `https://image.tmdb.org/t/p/${resolution}${file}`;
}
