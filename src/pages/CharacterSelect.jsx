import React, { useState, useContext } from "react";

import classes from "./CharacterSelect.module.css";

import CharactersContext from "../store/characters-context";
import AuthContext from "../store/auth-context";

const CharacterSelect = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const charactersCtx = useContext(CharactersContext);
    const authCtx = useContext(AuthContext);

    if (!charactersCtx.characters) {
        (async () => {
            const response = await fetch(
                "https://developer.webstar.hu/rest/frontend-felveteli/v2/characters/",
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Applicant-Id": "45PdMect",
                        "Application-Authorization": "Bearer " + authCtx.token,
                    },
                }
            );

            const responseData = await response.json();

            if (!response.ok) {
                console.log(responseData.error);
            } else {
                charactersCtx.addCharacters(responseData.characters);
            }
        })();

        return <h1>Loading...</h1>;
    }

    return (
        <div className={classes.character_select}>
            <h1>Character select</h1>
            {charactersCtx.characters.map((character) => {
                const nameParts = character.name.split("<br>");
                return (
                    <p key={character.id}>
                        {nameParts.map((part, index) => (
                            <React.Fragment key={`${character.id}-${index}`}>
                                {part}
                                {index < nameParts.length - 1 ? <br /> : null}
                            </React.Fragment>
                        ))}
                    </p>
                );
            })}
        </div>
    );
};

export default CharacterSelect;
