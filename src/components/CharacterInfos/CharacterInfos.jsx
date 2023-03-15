import classes from "./CharacterInfos.module.css";

const CharacterInfos = ({ side, power }) => {
    return (
        <div className={classes.character_infos}>
            <div className={classes.character_infos__info_block}>
                <div>
                    <span
                        className={
                            classes.character_infos__info_block__property
                        }
                    >
                        Oldal
                    </span>
                    <br />
                    <span
                        className={classes.character_infos__info_block__value}
                    >
                        {side}
                    </span>
                </div>
            </div>
            <div className={classes.character_infos__info_block}>
                <div>
                    <span
                        className={
                            classes.character_infos__info_block__property
                        }
                    >
                        KÜLÖNLEGES ERŐ
                    </span>
                    <br />
                    <span
                        className={classes.character_infos__info_block__value}
                    >
                        {power}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CharacterInfos;
