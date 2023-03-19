import classes from "./HealthBar.module.css";

const HealthBar = ({ side, progress }) => {
    const progressPercentage = progress + "%";

    return (
        <div className={classes.health_bar}>
            <div
                style={{ width: progressPercentage }}
                className={`${classes.health_bar_progress} ${
                    side === "DARK"
                        ? classes["health_bar_progress--dark"]
                        : classes["health_bar_progress--light"]
                }`}
            ></div>
        </div>
    );
};

export default HealthBar;
