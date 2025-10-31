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

export default function Form() {

    const Navigate = useNavigate();

    const [filter, setFilter] = useState({
        "name": "",
        "maxPrice": "",
        "minPrice": "",
        "category": ""
    });

    const handleChange = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
        setFilter({ ...filter, [e.target.name]: e.target.value });
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
    console.log(filter);



    return (
        <Box sx={{ width: '40vw', p: 3, display: 'flex', flexDirection: 'row', gap: '1rem', justifyItems: 'center', alignContent: 'center' }}>
            <form>
                <Typography variant='h5'>Select Filter</Typography>
                <TextField label="name" name="name" margin="normal" onChange={(e) => handleChange(e)} variant='outlined' fullWidth />
                <TextField type='number' name="maxPrice" label="MaxPrice" margin="normal" onChange={(e) => handleChange(e)} variant='outlined' fullWidth />
                <TextField type='number' name="minPrice" label="MinPrice" margin="normal" onChange={(e) => handleChange(e)} variant='outlined' fullWidth />
                <TextField select label="category" name="category" value={filter.category} margin="normal" variant='outlined' onChange={(e) => handleChange(e)} fullWidth >
                    <MenuItem value="Electronics">Electronics</MenuItem>
                    <MenuItem value="Cloth">Cloth</MenuItem>
                    <MenuItem value="Accessories">Accessories</MenuItem>
                    <MenuItem value="Sports">Sports</MenuItem>
                </TextField>

                <Button variant='contained' fullWidth sx={{ p: 1 }} onClick={() => handleSearch()}>Get Product</Button>
            </form>
        </Box>
    )
}
