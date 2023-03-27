import classes from "./Dot.module.css";

const Dot = ({ type }) => {
    return (
        <div
            className={`${classes.dot} ${
                type === "active"
                    ? classes["dot--active"]
                    : classes["dot--inactive"]
            }`}
        ></div>
    );
};

export default Dot;
