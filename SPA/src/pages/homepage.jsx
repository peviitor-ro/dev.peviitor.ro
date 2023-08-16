import { AboutSection, ActionContainer, HeaderBanner } from "./homepage_components";
import { Menu } from "./common_components";

const Homepage = () => (
  <div>
    <Menu />
    <HeaderBanner />
    <AboutSection />
    <ActionContainer />
  </div>
);

export default Homepage;
