import React from "react";
import { getEnvironmentLabel } from "../../config/appConfig";
import "./EnvironmentBadge.css";

function EnvironmentBadge({ environment }) {
  return <p className="environment-badge">{getEnvironmentLabel(environment)} environment</p>;
}

export default EnvironmentBadge;
