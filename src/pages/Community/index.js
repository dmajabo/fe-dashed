import React, { useEffect } from "react";
import Header from "./Header";
import EditorPicks from "./EditorPicks";

export default function index() {
  useEffect(() => {
    toggleMenuCallback()
  }, []);

  const toggleMenuCallback = () => {
    var body = document.body;
    if (window.screen.width <= 998) {
      body.classList.toggle("sidebar-enable");
    } else {
      body.classList.toggle("vertical-collpsed");
      body.classList.toggle("sidebar-enable");
      window.dispatchEvent(new Event('resize'));
    }
  };

  return (
    <div className="community-page">
      <Header />
      <EditorPicks />
    </div>
  );
}
