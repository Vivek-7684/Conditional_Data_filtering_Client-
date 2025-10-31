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
import Axios from 'axios';
import api from './api/api.js';
import { TableFooter } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';



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
            <TableContainer sx={{ width: "45vw", height: "60vh" }}>
                <Typography variant='h5'>My Products</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>MaxPrice</strong></TableCell>
                            <TableCell><strong>MinPrice</strong></TableCell>
                            <TableCell><strong>Catgory</strong></TableCell>
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