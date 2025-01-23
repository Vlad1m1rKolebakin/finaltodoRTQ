import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
type Props = {
  background?: string
  theme?: any
}




export const NavButton = styled(Button)<Props>(({ background, theme }) => ({
  minWidth: '110px',
  margin: '0 10px',
  padding: '8px 24px',
  border: '1px solid rgb(235, 234, 251)',
  background: background || 'transparent',
  color: theme.palette.primary.contrastText,
}))