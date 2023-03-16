import React, { useState, useContext, useEffect, useRef } from "react";

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
    const swiperRef = useRef(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(
                    "https://developer.webstar.hu/rest/frontend-felveteli/v2/characters/",
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Applicant-Id": "45PdMect",
                            "Application-Authorization":
                                "Bearer " + authCtx.token,
                        },
                    }
                );

                const responseData = await response.json();

                if (!response.ok) {
                    console.log(responseData.error);
                    setError(true);
                } else {
                    charactersCtx.addCharacters(responseData.characters);
                    setIsLoading(false);
                }
            } catch (error) {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    if (error) {
        return (
            <div className={classes.pre_response_container}>
                <h1 className={classes.pre_response_container__error_message}>
                    Sikertelen karakter betöltés
                </h1>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className={classes.pre_response_container}>
                <LoadingSpinner />
            </div>
        );
    }

    const activeCharacter = charactersCtx.characters[activeSlide];

    function nextSlide(isSwipped) {
        if (swiperRef.current.swiper.animating) return;

        if (!isSwipped) {
            swiperRef.current.swiper.slideNext(800, false);
        }

        setActiveSlide(swiperRef.current.swiper.realIndex);
    }

    function prevSlide(isSwipped) {
        if (swiperRef.current.swiper.animating) return;

        if (!isSwipped) {
            swiperRef.current.swiper.slidePrev(800, false);
        }

        setActiveSlide(swiperRef.current.swiper.realIndex);
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
                nextSlide={nextSlide}
                prevSlide={prevSlide}
                ref={swiperRef}
            />
        </div>
    );
};

export default CharacterSelect;
