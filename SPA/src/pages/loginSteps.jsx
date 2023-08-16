/* eslint-disable react/no-array-index-key */
import { loginStepsStyles } from "Styles";
import { loginInfoSteps } from "Data";
import { LoginInfo } from "./loginSteps_components";
import { Menu } from "./common_components";

const LoginSteps = () => {
  const { loginSteps, loginSteps_instructions, loginSteps_items } = loginStepsStyles;

  return (
    <div className={loginSteps}>
      <Menu />
      <p className={loginSteps_instructions}>
        Pentru a vă putea loga cu succes și pentru a accesa cheia API trebuie să completați
        următorii pași , în funcție de opțiunea de Login aleasă 😄
      </p>
      <div className={loginSteps_items}>
        {loginInfoSteps.map((item, index) => (
          <LoginInfo key={index} icon={item.icon} steps={item.steps} name={item.name} />
        ))}
      </div>
    </div>
  );
};

export default LoginSteps;
