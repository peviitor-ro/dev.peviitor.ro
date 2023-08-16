import { Link } from "react-router-dom";
import { logoStyles } from "Styles";

const Logo = () => {
  const { logo, preLogo } = logoStyles;

  return (
    <Link to="/" style={{ textDecoration: "none" }}>
      <p className={logo}>
        <span className={preLogo}>dev.</span> pe viitor
      </p>
    </Link>
  );
};

export default Logo;
