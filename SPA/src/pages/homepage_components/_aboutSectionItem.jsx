/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { aboutSectionItemStyles } from "Styles";

const AboutSectionItem = ({ title, desc, icon }) => {
  const {
    aboutSectionItem,
    aboutSectionItem_desc,
    aboutSectionItem_icon,
    aboutSectionItem_text,
    aboutSectionItem_title
  } = aboutSectionItemStyles;

  return (
    <div className={aboutSectionItem}>
      <div className={aboutSectionItem_icon}>
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className={aboutSectionItem_text}>
        <h4 className={aboutSectionItem_title}>{title}</h4>
        <p className={aboutSectionItem_desc}>{desc}</p>
      </div>
    </div>
  );
};

export default AboutSectionItem;
