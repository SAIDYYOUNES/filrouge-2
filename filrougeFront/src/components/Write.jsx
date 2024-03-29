import React from 'react'/* eslint-disable react-hooks/exhaustive-deps */
import { CloudUpload, Try } from '@mui/icons-material'
import { Autocomplete, Backdrop, Button, Chip, CircularProgress, Stack, TextField, Typography } from '@mui/material'

import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


export default function Write() {
    const navigate = useNavigate
    const [file, setFile] = useState(null)
    const { logged, user } = useSelector((state) => state.users)

    const dispatch = useDispatch()

    const {
        handleSubmit,
        control
    } = useForm({
        mode: 'onTouched',
    })
    const onSubmit = (data) => {
        let formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'lywpdwmv');

        axios.post('https://api.cloudinary.com/v1_1/ddhvsoxyy/upload', formData)
            .then(response => {
                data.image = response.data.secure_url;
            })
            .then(() => {
                data.user = user._id
                dispatch(createPost(data))
            })
            .catch(err => {
                toast.error(err)
            })




    }



    return (
        <>
            <div>
                <>

                    <Typography
                        variant="h4" textTransform="capitalize" align="center"
                        fontWeight={'bold'} marginBottom={'1rem'} >Create Post </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={2}>
                            <Controller
                                control={control}
                                name={'title'}
                                rules={{
                                    required: { value: true, message: 'Title is required' },
                                    pattern: { value: /\w+/i, message: 'Title must be at least 3 characters long' },
                                }}
                                render={({ field, fieldState: { error, invalid } }) => (
                                    <TextField
                                        {...field}
                                        label="title"
                                        variant="outlined"
                                        error={invalid}
                                        helperText={error?.message} />
                                )} />
                            <Controller
                                control={control}
                                name={'content'}
                                rules={{
                                    required: { value: true, message: 'Content is required' },
                                    pattern: {
                                        value: /\w+/i,
                                        message: 'Content must be at least 3 characters long',
                                    },
                                }}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        label="content"
                                        variant="outlined"
                                        {...field}
                                        error={Boolean(fieldState.invalid)}
                                        helperText={fieldState.error?.message} />
                                )} />

                            <Controller
                                name="tags"
                                control={control}
                                rules={{
                                    required: { value: true, message: 'Tags are required' },
                                }}
                                render={({ field, fieldState: { invalid, error } }) => (
                                    <Autocomplete
                                        {...field}
                                        options={[]}
                                        renderTags={(tags, getTagProps) => tags.map((tag, index) => <Chip {...getTagProps({ index })} label={tag} />)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                error={invalid}
                                                helperText={error?.message}
                                                placeholder="Example : Sports,Culture"
                                                label="Tags" />
                                        )}
                                        multiple
                                        freeSolo
                                        onChange={(e, value) => field.onChange(value)} />
                                )} />
                            <Controller
                                control={control}
                                name={'image'}
                                rules={{
                                    required: { value: true, message: 'Image is required' },
                                }}
                                render={({ field, fieldState }) => (
                                    <>
                                        <Button
                                            component="label"
                                            variant="contained"
                                            startIcon={<CloudUpload />}
                                        >
                                            Upload file
                                            <input
                                                hidden
                                                type="file"
                                                accept="image/*"
                                                onChange={
                                                    (e) => {
                                                        setFile(e.target.files[0])
                                                        field.onChange(e.target.files[0])
                                                    }
                                                } />
                                        </Button>
                                        {fieldState.invalid && (
                                            <Typography color="error">{fieldState.error?.message}</Typography>
                                        )}
                                    </>
                                )} />
                            <Button variant="contained" type="submit">
                                Submit
                            </Button>

                        </Stack>
                    </form></>
            </div>

        </>
    )
}

