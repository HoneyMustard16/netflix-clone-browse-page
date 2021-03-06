import React, { useState, useEffect } from "react";
import axios from "../axios";
import "../Style/Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, IsLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
        .then((url) => {
          //https://www.youtube.com/watch?v=XtMThy8QKqU
          const urlParams = new URLSearchParams(new URL(url).search); //passing Youtube Url to Get its ID
          setTrailerUrl(urlParams.get("v")); //get string after V in youtube URL
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      <div className="row">
        <h2>{title}</h2>
        <div className="row__posters">
          {movies.map((movie) => (
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              className={`row__poster ${IsLargeRow && "row__posterlarge"}`}
              src={`${base_url}${
                IsLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
          ))}
        </div>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </>
  );
}

export default Row;
