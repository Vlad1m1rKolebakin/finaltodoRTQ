import { AppBar, Container, IconButton, LinearProgress, Toolbar } from "@mui/material";
import { MiscellaneousServicesOutlined } from "@mui/icons-material";
import { RootState } from "../../../app/store";
import {  changeTheme, RequestStatus, selectAppStatus, selectIsLoggedIn, selectThemeMode, setIsLoggedIn, ThemeMode } from "../../../app/appSlice";
import { NavButton } from "./NavButton";
import CustomizedSwitches from "./Switch";
import { containerSx } from "../../../features/todolists/ui/Todolists/Todolist/Todolist.styles";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {  useLogoutMutation } from "../../../features/auth/api/authApi";
import { ResultCode } from "../../enums/enums";








export const Header = () => {
  const themeMode = useAppSelector<RootState, ThemeMode>(selectThemeMode);
  const status  = useAppSelector<RootState, RequestStatus>(selectAppStatus);
  
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  
  const [logout] = useLogoutMutation()

  const changeModeHandler = () => {
    dispatch(changeTheme({ themeMode: themeMode === "light" ? "dark" : "light" }));
  };

  const onClickLogOutHandler = () => {
    logout().then(res => {
      if (res.data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: false }))
        localStorage.removeItem('sn-token')
        
      }
    })
  }

  return (
    <AppBar position="static" sx={{ mb: "30px" }}>
      <Toolbar>
        <Container maxWidth={"lg"} sx={containerSx}>
          <IconButton color="inherit">
            <MiscellaneousServicesOutlined />
          </IconButton>
          <div>
          {isLoggedIn && <NavButton onClick={onClickLogOutHandler}>Logout</NavButton>}
            <CustomizedSwitches onClick={changeModeHandler} />
          </div>
        </Container>
      </Toolbar>
      {status === 'loading' && <LinearProgress />}
    </AppBar>
  );
};
