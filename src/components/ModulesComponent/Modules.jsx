import classes from "./Modules.module.css";

import PrimaryButton from "../UI/PrimaryButton/PrimaryButton";
import SecondaryButton from "../UI/SecondaryButton/SecondaryButton";

const Modules = ({ isActiveCharacter }) => {
    return (
        <section>
            <h2 className={classes.modules_title}>Modulok</h2>
            <div className={classes.modules_container}>
                <div className={classes.module_container}>
                    <div className={classes.module_container__title_container}>
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
                    <div className={classes.module_container__title_container}>
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
    );
};

export default Modules;
