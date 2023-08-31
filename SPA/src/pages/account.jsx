import { useState, useEffect } from "react";
import { buttonStyles, accessAPIKeyStyles, notificationStyles } from "Styles";
import { APIKeyButtons, Form } from "./account_components";
import { Button, Menu } from "./common_components";
import "react-notifications/lib/notifications.css";
import { NotificationContainer, NotificationManager } from "react-notifications";
const { URL } = process.env;

const Account = () => {
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const {
    formContainer,
    formContainer_body,
    actionsContainer,
    actionsContainer_form,
    infoBox,
    infoBox_title,
    infoBox_button,
    list,
    listItem
  } = accessAPIKeyStyles;

  const { btnOutline } = buttonStyles;
  const { notification, notificationHidden } = notificationStyles;

  const triggerNotification = async () => {
    setNotificationStatus(true);
    setTimeout(() => {
      setNotificationStatus(false);
    }, 3000);
  };

  useEffect(() => {
    const login = async () => {
      try {
        const response = await fetch(`${URL}/user/login`);
        if (response.status === 401) {
          setTimeout(() => {
            window.location.href = URL + "/login";
          }, 3000);
          NotificationManager.error("Session expired!", "Error", 3000);
          setAuthenticated(false);
        }else {
          setAuthenticated(true);
        }
      } catch (error) {
        window.location.href = URL + "/";
        setAuthenticated(false);
        return false;
      }
    };
    login();
  }, []);

  const component = authenticated ? (
    <div>
      <Menu />
      <div className={formContainer}>
        <div className={formContainer_body}>
          <div
            className={(actionsContainer, notificationStatus ? notification : notificationHidden)}
          >
            <div className={actionsContainer_form}>
              <Form />
            </div>
            <APIKeyButtons triggerNotification={triggerNotification} />
            <NotificationContainer />
          </div>

          <div className={infoBox}>
            <h2 className={infoBox_title}>De ce avem nevoie de aceste date?</h2>
            <p>
              <b>Nume Companie</b>
              <ul className={list}>
                <li className={listItem}>
                  Numele companiei poate fi utilizat pentru a ajuta la identificarea și promovarea
                  brandului companiei;
                </li>
                <li className={listItem}>
                  Atrage potențiali candidați care sunt interesați de cultura și valorile companiei;
                </li>
                <li className={listItem}>
                  Oferă oportunitatea pentru companie să se diferențieze de alți competitori.
                </li>
              </ul>
            </p>
            <p>
              <b>URL - pagina de joburi</b>
              <ul className={list}>
                <li className={listItem}>
                  Oferă utilizatorilor posibilitatea de a accesa site-ul companiei pentru a obține
                  mai multe informații despre aceasta;
                </li>
                <li className={listItem}>
                  Ajută utilizatorii să afle mai multe despre cultura, valorile și domeniul de
                  activitate al companiei;
                </li>
                <li className={listItem}>
                  Permite utilizatorilor să afle despre alte oferte de muncă disponibile la acea
                  companie.
                </li>
              </ul>
            </p>
            <div className={infoBox_button}>
              <Button
                label="API.peviitor.ro"
                buttonStyle={btnOutline}
                onClick={() => window.open("https://api.peviitor.ro/", "_blank")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <NotificationContainer />
    );
  return component;
};

export default Account;
