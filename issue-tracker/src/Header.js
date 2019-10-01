import React, { useState } from "react";
import Button from './Button';

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
      <Button onClick={() => setStatus(status === "on" ? "off" : "on")} text = "toggle" />
    </div>
  );
};




export default Header;
