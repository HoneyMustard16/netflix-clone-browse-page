import React, { useState, useEffect } from "react";
import axios from "../axios";
import requests from "../requests";
import "../Style/Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1) //pick 1 random movie form object data
        ]
      );
      return requests;
    }
    fetchData();
  }, []);

  const truncate = (str, n) =>
    str?.length > n ? str.substr(0, n - 1) + "..." : str;

  return (
    <>
      <header
        className="banner"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
          backgroundPosition: "top left",
        }}
      >
        <div className="banner__content">
          <h1 className="banner__title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className="banner__buttons">
            <button className="banner__button">Play</button>
            <button className="banner__button">My List</button>
          </div>
          <h1 className="banner__description">
            {truncate(movie?.overview, 220)}
          </h1>
        </div>
        <div className="banner--fadeBottom"></div>{" "}
        {/* styling purposes, add fade gradient on bottom banner */}
      </header>
    </>
  );
}

export default Banner;
