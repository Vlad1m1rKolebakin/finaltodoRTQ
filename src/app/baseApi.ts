import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { handleError } from "../common/utils/handleError";

export const baseApi = createApi({
  reducerPath: "todolistsApi",
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: import.meta.env.VITE_APP_BASE_URL,
      prepareHeaders: (headers) => {
        headers.set("API-KEY", `${import.meta.env.VITE_APP_API_KEY}`);
        headers.set(
          "Authorization",
          `Bearer ${localStorage.getItem("sn-token")}`,
        );
      },
    })(args, api, extraOptions);
    handleError(api, result);

    return result;
  },
  endpoints: () => ({}),
  tagTypes: ["Todolist", "Task"],
  refetchOnFocus: true,
});

// export const baseApi = createApi({
//   reducerPath: 'todolistsApi',
//   baseQuery: async (args, api, extraOptions) => {
//     const result = await fetchBaseQuery({
//       baseUrl: import.meta.env.VITE_APP_BASE_URL,
//       prepareHeaders: headers => {
//         headers.set('API-KEY', `${import.meta.env.VITE_APP_API_KEY}}`)
//         headers.set('Authorization', `Bearer ${localStorage.getItem('sn-token')}`)
//       },
//     })(args, api, extraOptions)

//     if (result.error) {
//       if (result.error.status === 'FETCH_ERROR') {
//         api.dispatch(setAppError({ error: result.error.error }))
//       }
//       // if (result.error.status === 'PARSING_ERROR') {
//       //   api.dispatch(setAppError({ error: result.error.error }))
//       // }
//       // if (result.error.status === 403) {
//       //   api.dispatch(setAppError({ error: '403 Forbidden Error. Check API-KEY' }))
//       // }
//       // // if (result.error.status === 403) {
//       // //   api.dispatch(setAppError({ error: '401 Forbidden Error. Check Token' }))
//       // // }
//       // // if (result.error.status === 400) {
//       // //   api.dispatch(setAppError({ error: (result.error.data as { message: string }).message }))
//       // // }
//     }

//     return result
//   },
//   endpoints: () => ({}),
//   tagTypes: ['Todolist', 'Task'],
// })
