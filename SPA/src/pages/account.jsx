import { useEffect, useState } from "react";
import { NotificationContainer } from "react-notifications";
import { useNavigate } from "react-router";
import { buttonStyles, accessAPIKeyStyles, notificationStyles } from "Styles";
import { APIKeyButtons, Form } from "./account_components";
import { Button, Menu } from "./common_components";
import "react-notifications/lib/notifications.css";

const { URL } = process.env;

const Account = () => {
  const [notificationStatus, setNotificationStatus] = useState(false);
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
  const [userInfo, setUserInfo] = useState({
    companyInitial: "",
    urlInitial: "",
    emailInitial: "",
    apikeyInitial: ""
  });
  const [loadingApikey, setLoadingApikey] = useState(true);
  const [loadingForm, setLoadingForm] = useState(true);
  const navigate = useNavigate();

  const setLoadingApikeyFn = (val) => setLoadingApikey(val);
  const setLoadingFormFn = (val) => setLoadingForm(val);

  useEffect(() => {
    const getInitialData = async () => {
      try {
        const response = await fetch(`${URL}/api`);
        if (response.status === 401) navigate("/login");
        else {
          const data = await response.json();
          const apikeyInitial = data.apikey[0];
          const { company: companyInitial, url: urlInitial, id: emailInitial } = data;
          const initialUser = { apikeyInitial, companyInitial, urlInitial, emailInitial };
          setUserInfo({ ...userInfo, ...initialUser });
          setLoadingApikey(false);
          setLoadingForm(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getInitialData();
  }, []);

  const triggerNotification = async () => {
    setNotificationStatus(true);
    setTimeout(() => {
      setNotificationStatus(false);
    }, 3000);
  };

  const component = (
    <div>
      <Menu />
      <div className={formContainer}>
        <div className={formContainer_body}>
          <div
            className={(actionsContainer, notificationStatus ? notification : notificationHidden)}
          >
            <div className={actionsContainer_form}>
              <Form
                companyInitial={userInfo.companyInitial}
                urlInitial={userInfo.urlInitial}
                emailInitial={userInfo.emailInitial}
                loadingForm={loadingForm}
                setLoadingFormFn={setLoadingFormFn}
              />
            </div>
            <APIKeyButtons
              triggerNotification={triggerNotification}
              apikeyInitial={userInfo.apikeyInitial}
              loadingApikey={loadingApikey}
              setLoadingApikeyFn={setLoadingApikeyFn}
            />
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
  );
  return component;
};

export default Account;
