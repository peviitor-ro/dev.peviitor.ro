import { buttonStyles, accessAPIKeyStyles } from "Styles";
import { APIKeyButtons, Form } from "./account_components";
import { Button, Menu } from "./common_components";

const Account = () => {
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

  return (
    <div>
      <Menu />
      <div className={formContainer}>
        <div className={formContainer_body}>
          <div className={actionsContainer}>
            <div className={actionsContainer_form}>
              <Form />
            </div>
            <APIKeyButtons />
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
};

export default Account;
