import React, { Fragment, useEffect, useState } from "react";
import { Snackbar } from "@mui/material";
import { Alert, AlertProps } from "@mui/material";

export class message {
  static info = (msg) => {};
  static warn = (msg) => {};
  static success = (msg) => {};
  static error = (msg) => {};
}
const GlobalSnackbars = () => {
  const [isOpen, setOpen] = useState(false);
  const [severity, setSeverity] = useState("info");
  const [content, setContent] = useState("");

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    message.info = (msg) => {
      setOpen(true);
      setSeverity("info");
      setContent(msg);
    };
    message.warn = (msg) => {
      setOpen(true);
      setSeverity("warn");
      setContent(msg);
    };
    message.success = (msg) => {
      setOpen(true);
      setSeverity("success");
      setContent(msg);
    };
    message.error = (msg) => {
      setOpen(true);
      setSeverity("error");
      setContent(msg);
    };
  }, []);

  return (
    <>
      <Snackbar
        open={isOpen}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert
          elevation={6}
          variant="standard"
          onClose={handleClose}
          // severity={severity}
        >
          {content}
        </Alert>
      </Snackbar>
    </>
  );
};

export default GlobalSnackbars;
