/* eslint-disable no-nested-ternary */
/* eslint-disable no-promise-executor-return */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable arrow-body-style */
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import { buttonStyles, menuStyles } from "Styles";
import Button from "./button";
import Logo from "./logo";
import GradientBar from "./_gradientBar";

const { URL } = process.env;

const Menu = () => {
  const { menuBar, logoutBtn: logoutBtnMenu } = menuStyles;
  const { contactBtn, logoutBtn } = buttonStyles;
  const location = useLocation();
  const navigate = useNavigate();
  const [logoutFlag, setLogoutFlag] = useState(false);
  const onLogout = async () => {
    setLogoutFlag(true);
  };

  useEffect(() => {
    const logout = async () => {
      try {
        await fetch(`${URL}/user/logout`);
        navigate("/"); // If navigate is not defined, import it from your router library (e.g., 'react-router-dom')
      } catch (error) {}
    };
    if (logoutFlag) {
      logout();
    }
  }, [logoutFlag]);
  return (
    <div className={menuBar}>
      <Logo />
      <GradientBar />
      {location.pathname === "/" || location.pathname === "/login" ? (
        <a
          href="https://sites.google.com/view/oportunitatisicariere"
          target="_blank"
          style={{ textDecoration: "none" }}
          rel="noreferrer"
        >
          <Button label="Contact" buttonStyle={contactBtn} />
        </a>
      ) : logoutFlag ? (
        <a className={logoutBtnMenu}>
          <Button label="" buttonStyle={logoutBtn}>
            <SyncLoader />
          </Button>
        </a>
      ) : (
        <a onClick={onLogout} className={logoutBtnMenu}>
          <Button label="Logout" buttonStyle={logoutBtn} />
        </a>
      )}
    </div>
  );
};

export default Menu;
