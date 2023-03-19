import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import classes from "./Modules.module.css";

import SecondaryButton from "../UI/SecondaryButton/SecondaryButton";
import Modal from "../UI/PrimaryButton/Modal";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import CharactersContext from "../../store/characters-context";
import AuthContext from "../../store/auth-context";

const Modules = ({ id }) => {
    const authCtx = useContext(AuthContext);
    const charactersCtx = useContext(CharactersContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const isChosenCharacter = charactersCtx.hasClashingCharacter(id);
    const clashingCharacters = [...charactersCtx.clashingCharacters];

    function toggleSelectedCharacter() {
        if (isChosenCharacter) {
            charactersCtx.removeClashingCharacter(id);
        } else if (charactersCtx.clashingCharacters.length < 2) {
            charactersCtx.addClashingCharacter(id);
        } else if (charactersCtx.clashingCharacters.length >= 2) {
            setModalMessage("Csak két karakter tud megküzdeni egyszerre");
        }
    }

    function prepareForClash(event) {
        event.preventDefault();

        if (charactersCtx.clashingCharacters.length !== 2) {
            setModalMessage("Válassz két karakter a küzdelemhez!");
            return;
        }

        (async () => {
            setIsLoading(true);
            try {
                const response = await fetch(
                    "https://developer.webstar.hu/rest/frontend-felveteli/v2/simulate/",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Applicant-Id": "45PdMect",
                            "Application-Authorization":
                                "Bearer " + authCtx.token,
                        },
                        body: JSON.stringify({
                            dark: clashingCharacters[0].id,
                            light: clashingCharacters[1].id,
                        }),
                    }
                );

                const responseData = await response.json();

                if (response.status === 500) {
                    setModalMessage(responseData.error);
                } else if (!response.ok) {
                    setModalMessage("Valami elromlott. Próbáld meg később.");
                } else {
                    navigate("/clash");
                }
            } catch (error) {
                setModalMessage("Valami elromlott. Próbáld meg később.");
            } finally {
                setIsLoading(false);
            }
        })();
    }

    function closeModal() {
        setModalMessage("");
    }

    const loadingElement = (
        <div className={classes.loading_element_container}>
            <div className={classes.loading_spinner_container}>
                <LoadingSpinner />
            </div>
        </div>
    );

    const modalElement = <Modal onClose={closeModal} message={modalMessage} />;

    return (
        <>
            {isLoading ? loadingElement : modalMessage ? modalElement : null}
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
                            <p>Válassz két karaktert az ellentétes oldalról</p>
                            <div
                                className={
                                    classes.module_container__controls__buttons
                                }
                            >
                                <SecondaryButton
                                    type="button"
                                    className={`${classes.control_button} ${
                                        isChosenCharacter
                                            ? classes["control_button--active"]
                                            : ""
                                    }`}
                                    onClick={toggleSelectedCharacter}
                                >
                                    Karakter kiválasztása
                                </SecondaryButton>
                                <Link
                                    to="/clash"
                                    className={`${classes.control_button} ${classes.primary_link}`}
                                    onClick={prepareForClash}
                                >
                                    Küzdelem indítása
                                </Link>
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
        </>
    );
};

export default Modules;
