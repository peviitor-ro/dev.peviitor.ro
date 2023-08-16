/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import { buttonStyles } from "Styles";

const Button = ({ children, type, buttonSize, buttonStyle, onClick, label, disabled }) => {
  const { basicButton } = buttonStyles;

  return (
    <button
      className={`${basicButton} ${buttonStyle || ""} ${buttonSize || ""}`}
      type={type}
      onClick={onClick}
      label={label}
      disabled={disabled}
    >
      {label}
      {children}
    </button>
  );
};

export default Button;
