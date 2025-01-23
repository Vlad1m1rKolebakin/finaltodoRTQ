import { TextField } from "@mui/material";
import { type ChangeEvent, useState } from "react";

type Props = {
  value: string;
  onChange: (title: string) => void;
  disabled?: boolean
};

export const EditableSpan = ({ value, onChange , disabled}: Props) => {
  const [title, setTitle] = useState(value);
  const [isEditMode, setIsEditMode] = useState(false);

  const turnOnEditMode = () => {
    setIsEditMode(true);
  };

  const turnOffEditMode = () => {
    setIsEditMode(false);
    onChange(title);
  };

  const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  return (
    <>
      {isEditMode ? (
        <TextField
          value={title}
          onChange={changeTitle}
          onBlur={turnOffEditMode}
          onKeyDown={(event) => event.key === "Enter" && turnOffEditMode()}
          autoFocus
          size='small'
          variant="standard" 
          disabled={disabled}
        />
      ) : (
        <span onDoubleClick={turnOnEditMode}>{value}</span>
      )}
    </>
  );
};
