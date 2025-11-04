import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useEffect } from 'react';
import api from './api/api.js';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';



export const Product = () => {

    const [product, setProduct] = useState([]);

    const navigate = useNavigate();

    const location = useLocation();

    const getAllProducts = () => {
        api.get(`/Product${location.search}`)
            .then((response) => { setProduct(response.data); console.log(response.data); })
            .catch((err) => err.message)
    }

    useEffect(() => getAllProducts(), [location.search]);

    return (
        <Stack gap='2rem' sx={{ width: "40vw", p: 5 }}>
            <TableContainer sx={{ width: "50vw", height: "70vh" }}>
                <Typography variant='h5'>My Products</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>MaxPrice</strong></TableCell>
                            <TableCell><strong>MinPrice</strong></TableCell>
                            <TableCell><strong>Catgory</strong></TableCell>
                            <TableCell><strong>Action</strong></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {product.map((data) => {
                            return (
                                <TableRow key={data.name}>
                                    <TableCell>{data.name}</TableCell>
                                    <TableCell>{data.maxPrice}</TableCell>
                                    <TableCell>{data.minPrice}</TableCell>
                                    <TableCell>{data.category}</TableCell>
                                    <TableCell><EditIcon sx={{ color: "primary.main", fontSize: '25px' }} />{" "}<DeleteIcon sx={{ color: "red", fontSize: '25px' }} /></TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant='contained' sx={{ p: 1, width: '100%' }} onClick={() => { getAllProducts(); }}>Get All Products</Button>
        </Stack>
    )
}