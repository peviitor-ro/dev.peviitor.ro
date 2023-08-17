/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import { CircleLoader } from "react-spinners";
import { NotificationManager } from "react-notifications";
import { APIKeyButtonsStyles } from "Styles";

const { URL } = process.env;

const APIKeyButtons = (props) => {
  const [copyTriggered, setCopyTriggered] = useState(false);
  const { triggerNotification } = props;
  const [apikey, setApikey] = useState("");
  const [loadingApikey, setLoadingApikey] = useState(true);
  const {
    container,
    container_body,
    keyDisplay,
    keyDisplay_text,
    keyDisplay_icon,
    keyIcon,
    copyIcon
  } = APIKeyButtonsStyles;
  const getNewAPIKey = async () => {
    setLoadingApikey(true);
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
      const dataJSON = await fetch(`${URL}/api`);
      const data = await dataJSON.json();
      const apikeyNew = data.apikey[0];
      setApikey(apikeyNew);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoadingApikey(false);
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

  useEffect(() => {
    const getAPIKey = async () => {
      try {
        const response = await fetch(`${URL}/api`);
        const data = await response.json();
        const apikeyNew = data.apikey[0];
        setApikey(apikeyNew);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoadingApikey(false);
    };
    getAPIKey();
  }, []);

  return (
    <div className={container}>
      <div className={container_body}>
        <h2>Cheie API:</h2>
        <div className={keyDisplay}>
          <p className={keyDisplay_text}>{apikey || "Genereaza o cheie..."}</p>
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
