import classes from "./SlideHeader.module.css";

import CharacterInfos from "../CharacterInfos/CharacterInfos";
import Slider from "../Slider/Slider";

const SlideHeader = ({
    side,
    power,
    activeSlide,
    slideLength,
    nextSlide,
    prevSlide,
}) => {
    return (
        <header className={classes.slide_header}>
            <CharacterInfos side={side} power={power} />
            <Slider
                activeSlide={activeSlide}
                slideLength={slideLength}
                nextSlide={nextSlide}
                prevSlide={prevSlide}
            />
        </header>
    );
};

export default SlideHeader;
