import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import LogoBlue from "../../assets/images/LogoBlue.png";
import './Welcome.scss';


export const Welcome = () => {
  const history = useHistory();
  const location = useLocation();

  React.useEffect(() => {
    if (location.search != "") {
      history.push("/signin");
      sessionStorage.setItem('emailVerification', 'true');
      sessionStorage.setItem('path', location.pathname + location.search);
    }
  }, []);

  return (
    <div className="HomePage">
      <div className="HomePage-DivHeading">
        <span className="HomePage-Heading">Welcome to simple and convenient event planner!</span>
      </div>
      <div className="HomePage-DivLogo"><img className="HomePage-Logo" src={LogoBlue} /></div>
      <div className="HomePage-DivButton">
        <button
          className="HomePage-Button"
          onClick={() => history.push("/signin")}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}