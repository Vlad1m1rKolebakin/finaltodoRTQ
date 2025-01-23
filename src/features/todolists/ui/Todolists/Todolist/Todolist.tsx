import { AddItemForm } from "../../../../../common/components/AddItemForm";
import { FilterTasksButtons } from "./FilterTasksButton/FilterTasksButtons";
import { Tasks } from "./Tasks/Tasks";
import { TodolistTitle } from "../TodolistTitle.tsx/TodolistTitle";
import { useAppDispatch } from "../../../../../common/hooks/useAppDispatch";
import { useAddTaskMutation } from "../../../api/taskApi";
import { DomainTodolist } from "../../../lib/types";


type Props = {
  todolist: DomainTodolist;
};

export const Todolist = (props: Props) => {

  const dispatch = useAppDispatch();
  const {
    todolist: { id },

  } = props;


  const [addTask] =useAddTaskMutation()

  const createTaskHandler = (title: string) => {
    addTask({ todolistId: id, title })
  };

  return (
    <div>
      <div className={"container"}>
        <TodolistTitle todolist={props.todolist} />
      </div>
      <AddItemForm onCreateItem={createTaskHandler}  disabled={props.todolist.entityStatus === "loading"}/>
      <Tasks todolist={props.todolist} />
      <FilterTasksButtons todolist={props.todolist} />
    </div>
  );
};
