import { BaseResponse, Todolist } from "./todolistsApi.types";




import { baseApi } from "../../../app/baseApi";
import { DomainTodolist } from "../lib/types";

export const todolistApi = baseApi.injectEndpoints({
  
  endpoints: (builder) => {
    return {
      getTodolists: builder.query<DomainTodolist[], void>({
        query: () => "todo-lists",
        transformResponse(todolists: Todolist[]): DomainTodolist[] {
          return todolists.map((tl) => ({
            ...tl,
            filter: "all",
            entityStatus: "idle",
          }));
        },
        providesTags: ['Todolist'],
      }),
      createTodolist: builder.mutation<BaseResponse<{ item: Todolist }>, string>({
        query: (title) => {
          return {
            url: "todo-lists",
            method: "POST",
            body: { title }
          }
        },
        invalidatesTags: ['Todolist'],
      }),
      deleteTodolist: builder.mutation<BaseResponse, string>({
        query: id => {
          return {
            method: 'DELETE',
            url: `todo-lists/${id}`,
          }
        },
        async onQueryStarted(id: string, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            todolistApi.util.updateQueryData('getTodolists', undefined, state => {
              const index = state.findIndex(tl => tl.id === id)
              if (index !== -1) {
                state.splice(index, 1)
              }
            })
          )
          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          }
        },
        invalidatesTags: ['Todolist'],
      }),
      updateTodolistTitle: builder.mutation<BaseResponse, { id: string; title: string }>({
        query: ({ id, title }) => {
          return {
            method: "PUT",
            url: `todo-lists/${id}`,
            body: {
              title,
            },
          }
        },
        invalidatesTags: ['Todolist'],
      }),
    };
  },
});

export const { useGetTodolistsQuery, useCreateTodolistMutation, useDeleteTodolistMutation , useUpdateTodolistTitleMutation} = todolistApi;

