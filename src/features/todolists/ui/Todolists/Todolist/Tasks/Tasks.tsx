import { List } from "@mui/material";
import { Taska } from "./Task.tsx/Task";
import { TasksSkeleton } from "../../../Sceleton/TaskSeleton/TasksSkeleton";
import { TasksPagination } from "../../../TasksPagination/TasksPagination";
import { DomainTodolist } from "../../../../lib/types";
import { useTasks } from "../../../../../../common/hooks/useTasks";

type Props = {
  todolist: DomainTodolist;
};

export const Tasks = ({ todolist }: Props) => {


  const { tasks, isLoading, totalCount, page, setPage } = useTasks(todolist)
  if (isLoading) {
    return <TasksSkeleton />;
  }

  return (
    <>
      {tasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <>
          <List>
            {
              tasks?.map((task) => {
                return <Taska key={task.id} task={task} todolist={todolist} />;
              })}
          </List>
          <TasksPagination
            totalCount={totalCount || 0}
            page={page}
            setPage={setPage}
          />
        </>
      )}
    </>
  );
};
