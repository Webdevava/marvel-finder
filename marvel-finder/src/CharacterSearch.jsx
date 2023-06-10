import React, { useState } from "react";
import axios from "axios";
import md5 from "md5";
import "./App.css";
import Footer from "./Footer";
import CharacterBox from "./CharacterBox";
import search from "./search.png";

const CharacterSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [characters, setCharacters] = useState([]);
  const [searchError, setSearchError] = useState(false);

  const API_BASE_URL = "https://gateway.marvel.com/v1/public";
  const PUBLIC_KEY = "2750e339d55b0e3c9634b5dbf3ccaf03";
  const PRIVATE_KEY = "c0ebddea61123fe2378952acbc24f6bccaab7bc6";

  const handleSearch = async (e) => {
    e.preventDefault();

    const ts = new Date().getTime();
    const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY);

    const apiUrl = `${API_BASE_URL}/characters`;
    const params = {
      apikey: PUBLIC_KEY,
      ts: ts,
      hash: hash,
      nameStartsWith: searchTerm,
    };

    try {
      const response = await axios.get(apiUrl, { params });
      console.log(response.data); // Output the response to the console

      if (response.data.data.results.length > 0) {
        setCharacters(response.data.data.results);
        setSearchError(false);
      } else {
        setCharacters([]);
        setSearchError(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="search">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search characters"
          />
          <button type="submit">
            <img src={search} />
          </button>
        </form>
      </div>
      <div className="card">
        {searchError && (
          <p>No characters found. Please try a different search term.</p>
        )}
        {!searchError && characters.length === 0 && (
          <p>Try searching for a Marvel character.</p>
        )}
        {characters.map((character) => (
          <CharacterBox key={character.id} character={character} />
        ))}
      </div>

      <Footer />
    </>
  );
};

export default CharacterSearch;
