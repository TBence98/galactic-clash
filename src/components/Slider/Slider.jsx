import classes from "./Slider.module.css";

import Dot from "./Dot";

const Slider = ({ activeSlide, slideLength, nextSlide, prevSlide }) => {
    return (
        <div className={classes.slider}>
            <div className={classes.dots}>
                {Array.from({ length: slideLength }).map((_, index) => {
                    return index === activeSlide ? (
                        <Dot type="active" key={index} />
                    ) : (
                        <Dot type="inactive" key={index} />
                    );
                })}
            </div>
            <button
                className={`${classes.button} ${classes.button__prev}`}
                type="button"
                onClick={prevSlide}
            ></button>
            <button
                className={`${classes.button} ${classes.button__next}`}
                type="button"
                onClick={nextSlide}
            ></button>
        </div>
    );
};

export default Slider;
