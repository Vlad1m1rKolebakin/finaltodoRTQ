import { Box, Button } from "@mui/material"
import { containerSx } from "./FilterTasksButtons.styles"
import {  DomainTodolist, FilterValuesType } from "../../../../model/todolistSlice"
import { useAppDispatch } from "../../../../../../common/hooks/useAppDispatch"
import { _todolistsApi, todolistApi } from "../../../../api/todolistsApi"



type Props = {
    todolist: DomainTodolist
  }
   
  export const FilterTasksButtons = ({ todolist }: Props) => {
    const { filter, id } = todolist
    const dispatch = useAppDispatch();
   
    const changeFilterTasksHandler = (filter: FilterValuesType) => {
      dispatch(
        todolistApi.util.updateQueryData(

          'getTodolists',
          // 2
          undefined,
          // 3
          state => {
            const index = state.findIndex(tl => tl.id === id)
            if (index !== -1) {
              state[index].filter = filter
            }
          }

        )
      )
    }

   
    return (
      <Box sx={containerSx}>
        <Button
          variant={filter === 'all' ? 'outlined' : 'text'}
          color={'primary'}
          onClick={() => changeFilterTasksHandler('all')}
        >
          All
        </Button>
        <Button
          variant={filter === 'active' ? 'outlined' : 'text'}
          color={'primary'}
          onClick={() => changeFilterTasksHandler('active')}
        >
          Active
        </Button>
        <Button
          variant={filter === 'completed' ? 'outlined' : 'text'}
          color={'primary'}
          onClick={() => changeFilterTasksHandler('completed')}
        >
          Completed
        </Button>
      </Box>
    )
  }