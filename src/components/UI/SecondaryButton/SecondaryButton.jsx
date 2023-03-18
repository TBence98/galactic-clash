import classes from "./SecondaryButton.module.css";

const SecondaryButton = ({
    type = "button",
    className,
    onClick,
    children,
    disabled = false,
}) => {
    return (
        <button
            className={`${classes.secondary_button} ${className}`}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default SecondaryButton;
