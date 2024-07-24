import React, { useState } from "react";
import "./SubnetNumbersInput.css";

const SubnetNumbersInput = (props) => {
  const [message, setMessage] = useState("");
  const [isValid, setIsValid] = useState(
    props.value < props.maxNumberOfSubnets
  );

  const validClass = isValid ? "valid" : "invalid";
  const classes = `subnet-numbers ${validClass}`;

  return (
    <div className={classes}>
      Number of subnets:
      <input
        type="text"
        value={props.value}
        onChange={(e) => {
          let change = false;
          if (e.target.value < 0 || e.target.value > props.maxNumberOfSubnets) {
            change = true;
            setIsValid(false);
            setMessage("incorrect number of subnets");
          } else if (e.target.value === "") {
            change = true;
          } else if (isNaN(e.target.value)) {
            change = false;
            //stay the same
          } else {
            change = true;
            setIsValid(true);
          }
          props.onChange(e.target.value, change);
        }}
      />
      <div className="error-message">{message}</div>
    </div>
  );
};

export default SubnetNumbersInput;
