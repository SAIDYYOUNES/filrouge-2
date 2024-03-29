import { Button, Grid } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { IconButton } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

// import { register } from "../../redux/actions";
// import { useDispatch } from "react-redux";
// import GoogleIn from "./Google-in";

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = 'b,nb'
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const {
        handleSubmit: handleRegister,
        control: registerControl,
        watch
    } = useForm({ mode: 'onTouched' })

    const onRegister = (data) => { 
        console.log(data)
        // dispatch(register(data))
     }
    const password = watch('password', '');


    return (
        <>
            <form className="flex flex-col gap-3" onSubmit={handleRegister(onRegister)}>

                <div className="flex gap-2">
                    <Controller
                        name="firstName"
                        control={registerControl}
                        rules={{
                            required: { value: true, message: "First Name must not be empty" },
                            pattern: { value: /[a-zA-Z0-9]/g, message: "First Name cant contain white space" }
                        }}
                        render={({
                            field,
                            fieldState: { invalid, error }
                        }) => (
                            <TextField
                                {...field}
                                label="FirstName"
                                variant="outlined"
                                error={invalid}
                                helperText={error?.message} />
                        )}
                    />
                    <Controller
                        name="lastName"
                        control={registerControl}
                        rules={{
                            required: { value: true, message: "Last Name must not be empty" },
                            pattern: { value: /[a-zA-Z0-9]/g, message: "Name cant contain white space" }
                        }}
                        render={({
                            field,
                            fieldState: { invalid, error }
                        }) => (
                            <TextField
                                {...field}
                                label="LastName"
                                variant="outlined"
                                error={invalid}
                                helperText={error?.message} />
                        )}
                    />
                </div>


                <Controller
                    name="email"
                    control={registerControl}
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
                    control={registerControl}
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
                            type={showPassword ? 'text' : 'password'}
                            label="Password"
                            variant="outlined"
                            error={error}
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
                <Controller
                    name="confirmPassword"
                    control={registerControl}
                    rules={{
                        required: { value: true, message: "Confirm Password must not be empty" },
                        validate: value => value === password || "Passwords do not match"
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
                                            edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    }
                />

                <button type='submit' className="bg-[#3b5998] mt-3 hover:bg-[#3b5998] text-white text-sm font-semibold py-2 px-4 border border-[#3b5998] rounded">
                    SIGN UP
                </button>
               
            </form>
        </>
    )
}
