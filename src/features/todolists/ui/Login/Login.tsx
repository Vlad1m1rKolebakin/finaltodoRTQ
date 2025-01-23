import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Grid2 } from "@mui/material";
import { Controller} from "react-hook-form";
import s from "./Login.module.css";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { Path } from "../../../../common/router/routes";
import { useLogin } from "../../../../common/hooks/useLogin";

export const Login = () => {
  const navigate = useNavigate()
  const { theme, isLoggedIn, control, onSubmit, handleSubmit, errors, register } = useLogin()

useEffect(() => {
  if (isLoggedIn) {
    navigate(Path.Main)
  }
}, [isLoggedIn])
  return (
    <Grid2 container justifyContent={"center"}>
      <Grid item justifyContent={"center"}>
        <FormControl>
          <FormLabel>
            <p>
              To login get registered
              <a
                style={{ color: theme.palette.primary.main, marginLeft: "5px" }}
                href={"https://social-network.samuraijs.com/"}
                target={"_blank"}
                rel="noreferrer"
              >
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>
              <b>Email:</b> free@samuraijs.com
            </p>
            <p>
              <b>Password:</b> free
            </p>
          </FormLabel>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <TextField label="Email" margin="normal" {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: 'Incorrect email address',
                    },
                  })}/>
              {errors.email && <span className={s.errorMessage}>{errors.email.message}</span>}
              <TextField
                type="password"
                label="Password"
                margin="normal"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password should be at least 8 characters",
                  },
                })}
              />
              {errors.password && <span className={s.errorMessage}>{errors.password.message}</span>}

              <FormControlLabel
                label={"Remember me"}
                control={
                    <Controller
                      name={'rememberMe'}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Checkbox onChange={e => onChange(e.target.checked)} checked={value} />
                      )}
                    />
                }
              />
              <Button type={"submit"} variant={"contained"} color={"primary"}>
                Login
              </Button>
            </FormGroup>
          </form>
        </FormControl>
      </Grid>
    </Grid2>
  );
};
