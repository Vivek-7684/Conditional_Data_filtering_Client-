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
import { Alert } from '@mui/material';


export const Product = ({ updatedProduct, setUpdateProduct }) => {

    console.log(updatedProduct);

    console.log(setUpdateProduct);

    const [product, setProduct] = useState([]);

    const navigate = useNavigate();

    const location = useLocation();

    const [alert, setAlert] = useState({
        show: false,
        type: "",
        messages: []
    });

    const getAllProducts = () => {
        api.get(`/Product${location.search}`)
            .then((response) => { setProduct(response.data); })
            .catch((err) => {

                let messages = [];

                if (Array.isArray(err?.response?.data)) {
                    messages = err.response.data.map((errmsg) => errmsg.msg);
                } else if (err?.response?.data) {
                    messages = [err.response.data];
                }

                setAlert({
                    show: true,
                    type: "error",
                    messages: messages ? messages : [err.message]
                });

                console.log(err.message);

                setTimeout(() => {
                    setAlert({ show: false, type: "", messages: [] });
                }, 3000);

            });
    }

    const deleteProduct = (id) => {
        api.delete(`/DeleteProduct/${id}`)
            .then(() => {
                setAlert({
                    show: true,
                    type: "success",
                    messages: ["Product Deleted successfully"]
                });

                setTimeout(() => {
                    setAlert({ show: false, type: "", messages: [] });
                    navigate(0);
                }, 3000);

                setTimeout(() => {
                    navigate(0);
                }, 1000);
            })
            .catch((err) => {
                let messages = [];

                if (Array.isArray(err.response.data)) {
                    messages = err.response.data.map((errmsg) => errmsg.msg);
                } else {
                    messages = [err.response.data];
                }

                setAlert({
                    show: true,
                    type: "error",
                    messages
                });

                setTimeout(() => {
                    setAlert({ show: false, type: "", messages: [] });
                }, 3000);
            })
    }

    useEffect(() => getAllProducts(), [location.search]);

    return (

        <Stack gap='2rem' sx={{ width: "40vw", p: 5 }}>
            {alert.show &&
                alert.messages.map((msg, idx) => (
                    <Alert
                        key={idx}
                        severity={alert.type}
                        sx={{ m: 2, width: "40vw", position: "absolute", top: 1, left: 10 }}
                        onClose={() => setAlert({ show: false, type: "", messages: [] })}
                    >
                        {msg}
                    </Alert>
                ))
            }
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
                                    <TableCell><EditIcon sx={{ color: "primary.main", fontSize: '25px' }} />{" "}<DeleteIcon sx={{ color: "red", fontSize: '25px' }} onClick={() => deleteProduct(data.id)} /></TableCell>
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