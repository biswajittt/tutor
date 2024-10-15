import React from "react";
import "./pageheader.css";
export default function HomeHeader(props) {
  const { title, caption, buttonText } = props;
  return (
    <div className="bookmark-page-header">
      <div className="bookmark-page-header-title">{title}</div>
      <div className="bookmark-page-header-caption">{caption}</div>
      <button className="bookmark-page-header-btn">{buttonText}</button>
    </div>
  );
}
