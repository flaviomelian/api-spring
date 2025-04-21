import React from "react";
import { useNavigate } from "react-router-dom";
import casita from "./../../assets/casita.png";
import team from "./../../assets/team.jpg";
import code from "./../../assets/code.png";
import login from "./../../assets/login.jpg";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div onClick={() => navigate("/")}>
        <img className="house" src={casita} alt="Inicio" />
      </div>
      <div onClick={() => navigate("/dashboard")}>
        <img className="team" src={team} alt="Equipo" />
      </div>
      <div onClick={() => navigate("/code")}>
        <img className="code" src={code} alt="Código" />
      </div>
      <div onClick={() => navigate("/login")}>
        <img className="login" src={login} alt="Login" />
      </div>
    </div>
  );
};

export default Header;
