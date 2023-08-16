import { aboutSectionStyles } from "Styles";
import { aboutSectionArr } from "Data";
import AboutSectionItem from "./_aboutSectionItem";

const AboutSection = () => {
  const { aboutSection, aboutSection_details, aboutSection_head } = aboutSectionStyles;

  return (
    <div className={aboutSection}>
      <div className={aboutSection_head}>
        <h3>Despre ce este acest proiect ?</h3>
        <p>
          Motorul de cautare pentru locuri de munca foloseste date direct de pe website-ul
          companiilor.
        </p>
        <p>Scraperul este cel care preia datele si le publica in index.</p>
        <p>Hai in echipa noastra si devino developer de scrapere.</p>
      </div>
      <div className={aboutSection_details}>
        {aboutSectionArr.map((item) => (
          <AboutSectionItem
            title={item.sectionTitle}
            desc={item.sectionDescription}
            icon={item.sectionIcon}
          />
        ))}
      </div>
    </div>
  );
};

export default AboutSection;
