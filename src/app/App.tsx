import "./App.css";
import { CircularProgress, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { RootState } from "./store";
import { getTheme } from "../common/theme/theme";
import { Header } from "../common/components/Header/Header";
import { useAppSelector } from "../common/hooks/useAppSelector";
import { ErrorSnackbar } from "../common/components/ErrorSnackBar/ErrorSnackBar";
import { Routing } from "../common/router/routes";
import { useAppDispatch } from "../common/hooks/useAppDispatch";
import { useEffect, useState } from "react";
import CustomizedProgressBars from "../common/components/CirculasProgress.tsx/Circulasprogress";
import s from "../common/components/CirculasProgress.tsx/Circule.module.css";
import { selectThemeMode, setIsLoggedIn } from "./appSlice";
import { useMeQuery } from "../features/auth/api/authApi";
import { ResultCode } from "../common/enums/enums";




type ThemeMode = "dark" | "light";
export const App = () => {
  const themeMode = useAppSelector<RootState, ThemeMode>(selectThemeMode);
  const dispatch = useAppDispatch();


  const [isInitialized, setIsInitialized] = useState(false)
  const {data, isLoading} = useMeQuery()


 useEffect(() => {
  if (!isLoading) {
    setIsInitialized(true)
    if (data?.resultCode === ResultCode.Success) {
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
    }
  }
 }, [isLoading, data])

  if (!isInitialized) {
    return (
      <div className={s.circularProgressContainer}>
        <CustomizedProgressBars  />
        <CircularProgress size={200} thickness={3} />
      </div>
    )
  }


  return (
    <>
      <ThemeProvider theme={getTheme(themeMode)}>
        <div className="app">
          <CssBaseline />
          <Header />
          <Routing />
        </div>
      </ThemeProvider>
      <ErrorSnackbar />
   
    </>
  );
};

