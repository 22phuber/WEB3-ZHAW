import React, { useState } from "react";

const ls = {
  set: () => {},
  get: () => "off"
};

const Header = ({ text }) => {
  const [status, setStatus] = useState(ls.get("list"));
  const setNewValue = value => {
    setStatus(value);
    ls.set(value);
  };
  console.log(text);
  return (
    <div className="header">
      Header {text} {status}{" "}
      <button onClick={() => setStatus(status === "on" ? "off" : "on")}>
        toggle
      </button>
    </div>
  );
};




export default Header;
