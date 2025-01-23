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
        query: (id) => {
          return {
            url: `todo-lists/${id}`,
            method: "DELETE",
          };
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

