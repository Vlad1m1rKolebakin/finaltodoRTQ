
import { Grid2, Paper, Skeleton } from "@mui/material";
import { Todolist } from "./Todolist/Todolist";
import { useGetTodolistsQuery } from "../../api/todolistsApi";
import { TodolistSkeleton } from "../Sceleton/TodolistSceleton/TodolistSceleton";


export const Todolists = () => {
 


const {data, isLoading}  = useGetTodolistsQuery()

if(isLoading){
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
      {Array(3)
        .fill(null)
        .map((_, id) => (
          <TodolistSkeleton key={id} />
        ))}
    </div>
  )
}

if(isLoading){
  return <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
}
  return (
    <>
      {data?.map((todolist) => {
        return (
          <Grid2 key={todolist.id}>
            <Paper sx={{ p: "0 20px 20px 20px" }}>
              <Todolist todolist={todolist} />
            </Paper>
          </Grid2>
        );
      })}
    </>
  );
};
