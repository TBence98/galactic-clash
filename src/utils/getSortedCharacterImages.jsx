import anakin from "../assets/anakin.png";
import boba from "../assets/boba.png";
import grievous from "../assets/grievous.png";
import kenobi from "../assets/kenobi.png";
import luke from "../assets/luke.png";
import maul from "../assets/maul.png";
import phasma from "../assets/phasma.png";
import rey from "../assets/rey.png";
import solo from "../assets/solo.png";
import stormtrooper from "../assets/stormtrooper.png";
import vader from "../assets/vader.png";
import yoda from "../assets/yoda.png";

export const heroImages = {
    anakin: <img src={anakin} alt="Anakin Skywalker" />,
    vader: <img src={vader} alt="Darth Vader" />,
    maul: <img src={maul} alt="Darth Maul" />,
    grievous: <img src={grievous} alt="Grievous" />,
    boba: <img src={boba} alt="Boba Fett" />,
    phasma: <img src={phasma} alt="Phasma százados" />,
    solo: <img src={solo} alt="Han Solo" />,
    stormtrooper: <img src={stormtrooper} alt="Stormtrooper" />,
    luke: <img src={luke} alt="Luke Skywalker" />,
    kenobi: <img src={kenobi} alt="Obi-Wan Kenobi" />,
    rey: <img src={rey} alt="Rey Palpatine" />,
    yoda: <img src={yoda} alt="Yoda" />,
};

const getSortedCharacterImages = (characters) => {
    return characters.map((character) => heroImages[character.id]);
};

export default getSortedCharacterImages;
