import { createTheme } from '@mui/material/styles'
import { ThemeMode } from '../../app/appSlice'
 
export const getTheme = (themeMode: ThemeMode) => {
  return createTheme({
    palette: {
      mode: themeMode === 'light' ? 'light' : 'dark',
      primary: {
        main: "rgb(83, 75, 129)",
      },
    },
  })
}