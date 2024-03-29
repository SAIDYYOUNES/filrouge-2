import { Button, Grid } from '@mui/material';
import { Controller,  useForm } from 'react-hook-form';
import { TextField } from '@mui/material';
import { InputAdornment } from '@mui/material';
import { IconButton } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../Redux/Users/actions';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
        handleSubmit: handleLogin,
        control: loginControl,
    } = useForm({
        mode: 'onTouched'
    })
    const onLogin = (data) => {
        dispatch(login(data))
        navigate('/')
    }

    return (
        <>
            <form className="flex flex-col gap-3" onSubmit={handleLogin(onLogin)}>


                <Controller
                    name="email"
                    control={loginControl}
                    rules={{
                        required: { value: true, message: "Email must not be empty" },
                        pattern: { value: /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/g, message: "Email cant contain white space" }
                    }}
                    render={({
                        field,
                        fieldState: { invalid, error }
                    }) =>
                        <TextField
                            {...field}
                            label="Email"
                            variant="outlined"
                            error={invalid}
                            helperText={error?.message} />
                    }
                />
                <Controller
                    name="password"
                    control={loginControl}
                    rules={{
                        required: { value: true, message: "Password must not be empty" },
                        pattern: { value: /[a-zA-Z0-9]/g, message: "Password cant contain white space" }
                    }}
                    render={({
                        field,
                        fieldState: { invalid, error }
                    }) =>
                        <TextField
                            {...field}
                            type={showPassword ? "text" : "password"}
                            label="Password Confirmation"
                            variant="outlined"
                            error={invalid}
                            helperText={error?.message}
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    }
                />

                <button type='submit' className="bg-[#3b5998] mt-3 hover:bg-[#3b5998] text-white text-sm font-semibold py-2 px-4 border border-[#3b5998] rounded">
                    SIGN IN
                </button>
               
            </form>
        </>
    )
}
