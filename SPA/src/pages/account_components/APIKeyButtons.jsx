/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import { CircleLoader } from "react-spinners";
import { NotificationManager } from "react-notifications";
import { useNavigate } from "react-router";
import { APIKeyButtonsStyles } from "Styles";

const { URL } = process.env;

const APIKeyButtons = (props) => {
  const [copyTriggered, setCopyTriggered] = useState(false);
  const { triggerNotification, apikeyInitial, setLoadingApikeyFn, loadingApikey } = props;
  const [apikey, setApikey] = useState("");
  const {
    container,
    container_body,
    keyDisplay,
    keyDisplay_text,
    keyDisplay_icon,
    keyIcon,
    copyIcon
  } = APIKeyButtonsStyles;
  const navigate = useNavigate();

  const getNewAPIKey = async () => {
    setLoadingApikeyFn(true);
    try {
      const request = {
        apikey: "Update key please!"
      };
      const requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
      };
      const response = await fetch(`${URL}/api`, requestOptions);
      if (response.status === 401) navigate("/login");
      else {
        const data = await response.json();
        const apikeyNew = data[0].apikey;
        setApikey(apikeyNew);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoadingApikeyFn(false);
  };

  const copy = async () => {
    if (!copyTriggered) {
      setCopyTriggered(true);
      triggerNotification();
      NotificationManager.info("", "Cheia a fost copiata!", 3000);
      await navigator.clipboard.writeText(apikey);
      setTimeout(() => {
        setCopyTriggered(false);
      }, 3000);
    }
  };

  return (
    <div className={container}>
      <div className={container_body}>
        <h2>Cheie API:</h2>
        <div className={keyDisplay}>
          <p className={keyDisplay_text}>{apikey || apikeyInitial || "Genereaza o cheie..."}</p>
          <div className={keyDisplay_icon}>
            <span className={keyIcon} onClick={getNewAPIKey}>
              {loadingApikey ? (
                <CircleLoader
                  size={16}
                  cssOverride={{ "margin-top": "10px", "margin-right": "17px" }}
                />
              ) : (
                <FontAwesomeIcon icon={faKey} style={{ cursor: "pointer" }} />
              )}
            </span>
            <span className={copyIcon} onClick={() => copy()}>
              <FontAwesomeIcon icon={faClipboard} style={{ cursor: "pointer" }} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIKeyButtons;
