import { Link } from "react-router-dom";
import classes from "./ClashCharacterItem.module.css";
import HealthBar from "../HealthBar/HealthBar";

const ClashCharacterItem = ({
    side,
    characterImg,
    characterName,
    isWinner,
    characterHp,
}) => {
    const containerClasses = `${classes.slide_animation} ${
        isWinner && side === "DARK"
            ? classes["slide_animation--dark"]
            : isWinner && side === "LIGHT"
            ? classes["slide_animation--light"]
            : ""
    }`;

    return (
        <div className={containerClasses}>
            {!isWinner ? (
                <span
                    className={`${classes.side_text} ${
                        side === "DARK"
                            ? classes["side_text--dark"]
                            : classes["side_text--light"]
                    }`}
                >
                    {side === "DARK" ? "Sötét oldal" : "Világos oldal"}
                </span>
            ) : null}
            <div className={classes.character_img_container}>
                {characterImg}
            </div>
            <div>
                <span
                    className={`${classes.character_name} ${
                        isWinner ? classes["character_name--center"] : ""
                    }`}
                >
                    {characterName}
                </span>
            </div>
            {isWinner ? (
                <Link
                    to="/select-character"
                    className={classes.back_to_board_link}
                >
                    Vissza a fedélzetra
                </Link>
            ) : (
                <>
                    <HealthBar side={side} progress={characterHp.toString()} />

                    <span className={classes.health_percentage}>
                        {characterHp}%
                    </span>
                </>
            )}
        </div>
    );
};

export default ClashCharacterItem;
