import React from "react";
import classes from "./CharacterSlide.module.css";

import HeroImages from "../../utils/HeroImages";

const CharacterSlide = ({ name, description, id }) => {
    const nameParts = name.split("<br>");

    return (
        <section className={classes.character_slide}>
            <article>
                <h1 className={classes.character_slide__title}>
                    {nameParts.map((part, index) => (
                        <React.Fragment key={`${id}-${index}`}>
                            {part}
                            {index < nameParts.length - 1 ? <br /> : null}
                        </React.Fragment>
                    ))}
                </h1>
                <p className={classes.character_slide__description}>
                    {description}
                </p>
            </article>
            <div className={classes.character_slide__image_container}>
                {HeroImages[id]}
            </div>
            <div>
                <h2>Modulok</h2>
            </div>
        </section>
    );
};

export default CharacterSlide;
