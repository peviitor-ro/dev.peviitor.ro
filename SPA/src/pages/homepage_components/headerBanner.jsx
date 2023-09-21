/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useNavigate } from "react-router";
import { buttonStyles, headerBannerStyles } from "Styles";
import programmerWorkingUrl from "Images/header_programmer.svg";
import { Button } from "CommonComponents";

const { URL } = process.env;

const HeaderBanner = () => {
  const { btnSolid } = buttonStyles;
  const {
    headerBanner,
    headerBanner_firstCol,
    headerBanner_secondCol,
    headerBanner_text,
    headerBanner_btn,
    headerBanner_highlight
  } = headerBannerStyles;
  const navigate = useNavigate();
  const login = async () => {
    navigate("/login");
  };
  return (
    <div className={headerBanner}>
      <div className={headerBanner_firstCol}>
        <div className={headerBanner_text}>
          <h2>
            Tu ce faci
            <span className={headerBanner_highlight}> pe viitor </span> ?
          </h2>
          <p>
            Alatura-te
            <span className={headerBanner_highlight}> comunitatii </span>
            noastre si contribuie la dezvoltarea unui
            <span className={headerBanner_highlight}> viitor </span> mai
            <span className={headerBanner_highlight}> colorat </span>
          </p>
        </div>
        <div className={headerBanner_btn}>
          <a onClick={login}>
            <Button label="Login 🤘" buttonStyle={btnSolid} />
          </a>
        </div>
      </div>
      <div className={headerBanner_secondCol}>
        <img src={programmerWorkingUrl} alt="programmer working" />
      </div>
    </div>
  );
};

export default HeaderBanner;
