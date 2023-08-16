import { faGithub, faGitlab } from "@fortawesome/free-brands-svg-icons";

const loginInfoSteps = [
  {
    name: "Github",
    steps: [
      "navigati in meniul Settings din Github",
      "in sectiunea de Emails debifati optiunea Keep My Email Addresses Private",
      "in sectiunea Profile , la campul Public Email alegeti email-ul dvs.",
      "salvati modificarile cu butonul Update profile"
    ],
    noOfSteps: 4,
    icon: faGithub
  },
  {
    name: "Gitlab",
    steps: [
      "navigati in meniul Edit profile din Gitlab",
      "in sectiunea profile, la campul Public Email alegeti email-ul dvs.",
      "salvati modificarile cu butonul Update Profile Settings."
    ],
    noOfSteps: 3,
    icon: faGitlab
  }
];

export default loginInfoSteps;
