import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useEffect } from 'react';
import { useState } from 'react';
import Axios from 'axios';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import api from './api/api.js';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { productSchemaForFilter } from '../validation.js';
import { Stack } from '@mui/material';
import { startsWith } from 'zod';

export default function Form() {

    const Navigate = useNavigate();

    const [filter, setFilter] = useState({});

    const [error, setError] = useState({});

    const handleChange = (e) => {

        if (e.target.value.trimStart() === "") {
            e.target.value = "";
        }

        setFilter({ ...filter, [e.target.name]: e.target.value });

        const updatedFields = { ...filter, [e.target.name]: e.target.value };

        let result;

        if (e.target.value.trim() !== '') {
            result = productSchemaForFilter.safeParse(updatedFields);
        }

        if (!result?.success) {
            setError(result?.error.flatten().fieldErrors);
        } else if (result === undefined || result?.success) {
            setError({});
        }
    };

    const handleSearch = async () => {

        let params = [];

        if (filter.name) params.push(`name=${filter.name}`);
        if (filter.maxPrice) params.push(`maxPrice=${filter.maxPrice}`);
        if (filter.minPrice) params.push(`minPrice=${filter.minPrice}`);
        if (filter.category) params.push(`category=${filter.category}`);

        const filterProduct = `/?${params.join('&')}`;

        Navigate(filterProduct);
    }

    return (
        <Box sx={{ width: '40vw', height: '80vh', px: 2, display: 'flex', flexDirection: 'row', gap: '1rem', justifyItems: 'center', alignContent: 'center' }}>
            <form>
                <Typography variant='h5'>Products</Typography>
                <TextField error={error?.name} helperText={error?.name?.join(".")} value={filter?.name || ""} label="name" name="name" margin="normal" onChange={(e) => handleChange(e)} variant='outlined' fullWidth />
                <TextField error={error?.maxPrice} helperText={error?.maxPrice?.join(".")} value={filter?.maxPrice || ""} type='number' name="maxPrice" label="MaxPrice" margin="normal" onChange={(e) => handleChange(e)} variant='outlined' fullWidth />
                <TextField error={error?.minPrice} helperText={error?.minPrice?.join(".")} value={filter?.minPrice || ""} type='number' name="minPrice" label="MinPrice" margin="normal" onChange={(e) => handleChange(e)} variant='outlined' fullWidth />
                <TextField error={error?.category} helperText={error?.category?.join(".")} value={filter?.category || ""} select label="category" name="category" margin="normal" variant='outlined' onChange={(e) => handleChange(e)} fullWidth >
                    <MenuItem value="Electronics">Electronics</MenuItem>
                    <MenuItem value="Cloth">Cloth</MenuItem>
                    <MenuItem value="Accessories">Accessories</MenuItem>
                    <MenuItem value="Sports">Sports</MenuItem>
                </TextField>

                <Stack direction={"row"} gap="1rem" sx={{ mt: 1 }}>
                    <Button disabled={Object.keys(error || {}).length > 0} variant='contained' fullWidth sx={{ p: 1 }} onClick={() => handleSearch()}>Get Product</Button>
                    <Button disabled={Object.keys(error || {}).length > 0} variant='contained' fullWidth sx={{ p: 1 }} >Add Product</Button>
                </Stack>

            </form>
        </Box>
    )
}
