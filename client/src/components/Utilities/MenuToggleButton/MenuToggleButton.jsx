import React from "react";
import "./menutogglebutton.css";
export default function MenuToggleButton(props) {
  const { className } = props.className;
  return (
    <div className={props.className}>
      <input type="checkbox" id="checkbox" />
      <label htmlFor="checkbox" className="toggle">
        <div className="bars" id="bar1"></div>
        <div className="bars" id="bar2"></div>
        <div className="bars" id="bar3"></div>
      </label>
    </div>
  );
}
