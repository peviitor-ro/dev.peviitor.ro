/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loginInfoStyles } from "Styles";

const LoginInfo = ({ name, steps, icon }) => {
  const {
    loginInfo,
    loginInfo_body,
    loginInfo_header,
    loginInfo_body_step,
    loginInfo_body_step_text,
    highlightedText
  } = loginInfoStyles;

  const formatStep = (step) => {
    const words = step.split(" ");

    const output = words.map((word, i) => {
      let formatedWord = word;
      if (i === 0) {
        return <p> {`${word[0].toUpperCase() + word.substr(1)}`} </p>;
      }

      if (word[0].toUpperCase() === word[0]) {
        formatedWord = word.toUpperCase();
        return <p className={highlightedText}> {`${formatedWord}`} </p>;
      }
      return <p> {`${formatedWord}`} </p>;
    });
    return output;
  };

  let formatedStep;

  return (
    <div className={loginInfo}>
      <div className={loginInfo_header}>
        <FontAwesomeIcon icon={icon} color="#5378FA" />
        <p>{name}</p>
      </div>
      <div className={loginInfo_body}>
        {steps.map((step, i) => {
          formatedStep = formatStep(step);
          return (
            <div className={loginInfo_body_step}>
              <span className={highlightedText}>{i + 1}. </span>
              <div className={loginInfo_body_step_text}>{formatedStep}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LoginInfo;
