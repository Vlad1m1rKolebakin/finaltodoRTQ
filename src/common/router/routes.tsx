import { Route, Routes } from "react-router"
import { Main } from "../../app/Main/Main"
import { Login } from "../../features/todolists/ui/Login/Login"
import { Page404 } from "../components/Page404/Page404"



export const Path = {
    Main: '/',
    Login: '/login',
    PageNotFound: '*',
  } as const
   
  export const Routing = () => {
    return (
      <Routes>
        <Route path={Path.Main} element={<Main />} />
        <Route path={Path.Login} element={<Login />} />
        <Route path={Path.PageNotFound} element={<Page404/>} />
      </Routes>
    )
  }