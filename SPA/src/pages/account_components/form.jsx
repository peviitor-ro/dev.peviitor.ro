/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-regular-svg-icons";
import { BarLoader } from "react-spinners";
import { useNavigate } from "react-router";
import { Button } from "CommonComponents";
import { buttonStyles, formStyles } from "Styles";

const { URL } = process.env;

const Form = (props) => {
  const { company, url, email, setUserInfoFn, toggleLoading, loadingForm } = props;
  const { form, userEmail, inputContainer } = formStyles;
  const { btnOutline } = buttonStyles;
  const navigate = useNavigate();

  const updateFormData = async (event) => {
    event.preventDefault();
    toggleLoading("form", true);
    try {
      const request = {
        company,
        url
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
        const companyNew = data.company?.[0] ?? "";
        const urlNew = data.url?.[0] ?? "";
        setUserInfoFn(companyNew, urlNew);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    toggleLoading("form", false);
  };

  const onCompanyChange = (event) => {
    const companyNew = event.target.value;
    setUserInfoFn({ company: companyNew });
  };

  const onUrlChange = (event) => {
    const urlNew = event.target.value;
    setUserInfoFn({ url: urlNew });
  };

  return (
    <form className={form}>
      <label>Numele Companiei:</label>
      <div className={inputContainer}>
        <input type="text" name="company" value={company} onChange={onCompanyChange} />
      </div>

      <label>URL pagina joburi:</label>
      <div className={inputContainer}>
        <input type="text" name="url" value={url} onChange={onUrlChange} />
      </div>

      <label>Email utilizator:</label>
      <div className={inputContainer}>
        <input className={userEmail} type="email" value={email} disabled />
      </div>
      {loadingForm ? (
        <BarLoader size={10} />
      ) : (
        <Button
          label={<FontAwesomeIcon icon={faSave} />}
          buttonStyle={btnOutline}
          onClick={updateFormData}
        />
      )}
    </form>
  );
};

export default Form;
