import React from "react";
import "./button.css";

const Button = (props) => (
  <button
    type="button"
    className={["app-button", props.type ? props.type : ""].join(" ")}
    onClick={props.action}
  >
    {props.children}
  </button>
);

export { Button };
