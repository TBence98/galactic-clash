import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import classes from "./CharacterSlide.module.css";

import HeroImages from "../../utils/HeroImages";

const CharacterSlide = React.forwardRef(
    ({ name, description, id, nextSlide, prevSlide }, ref) => {
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
                    <Swiper
                        ref={ref}
                        effect
                        speed={800}
                        slidesPerView={1}
                        loop
                        onSlideNextTransitionEnd={() => nextSlide(true)}
                        onSlidePrevTransitionEnd={() => prevSlide(true)}
                    >
                        {HeroImages.map((img, index) => (
                            <SwiperSlide key={index}>{img}</SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div>
                    <h2>Modulok</h2>
                </div>
            </section>
        );
    }
);

export default CharacterSlide;
