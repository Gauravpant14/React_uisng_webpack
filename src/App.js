import React from "react";
import "./Main.css";
import "./Test.scss";
import btnStyles from "./Button.module.css";
import Logo from "./images/Logo.jpg";
const App = () => {
  return (
    <div>
      <h1>Hello React 3343</h1>
      <button className={btnStyles.success}>Success</button>
      <button className={btnStyles.error}>Error</button>
      <h3>Test Scss file</h3>
      <img src={Logo} alt="" height="100" width="100" />
    </div>
  );
};

export default App;
