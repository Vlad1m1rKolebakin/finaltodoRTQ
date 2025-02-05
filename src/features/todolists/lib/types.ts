import { RequestStatus } from "../../../app/appSlice";
import { Todolist } from "../api/todolistsApi.types";

export type FilterValuesType = "all" | "active" | "completed";



export type DomainTodolist = Todolist & {
  filter: FilterValuesType;
  entityStatus: RequestStatus;
};
