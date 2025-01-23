import { ChangeEvent, useState } from "react";
import { Checkbox, IconButton, ListItem } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { getListItemSx } from "./Task.styles";
import { DomainTodolist } from "../../../../../model/todolistSlice";
import { useAppDispatch } from "../../../../../../../common/hooks/useAppDispatch";
import { EditableSpan } from "../../../../../../../common/components/EditableSpan";
import { DomainTask, UpdateTaskDomainModel } from "../../../../../api/tasksApi.types";
import { TaskStatus } from "../../../../../../../common/enums/enums";
import { tasksApi, useRemoveTaskMutation, useUpdateTaskMutation } from "../../../../../api/taskApi";
import { todolistApi, useGetTodolistsQuery } from "../../../../../api/todolistsApi";
import { RequestStatus, selectAppStatus } from "../../../../../../../app/appSlice";
import { useAppSelector } from "../../../../../../../common/hooks/useAppSelector";

type Props = {
  task: DomainTask;
  todolist: DomainTodolist;
};

export const Taska = ({ task, todolist }: Props) => {
  const dispatch = useAppDispatch();
  const [removeTask] = useRemoveTaskMutation()
  const [updateTask] = useUpdateTaskMutation()


const updateQueryData = (status: RequestStatus) => {
  dispatch(
    todolistApi.util.updateQueryData('getTodolists', undefined, state => {
      const index = state.findIndex(tl => tl.id === todolist.id)
      if (index !== -1) {
        state[index].entityStatus = status
      }
    })
  )
}




  const removeTaskHandler = () => {
    // status = 'loading'
    updateQueryData('loading')
    removeTask({ todolistId: todolist.id, taskId: task.id }).unwrap().catch(()=> {
      updateQueryData('idle')
    }).finally(() => {
      updateQueryData('idle')
    })
  };


  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked
      ? TaskStatus.Completed
      : TaskStatus.New;


      const model: UpdateTaskDomainModel = {
        status,
        title: task.title,
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
      }
   
      updateTask({ taskId: task.id, todolistId: todolist.id, model })
  };

  const changeTaskTitleHandler = (title: string) => {
    const model: UpdateTaskDomainModel = {
      status: task.status,
      title,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
    }
 
    updateTask({ taskId: task.id, todolistId: todolist.id, model })
  };

  return (
    <ListItem
      key={task.id}
      sx={getListItemSx(task.status === TaskStatus.Completed)}
    >
      <div>
        <Checkbox
          checked={task.status === TaskStatus.Completed}
          onChange={changeTaskStatusHandler}
        />
        <EditableSpan
          value={task.title}
          onChange={changeTaskTitleHandler}
          disabled={todolist.entityStatus === "loading"}
        />
      </div>
      <IconButton disabled={todolist.entityStatus === "loading"}>
        <DeleteOutlineIcon onClick={removeTaskHandler} fontSize="small" />
      </IconButton>
    </ListItem>
  );
};
