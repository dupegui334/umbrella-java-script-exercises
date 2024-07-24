import React, { useState } from "react";
import "./Octet.css";

const Octet = (props) => {
  const [message, setMessage] = useState("");
  const [isValid, setIsValid] = useState(props.value < 255);

  const validClass = isValid ? "valid" : "invalid";
  const classes = `octet ${validClass}`;

  return (
    <div className={classes}>
      <input
        type="text"
        value={props.value}
        onChange={(e) => {
          let change = false;
          if (e.target.value < 0 || e.target.value > 255) {
            change = true;
            setIsValid(false);
            props.setValid(false);
            setMessage("incorrect value");
          } else if (e.target.value === "" || isNaN(e.target.value)) {
            change = false;
            //stay the same
          } else {
            change = true;
            setIsValid(true);
            props.setValid(true);
          }
          props.changeFunction(e.target.value, props.index, change);
        }}
      />
      <div className="error-message">{message}</div>
    </div>
  );
};

export default Octet;
