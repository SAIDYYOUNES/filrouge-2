import React from 'react'/* eslint-disable react-hooks/exhaustive-deps */
import { CloudUpload, Try } from '@mui/icons-material'
import { Autocomplete, Box, Button, Chip, CircularProgress, Stack, TextField, Typography } from '@mui/material'

import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../Redux/Posts/actions'


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
    const [linkError, setlinkError] = useState(null)
    const onSubmit = (data) => {
        if(!data.links) return setlinkError('Please enter a valid link')

        if (file) {
            let formData = new FormData();
            formData.append('image', file);
            axios.post('/upload', formData)
                .then((res) => res.data)
                .then(({ filename }) => {
                    data.image = filename
                    data.user = user._id
                    dispatch(createPost(data))
                    toast.success('recommendation added')

                })
        }
        else {
            const { image, ...postData } = data
            postData.user = user._id
            dispatch(createPost(postData))
            toast.success('recommendation added')
        }
    }



    return (
        <>
            <div className="container mx-auto flex justify-center">

                <div className='container mx-40 mb-32'>
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
                                            multiline
                                            rows={8}
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
                                <Typography variant="h6" textTransform="capitalize" marginBottom={'1rem'} >Links</Typography>
                                <Controller
                                    name="links"
                                    control={control}
                                    rules={{
                                        pattern: {
                                            value: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
                                            message: 'Please enter a valid link'
                                        }
                                    }}
                                    render={({ field, fieldState: { invalid, error } }) => (
                                        <Autocomplete
                                            {...field}
                                            options={[]}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    error={invalid}
                                                    helperText={error?.message}
                                                    placeholder="Example: http://website.com/hhh/..."
                                                    label="Links"
                                                />
                                            )}
                                            renderTags={(tags, getTagProps) => tags.map((tag, index) => <Chip {...getTagProps({ index })} label={tag} />)}
                                            multiple
                                            freeSolo
                                            onChange={(e, value) => field.onChange(value)}
                                        />
                                    )}
                                />
                                 {linkError && (
                                                <Typography color="error">{linkError}</Typography>
                                            )}

                                <Controller
                                    control={control}
                                    name={'image'}
                                    rules={{

                                    }}
                                    render={({ field, fieldState }) => (
                                        <>
                                        <div className="flex justify-center">

                                            <label htmlFor="uploadFile1"
                                                className="bg-white text-black text-base rounded w-[50rem] h-40 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 mb-2 fill-black" viewBox="0 0 32 32">
                                                    <path
                                                        d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                                                        data-original="#000000" />
                                                    <path
                                                        d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                                                        data-original="#000000" />
                                                </svg>
                                                Upload file
                                                <input type="file" id='uploadFile1' className="hidden"  onChange={
                                                            (e) => {
                                                                setFile(e.target.files[0])
                                                                field.onChange(e.target.files[0])
                                                            }
                                                        }  />
                                                <p className="text-xs text-gray-400 mt-2">PNG, JPG SVG, WEBP, and GIF are Allowed.</p>
                                            </label>
                                        </div>

                                            {fieldState.invalid && (
                                                <Typography color="error">{fieldState.error?.message}</Typography>
                                            )}
                                        </>
                                    )} />
                                <div className="flex justify-center">

                                    <Button style={{ width: 350 }} variant="contained" type="submit">
                                        Submit
                                    </Button>
                                </div>

                            </Stack>
                        </form></>
                </div>
            </div>

        </>
    )
}

