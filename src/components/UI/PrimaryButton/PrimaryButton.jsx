import classes from "./PrimaryButton.module.css";

const PrimaryButton = ({
    type = "button",
    className,
    onClick,
    children,
    disabled = false,
}) => {
    return (
        <button
            className={`${classes.primary_button} ${className}`}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default PrimaryButton;
