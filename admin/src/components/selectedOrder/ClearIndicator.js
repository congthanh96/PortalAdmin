import React from "react";
import { components } from "react-select";
import Tooltip from "@material-ui/core/Tooltip";

export const ClearIndicator = (props) => {
  return (
    <Tooltip title="Clear all">
      <div>
        <components.ClearIndicator {...props} />
      </div>
    </Tooltip>
  );
};
