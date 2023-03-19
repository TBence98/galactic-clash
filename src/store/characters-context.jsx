import React, { useState } from "react";

const CharactersContext = React.createContext({
    characters: null,
    clashingCharacters: [],
    addCharacters: (characters) => {},
    addClashingCharacter: (characterId) => {},
    hasClashingCharacter: (characterId) => {},
    removeClashingCharacter: (characterId) => {},
    clear: () => {},
});

export const CharactersContextProvider = (props) => {
    const [characters, setCharacters] = useState(null);
    const [clashingCharacters, setClashingCharacters] = useState([]);

    function addClashingCharacter(characterId) {
        if (clashingCharacters.length >= 2) {
            throw new RangeError("You can only have 2 clashingCharacters");
        }

        const character = characters.find(
            (character) => character.id === characterId
        );
        const newClashingCharacters = [...clashingCharacters];

        newClashingCharacters.push(character);
        setClashingCharacters(newClashingCharacters);
    }

    function removeClashingCharacter(characterId) {
        const filteredClashingCharacters = clashingCharacters.filter(
            (character) => character.id !== characterId
        );

        setClashingCharacters(filteredClashingCharacters);
    }

    function hasClashingCharacter(characterId) {
        return clashingCharacters.some(
            (character) => character.id === characterId
        );
    }

    function addCharacters(characters) {
        setCharacters(characters);
    }

    function clear() {
        setCharacters(null);
        setClashingCharacters([]);
    }

    const value = {
        characters,
        clashingCharacters,
        addCharacters,
        addClashingCharacter,
        removeClashingCharacter,
        hasClashingCharacter,
        clear,
    };

    return (
        <CharactersContext.Provider value={value}>
            {props.children}
        </CharactersContext.Provider>
    );
};

export default CharactersContext;
