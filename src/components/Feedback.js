import React from "react";
import "./feedback.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

import { feedback } from "../utils";

const Feedback = (props) => {
  switch (props.feedback) {
    case feedback.good: {
      return (
        <span className="good">
          <FontAwesomeIcon icon={faThumbsUp} />
        </span>
      );
    }
    case feedback.okay: {
      return <span className="okay">-</span>;
    }
    case feedback.bad: {
      return (
        <span className="bad">
          <FontAwesomeIcon icon={faThumbsDown} />
        </span>
      );
    }
    default: {
      console.error("Invalid feedback");
      return <span className="error">err</span>;
    }
  }
};

export default Feedback;
