/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useNavigate } from "react-router";
import { Button, Logo } from "CommonComponents";
import { actionContainerStyles, buttonStyles } from "Styles";

const { URL } = process.env;

const ActionContainer = () => {
  const {
    actionContainer,
    actionContainer_callToAction,
    actionContainer_copyright,
    actionContainer_copyright_text
  } = actionContainerStyles;
  const { btnSolid } = buttonStyles;
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await fetch(`${URL}/user/login`);
      if (response.ok) navigate("/account");
      else navigate("/login");
    } catch (error) {
      navigate("/");
    }
  };
  return (
    <div className={actionContainer}>
      <div className={actionContainer_callToAction}>
        <p>Contribuie</p>
        <a onClick={login}>
          <Button label="Login 🤘" buttonStyle={btnSolid} />
        </a>
      </div>
      <div className={actionContainer_copyright}>
        <Logo />
        <p className={actionContainer_copyright_text}>
          Toate drepturile rezervate &copy;{currentYear} Pe viitor
        </p>
      </div>
    </div>
  );
};

export default ActionContainer;
