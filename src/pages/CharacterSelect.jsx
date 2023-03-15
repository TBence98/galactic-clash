import React, { useState, useContext } from "react";

import classes from "./CharacterSelect.module.css";

import CharactersContext from "../store/characters-context";
import AuthContext from "../store/auth-context";
import SlideHeader from "../components/SlideHeader/SlideHeader";
import CharacterSlide from "../components/CharacterSlide/CharacterSlide";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const CharacterSelect = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeSlide, setActiveSlide] = useState(0);

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

        return (
            <div className={classes.spinner_container}>
                <LoadingSpinner />
            </div>
        );
    }

    const activeCharacter = charactersCtx.characters[activeSlide];

    function nextSlide() {
        if (activeSlide === charactersCtx.characters.length - 1) {
            setActiveSlide(0);
        } else {
            setActiveSlide((prevValue) => prevValue + 1);
        }
    }
    function prevSlide() {
        if (activeSlide === 0) {
            setActiveSlide(charactersCtx.characters.length - 1);
        } else {
            setActiveSlide((prevValue) => prevValue - 1);
        }
    }

    return (
        <div className={classes.character_select}>
            <SlideHeader
                side={activeCharacter.side}
                power={activeCharacter.force.power}
                activeSlide={activeSlide}
                slideLength={charactersCtx.characters.length}
                nextSlide={nextSlide}
                prevSlide={prevSlide}
            />
            <CharacterSlide
                name={activeCharacter.name}
                description={activeCharacter.description}
                id={activeCharacter.id}
            />
        </div>
    );
};

export default CharacterSelect;
