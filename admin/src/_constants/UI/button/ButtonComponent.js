import { Button, CircularProgress } from "@material-ui/core";
import React from "react";

export const ButtonComponent = ({
  color,
  variant,
  onClick,
  loading,
  name,
  mr,
  mb,
}) => {
  return (
    <Button
      color={color}
      variant={variant}
      onClick={onClick}
      disabled={loading}
      style={{ marginRight: mr || 12, marginBottom: mb || 0 }}
    >
      {loading && <CircularProgress size={14} />}
      {!loading && `${name}`}
    </Button>
  );
};
