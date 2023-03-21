import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { heroImages } from "../utils/getSortedCharacterImages";
import CharactersContext from "../store/characters-context";
import HealthBar from "../components/HealthBar/HealthBar";

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
    const [lightCharactedHp, setLightCharacterHp] = useState(100);

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

        if (darkCharacterHp > 0 && lightCharactedHp > 0) {
            timer = setTimeout(tick, 1500);
        }

        return () => clearTimeout(timer);
    }, [darkCharacterHp, lightCharactedHp]);

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

    const darkSideContainerClasses = `${classes.clash_container__dark_side} ${
        darkCharacterHp <= 0
            ? classes.hide
            : lightCharactedHp <= 0
            ? classes.dark_animation
            : ""
    }`;
    const lightSideContainerClasses = `${classes.clash_container__light_side} ${
        lightCharactedHp <= 0
            ? classes.hide
            : darkCharacterHp <= 0
            ? classes.light_animation
            : ""
    }`;

    return (
        <>
            <p className={classes.main_title}>a tudás legyen veled!</p>
            <div className={classes.clash_container}>
                <div className={darkSideContainerClasses}>
                    <span className={classes.side_text}>Sötét oldal</span>
                    <div className={classes.character_img_container}>
                        {darkCharacterImg}
                    </div>
                    <div>
                        <span
                            className={`${classes.character_name} ${
                                lightCharactedHp <= 0
                                    ? classes["character_name--center"]
                                    : ""
                            }`}
                        >
                            {darkCharacterName}
                        </span>
                    </div>
                    {lightCharactedHp <= 0 ? (
                        <Link
                            to="/select-character"
                            className={classes.back_to_board_link}
                        >
                            Vissza a fedélzetra
                        </Link>
                    ) : (
                        <>
                            <HealthBar
                                side="DARK"
                                progress={darkCharacterHp.toString()}
                            />

                            <span className={classes.healt_percentage}>
                                {darkCharacterHp}%
                            </span>
                        </>
                    )}
                </div>
                <div
                    className={`${classes.versus_container} ${
                        lightCharactedHp <= 0 || darkCharacterHp <= 0
                            ? classes.hide
                            : ""
                    }`}
                >
                    <span>VS</span>
                </div>
                <div className={lightSideContainerClasses}>
                    <span className={classes.side_text}>Világos oldal</span>
                    <div className={classes.character_img_container}>
                        {lightCharacterImg}
                    </div>
                    <span
                        className={`${classes.character_name} ${
                            darkCharacterHp <= 0
                                ? classes["character_name--center"]
                                : ""
                        }`}
                    >
                        {lightCharacterName}
                    </span>
                    {darkCharacterHp <= 0 ? (
                        <Link
                            to="/select-character"
                            className={classes.back_to_board_link}
                        >
                            Vissza a fedélzetra
                        </Link>
                    ) : (
                        <>
                            <HealthBar
                                side="LIGHT"
                                progress={lightCharactedHp.toString()}
                            />
                            <span className={classes.healt_percentage}>
                                {lightCharactedHp}%
                            </span>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Clash;
