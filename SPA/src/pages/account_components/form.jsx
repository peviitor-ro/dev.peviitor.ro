/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-regular-svg-icons";
import { BarLoader } from "react-spinners";
import { Button } from "CommonComponents";
import { buttonStyles, formStyles } from "Styles";

const { URL } = process.env;

const Form = () => {
  const { form, userEmail, inputContainer } = formStyles;
  const { btnOutline } = buttonStyles;
  const [formData, setFormData] = useState({ company: "", url: "", email: "" });
  const [loadingForm, setLoadingForm] = useState(true);

  const updateFormData = async (event) => {
    event.preventDefault();
    setLoadingForm(true);
    try {
      const request = {
        company: formData.company,
        url: formData.url
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
      const company = data.company?.[0] ?? "";
      const url = data.url?.[0] ?? "";
      setFormData({ ...formData, company, url });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoadingForm(false);
  };

  const onCompanyChange = (event) => {
    const company = event.target.value;
    setFormData({ ...formData, company });
  };

  const onUrlChange = (event) => {
    const url = event.target.value;
    setFormData({ ...formData, url });
  };

  useEffect(() => {
    const getFormData = async () => {
      try {
        const response = await fetch(`${URL}/api`);
        const data = await response.json();
        const company = data.company?.[0] ?? "";
        const url = data.url?.[0] ?? "";
        const email = data.id || "";
        setFormData({ company, url, email });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoadingForm(false);
    };
    getFormData();
  }, []);

  return (
    <form className={form}>
      <label>Numele Companiei:</label>
      <div className={inputContainer}>
        <input type="text" name="company" value={formData.company} onChange={onCompanyChange} />
      </div>

      <label>URL pagina joburi:</label>
      <div className={inputContainer}>
        <input type="text" name="url" value={formData.url} onChange={onUrlChange} />
      </div>

      <label>Email utilizator:</label>
      <div className={inputContainer}>
        <input className={userEmail} type="email" value={formData.email} disabled />
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
