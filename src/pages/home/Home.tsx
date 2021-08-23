import React from "react";
import Group from "../../assets/images/Group.png";
import './Home.scss';


export const Home = () => {
  
  return (
    <div className="HomePage">
      <span className="HomePage-Heading">Reservation Service</span>
      <span className="HomePage-Description">Creative Technologies 2020</span>
      <div className="HomePage-DivLogo"><img className="HomePage-Logo" src={Group} /></div>
      <div className="HomePage-DivButton"><button className="HomePage-Button">Sign in</button></div>
    </div>
  );
}