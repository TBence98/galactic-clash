import React, { useState } from "react";

const CharactersContext = React.createContext({
    characters: null,
    addCharacters: (characters) => {},
    clear: () => {},
});

export const CharactersContextProvider = (props) => {
    const [characters, setCharacters] = useState(null);

    function addCharacters(characters) {
        setCharacters(characters);
    }

    function clear() {
        setCharacters(null);
    }

    const value = {
        characters,
        addCharacters,
        clear,
    };

    return (
        <CharactersContext.Provider value={value}>
            {props.children}
        </CharactersContext.Provider>
    );
};

export default CharactersContext;
