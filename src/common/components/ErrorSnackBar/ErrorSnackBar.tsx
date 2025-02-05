import { SyntheticEvent} from "react";

import Snackbar from "@mui/material/Snackbar";
import { Alert, Slide } from "@mui/material";
import { useAppSelector } from "../../hooks/useAppSelector";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { selectAppError, setAppError } from "../../../app/appSlice";


export const ErrorSnackbar = () => {

  const error = useAppSelector(selectAppError);
const dispatch = useAppDispatch()

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
      
    }
    console.log(event);
    dispatch(setAppError({ error: null }))

    
  };

  return (
    <Snackbar
      open={error !== null}
      onClose={handleClose}
      TransitionComponent={Slide}
      message="I love snacks"
      autoHideDuration={6000}
    >
      <Alert
        onClose={handleClose}
        severity="error"
        variant="filled"
        sx={{ width: "100%" }}
        style={{ backgroundColor: "red" }}
      >
        {error}
      </Alert>
    </Snackbar>
  );
};
