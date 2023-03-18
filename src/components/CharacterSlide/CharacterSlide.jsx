import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import classes from "./CharacterSlide.module.css";

import getSortedCharacterImages from "../../utils/getSortedCharacterImages";
import PrimaryButton from "../UI/PrimaryButton/PrimaryButton";
import SecondaryButton from "../UI/SecondaryButton/SecondaryButton";

const CharacterSlide = React.forwardRef(
    ({ name, description, id, nextSlide, prevSlide, characters }, ref) => {
        const nameParts = name.split("<br>");
        const images = getSortedCharacterImages(characters);

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
                    <Swiper
                        ref={ref}
                        effect
                        speed={600}
                        slidesPerView={1}
                        loop
                        onSlideNextTransitionEnd={() => nextSlide(true)}
                        onSlidePrevTransitionEnd={() => prevSlide(true)}
                    >
                        {images.map((img, index) => (
                            <SwiperSlide key={index}>{img}</SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <section>
                    <h2 className={classes.modules_title}>Modulok</h2>
                    <div className={classes.modules_container}>
                        <div className={classes.module_container}>
                            <div
                                className={
                                    classes.module_container__title_container
                                }
                            >
                                <h3>Szimuláció</h3>
                            </div>
                            <div className={classes.module_container__controls}>
                                <p>
                                    Válassz két karaktert az ellentétes oldalról
                                </p>
                                <div
                                    className={
                                        classes.module_container__controls__buttons
                                    }
                                >
                                    <SecondaryButton
                                        type="button"
                                        className={classes.control_button}
                                    >
                                        Karakter kiválasztása
                                    </SecondaryButton>
                                    <PrimaryButton
                                        type="button"
                                        className={classes.control_button}
                                    >
                                        Küzdelem indítása
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                        <div className={classes.module_container}>
                            <div
                                className={
                                    classes.module_container__title_container
                                }
                            >
                                <h3>CRUD kezelés</h3>
                            </div>
                            <div className={classes.module_container__controls}>
                                <p>Karakterszerkesztő megnyitása</p>

                                <div
                                    className={
                                        classes.module_container__controls__buttons
                                    }
                                >
                                    <SecondaryButton
                                        type="button"
                                        className={classes.control_button}
                                    >
                                        Karakterek szerkesztése
                                    </SecondaryButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        );
    }
);

export default CharacterSlide;
