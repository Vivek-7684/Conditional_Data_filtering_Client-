import { Outlet } from "react-router-dom";
import Form from "../Form.jsx";
import { Box } from "@mui/material";

export default function Layout({ updatedProduct, setUpdateProduct }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', p: 2 }}>
            <Form updatedProduct={updatedProduct} setUpdateProduct={setUpdateProduct} />
            <Outlet />
        </Box>
    );
}
