import { useState } from "react"
import { DomainTodolist } from "../../features/todolists/lib/types"
import { useGetTasksQuery } from "../../features/todolists/api/taskApi"
import { TaskStatus } from "../enums/enums"

export const useTasks = (todolist: DomainTodolist) => {
    const { filter, id } = todolist
   
    const [page, setPage] = useState(1)
   
    const { data, isLoading } = useGetTasksQuery({ todolistId: id, args: { page } })
   
    let tasks = data?.items
   
    if (filter === 'active') {
      tasks = tasks?.filter(task => task.status === TaskStatus.New)
    }
   
    if (filter === 'completed') {
      tasks = tasks?.filter(task => task.status === TaskStatus.Completed)
    }
   
    return { tasks, isLoading, page, setPage, totalCount: data?.totalCount }
  }