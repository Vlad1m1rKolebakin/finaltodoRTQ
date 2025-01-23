import { Container, Grid2 } from "@mui/material";
import { AddItemForm } from "../../common/components/AddItemForm";
import { Todolists } from "../../features/todolists/ui/Todolists/Todolists";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../common/hooks/useAppSelector";
import { useEffect } from "react";
import { Path } from "../../common/router/routes";

import {  useCreateTodolistMutation } from "../../features/todolists/api/todolistsApi";
import { selectIsLoggedIn } from "../appSlice";

export const Main = () => {

  const [createTodolist] = useCreateTodolistMutation()

  const addTodolist = (title: string) => {
    createTodolist(title)
    
  };
  const navigate = useNavigate()
 
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
 
  useEffect(() => {
    if (!isLoggedIn) {
      navigate(Path.Login)
    }
  }, [isLoggedIn])
  return (
    <Container maxWidth={"lg"}>
      <Grid2 container sx={{ mb: "30px" }}>
        <AddItemForm onCreateItem={addTodolist} />
      </Grid2>
      <Grid2 container spacing={4}>
        <Todolists />
      </Grid2>
    </Container>
  );
};
