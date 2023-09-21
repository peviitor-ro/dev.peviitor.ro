/* eslint-disable no-promise-executor-return */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-param-reassign */
import githubIconPath from "Images/github.svg";
import gitlabIconPath from "Images/gitlab.svg";
import { loginStyles } from "Styles";

const { URL } = process.env;

const Login = () => {
  const { container, logo, preLogo, wellcomeMsg, row, github, gitlab } = loginStyles;

  const openOauth = async (event, oauthMethod) => {
    event.preventDefault();
    window.location.href = `${URL}/oauth/${oauthMethod}`;
  };

  return (
    <div className={container}>
      <h1 className={logo}>
        <span className={preLogo}>dev.</span>pe viitor
      </h1>
      <h2 className={wellcomeMsg}>Sign in with:</h2>
      <div className={row}>
        {/* Display login buttons for GitHub and GitLab */}
        <a
          onClick={(event) => openOauth(event, "github")}
          className={github}
          style={{ cursor: "pointer" }}
        >
          <img src={githubIconPath} alt="" />
          &nbsp;Github
        </a>
        <a
          onClick={(event) => openOauth(event, "gitlab")}
          className={gitlab}
          style={{ cursor: "pointer" }}
        >
          <img src={gitlabIconPath} alt="" />
          &nbsp;Gitlab
        </a>
      </div>
    </div>
  );
};

export default Login;
