import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { heroImages } from "../utils/getSortedCharacterImages";
import CharactersContext from "../store/characters-context";
import ClashCharacterItem from "../components/ClashCharacterItem/ClashCharacterItem";

import classes from "./Clash.module.css";

const Clash = () => {
    const navigate = useNavigate();
    const characterCtx = useContext(CharactersContext);

    useEffect(() => {
        if (characterCtx.clashingCharacters.length < 2) {
            navigate("/select-character");
        }
    }, []);

    if (characterCtx.clashingCharacters.length < 2) {
        return null;
    }

    const [darkCharacterHp, setDarkCharacterHp] = useState(100);
    const [lightCharacterHp, setLightCharacterHp] = useState(100);
    const isDarkCharacterWon = lightCharacterHp <= 0;
    const isLightCharaterWon = darkCharacterHp <= 0;

    useEffect(() => {
        let timer;

        const tick = () => {
            const randomNum = Math.random();
            const hpSubtraction = Math.floor(Math.random() * (28 - 16) + 15);

            if (randomNum < 0.5) {
                setDarkCharacterHp((prevHp) => prevHp - hpSubtraction);
            } else {
                setLightCharacterHp((prevHp) => prevHp - hpSubtraction);
            }
        };

        if (darkCharacterHp > 0 && lightCharacterHp > 0) {
            timer = setTimeout(tick, 1500);
        }

        return () => clearTimeout(timer);
    }, [darkCharacterHp, lightCharacterHp]);

    const darkCharacter = characterCtx.clashingCharacters.find(
        (character) => character.side === "DARK"
    );
    const lightCharacter = characterCtx.clashingCharacters.find(
        (character) => character.side === "LIGHT"
    );
    const darkCharacterImg = heroImages[darkCharacter.id];
    const lightCharacterImg = heroImages[lightCharacter.id];
    const darkCharacterName = darkCharacter.name.split("<br>").join(" ");
    const lightCharacterName = lightCharacter.name.split("<br>").join(" ");

    return (
        <>
            <p className={classes.main_title}>
                {isDarkCharacterWon || isLightCharaterWon
                    ? "a csata nyertese"
                    : "a tudás legyen veled!"}
            </p>
            <div className={classes.clash_container}>
                {darkCharacterHp > 0 ? (
                    <ClashCharacterItem
                        side="DARK"
                        characterImg={darkCharacterImg}
                        characterName={darkCharacterName}
                        isWinner={isDarkCharacterWon}
                        characterHp={darkCharacterHp}
                    />
                ) : null}

                <div
                    className={`${classes.versus_container} ${
                        isLightCharaterWon || isDarkCharacterWon
                            ? classes.hide
                            : ""
                    }`}
                >
                    <span>VS</span>
                </div>
                {lightCharacterHp > 0 ? (
                    <ClashCharacterItem
                        side="LIGHT"
                        characterImg={lightCharacterImg}
                        characterName={lightCharacterName}
                        isWinner={isLightCharaterWon}
                        characterHp={lightCharacterHp}
                    />
                ) : null}
            </div>
        </>
    );
};

export default Clash;
