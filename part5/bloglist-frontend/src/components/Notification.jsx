import React from "react";

const Notification = ({ message, type }) => {
  const alertStyles = {
    color: type === "error" ? "red" : "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  return <div style={alertStyles}>{message}</div>;
};

export default Notification;
