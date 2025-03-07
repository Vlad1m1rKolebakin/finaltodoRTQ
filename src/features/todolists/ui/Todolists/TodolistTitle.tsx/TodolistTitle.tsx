import { EditableSpan } from "../../../../../common/components/EditableSpan";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {  IconButton } from "@mui/material";
import { todolistApi, useDeleteTodolistMutation, useUpdateTodolistTitleMutation } from "../../../api/todolistsApi";
import { useAppDispatch } from "../../../../../common/hooks/useAppDispatch";
import { RequestStatus } from "../../../../../app/appSlice";
import { DomainTodolist } from "../../../lib/types";

type Props = {
  todolist: DomainTodolist;
};

export const TodolistTitle = ({ todolist }: Props) => {
  const { title, id, entityStatus } = todolist;
  const [deleteTodolist] = useDeleteTodolistMutation()
  const dispatch = useAppDispatch();
const [ updateTodolistTitle] = useUpdateTodolistTitleMutation()

  

const updateQueryData = (status: RequestStatus) => {
  dispatch(
    todolistApi.util.updateQueryData('getTodolists', undefined, state => {
      const index = state.findIndex(tl => tl.id === id)
      if (index !== -1) {
        state[index].entityStatus = status
      }
    })
  )
}

const removeTodolistHandler = async () => {
  const patchResult = dispatch(
    todolistApi.util.updateQueryData('getTodolists', undefined, state => {
      const index = state.findIndex(tl => tl.id === id)
      if (index !== -1) {
        state[index].entityStatus = 'loading'
      }
    })
  )
  try {
    const res = await deleteTodolist(id)
    if (res.error) {
      patchResult.undo()
    }
  } catch {
    patchResult.undo()
  }
}
  const updateTodolistHandler = (title: string) => {
    updateTodolistTitle({ id, title })
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <h3>
        <EditableSpan value={title} onChange={updateTodolistHandler} />
      </h3>
      <IconButton disabled={entityStatus === "loading"}>
        <DeleteOutlineIcon onClick={removeTodolistHandler} fontSize="small" />
      </IconButton>
    </div>
  );
};
