import React from "react";

const CharacterBox = ({ character }) => {
  return (
    <div className="character-box">
      <h2>{character.name}</h2>
      <img
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        alt={character.name}
      />
    </div>
  );
};

export default CharacterBox;
