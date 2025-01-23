import {type ChangeEvent, type KeyboardEvent, useState} from 'react'


import AddIcon from '@mui/icons-material/Add'
import { IconButton, TextField } from '@mui/material'

type Props = {
  onCreateItem: (title: string) => void
  disabled?: boolean

}

export const AddItemForm = ({ onCreateItem, disabled }: Props) => {
  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const createItemHandler = () => {
    const trimmedTitle = title.trim()
    if (trimmedTitle !== '') {
      onCreateItem(trimmedTitle)
      setTitle('')
    } else {
      setError('Title is required')
    }
  }

  const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
    setError(null)
  }

  const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      createItemHandler()
    }
  }

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }} >
        <TextField className={error ? 'error' : ''}
                error={!!error}
                label={'Enter a title'}
               value={title}
               onChange={changeTitleHandler}
               onKeyDown={createItemOnEnterHandler}
               size='small'
               variant="standard" 
               helperText={error}
               onBlur={() => setError(null)}
               autoFocus
               disabled={disabled}

               />
<IconButton disabled={disabled}>

        <AddIcon color='primary' onClick={createItemHandler}  />
</IconButton>
      </div>
    </>
  )
}