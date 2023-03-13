import classes from "./PrimaryButton.module.css";

const PrimaryButton = ({ type = "button", className, onClick, children }) => {
    return (
        <button
            className={`${classes.primary_button} ${className}`}
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default PrimaryButton;
