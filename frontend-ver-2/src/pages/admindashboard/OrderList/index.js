import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";

import React, { useRef } from "react";
import Slider from "react-slick";
import { MdBrandingWatermark } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";

import LinearProgress from '@mui/material/LinearProgress';
import UserAvatarImgComponent from "../../components/userAvatarImg";
import Rating from '@mui/material/Rating';
// import Button from "@mui/material/Button";
import { FaReply } from "react-icons/fa";
// import DashboardBox from "./components/dashboardBox";
import { HiDotsVertical } from "react-icons/hi";
// import { FaUserCircle } from "react-icons/fa";
// import { IoMdCart } from "react-icons/io";
// import { MdShoppingBag } from "react-icons/md";
import { GiStarsStack } from "react-icons/gi";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useContext, useEffect, useState } from "react";
import { IoIosTimer } from "react-icons/io";
import Button from '@mui/material/Button';
import { Chart } from "react-google-charts";
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { FaEye } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagination from '@mui/material/Pagination';
// import { MyContext } from "../../App";
import Checkbox from "@mui/material/Checkbox";
// import { useState } from "react";
import DashboardBox from "../Dashboard/components/dashboardBox";
import { FaUserCircle } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { MdShoppingBag } from "react-icons/md";
// import { emphasize, styled } from "@mui/material/styles";
// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Chip from "@mui/material/Chip";
// import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
// import DashboardBox from "../Dashboard/components/dashboardBox";
// import { Pagination, Rating } from "@mui/material";
import { MyContext } from "../../App";
import { FaCloudUploadAlt, FaTrashAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
import { MdDateRange } from "react-icons/md";





const StyledBreadcumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
        theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[800];
    return {
        backgroundColor,
        height: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: emphasize(backgroundColor, 0.06),
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(backgroundColor, 0.12),
        },
    };
});



const OrderList = () => {

    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    

    const rows = [
        {
            Order_Id: '67122cd152401e7d1cc819ae', Paymant_Id: 'pay_PASDh2097f3B02',
            Products: 'Click here to view', Name: 'demo',
            Phone_Number: ' 9490261313', Address: 'srirampuram,near saradha vikas school,Gudivada.Gudivada',
            Pincode: '516001', Total_amount: 1500,
            Email: 'demo12@gmail.com', UserId: '67122ac3019ba270ce4670db',
            Created_date: '2024-10-18'
        },
        {
            Order_Id: '67122cd152401e7d1cc819ae', Paymant_Id: 'pay_PASDh2097f3B02',
            Products: 'Click here to view', Name: 'demo',
            Phone_Number: ' 9490261313', Address: 'srirampuram,near saradha vikas school,Gudivada.Gudivada',
            Pincode: '516001', Total_amount: 1500,
            Email: 'demo12@gmail.com', UserId: '67122ac3019ba270ce4670db',
            Created_date: '2024-10-18'
        },
        {
            Order_Id: '67122cd152401e7d1cc819ae', Paymant_Id: 'pay_PASDh2097f3B02',
            Products: 'Click here to view', Name: 'demo',
            Phone_Number: ' 9490261313', Address: 'srirampuram,near saradha vikas school,Gudivada.Gudivada',
            Pincode: '516001', Total_amount: 1500,
            Email: 'demo12@gmail.com', UserId: '67122ac3019ba270ce4670db',
            Created_date: '2024-10-18'
        },
        {
            Order_Id: '67122cd152401e7d1cc819ae', Paymant_Id: 'pay_PASDh2097f3B02',
            Products: 'Click here to view', Name: 'demo',
            Phone_Number: ' 9490261313', Address: 'srirampuram,near saradha vikas school,Gudivada.Gudivada',
            Pincode: '516001', Total_amount: 1500,
            Email: 'demo12@gmail.com', UserId: '67122ac3019ba270ce4670db',
            Created_date: '2024-10-18'
        },
        {
            Order_Id: '67122cd152401e7d1cc819ae', Paymant_Id: 'pay_PASDh2097f3B02',
            Products: 'Click here to view', Name: 'demo',
            Phone_Number: ' 9490261313', Address: 'srirampuram,near saradha vikas school,Gudivada.Gudivada',
            Pincode: '516001', Total_amount: 1500,
            Email: 'demo12@gmail.com', UserId: '67122ac3019ba270ce4670db',
            Created_date: '2024-10-18'
        },
        {
            Order_Id: '67122cd152401e7d1cc819ae', Paymant_Id: 'pay_PASDh2097f3B02',
            Products: 'Click here to view', Name: 'demo',
            Phone_Number: ' 9490261313', Address: 'srirampuram,near saradha vikas school,Gudivada.Gudivada',
            Pincode: '516001', Total_amount: 1500,
            Email: 'demo12@gmail.com', UserId: '67122ac3019ba270ce4670db',
            Created_date: '2024-10-18'
        },
        {
            Order_Id: '67122cd152401e7d1cc819ae', Paymant_Id: 'pay_PASDh2097f3B02',
            Products: 'Click here to view', Name: 'demo',
            Phone_Number: ' 9490261313', Address: 'srirampuram,near saradha vikas school,Gudivada.Gudivada',
            Pincode: '516001', Total_amount: 1500,
            Email: 'demo12@gmail.com', UserId: '67122ac3019ba270ce4670db',
            Created_date: '2024-10-18'
        },
        {
            Order_Id: '67122cd152401e7d1cc819ae', Paymant_Id: 'pay_PASDh2097f3B02',
            Products: 'Click here to view', Name: 'demo',
            Phone_Number: ' 9490261313', Address: 'srirampuram,near saradha vikas school,Gudivada.Gudivada',
            Pincode: '516001', Total_amount: 1500,
            Email: 'demo12@gmail.com', UserId: '67122ac3019ba270ce4670db',
            Created_date: '2024-10-18'
        },
        {
            Order_Id: '67122cd152401e7d1cc819ae', Paymant_Id: 'pay_PASDh2097f3B02',
            Products: 'Click here to view', Name: 'demo',
            Phone_Number: ' 9490261313', Address: 'srirampuram,near saradha vikas school,Gudivada.Gudivada',
            Pincode: '516001', Total_amount: 1500,
            Email: 'demo12@gmail.com', UserId: '67122ac3019ba270ce4670db',
            Created_date: '2024-10-18'
        },
        {
            Order_Id: '67122cd152401e7d1cc819ae', Paymant_Id: 'pay_PASDh2097f3B02',
            Products: 'Click here to view', Name: 'demo',
            Phone_Number: ' 9490261313', Address: 'srirampuram,near saradha vikas school,Gudivada.Gudivada',
            Pincode: '516001', Total_amount: 1500,
            Email: 'demo12@gmail.com', UserId: '67122ac3019ba270ce4670db',
            Created_date: '2024-10-18'
        },
        {
            Order_Id: '67122cd152401e7d1cc819ae', Paymant_Id: 'pay_PASDh2097f3B02',
            Products: 'Click here to view', Name: 'demo',
            Phone_Number: ' 9490261313', Address: 'srirampuram,near saradha vikas school,Gudivada.Gudivada',
            Pincode: '516001', Total_amount: 1500,
            Email: 'demo12@gmail.com', UserId: '67122ac3019ba270ce4670db',
            Created_date: '2024-10-18'
        },
        {
            Order_Id: '67122cd152401e7d1cc819ae', Paymant_Id: 'pay_PASDh2097f3B02',
            Products: 'Click here to view', Name: 'demo',
            Phone_Number: ' 9490261313', Address: 'srirampuram,near saradha vikas school,Gudivada.Gudivada',
            Pincode: '516001', Total_amount: 1500,
            Email: 'demo12@gmail.com', UserId: '67122ac3019ba270ce4670db',
            Created_date: '2024-10-18'
        },
        {
            Order_Id: '67122cd152401e7d1cc819ae', Paymant_Id: 'pay_PASDh2097f3B02',
            Products: 'Click here to view', Name: 'demo',
            Phone_Number: ' 9490261313', Address: 'srirampuram,near saradha vikas school,Gudivada.Gudivada',
            Pincode: '516001', Total_amount: 1500,
            Email: 'demo12@gmail.com', UserId: '67122ac3019ba270ce4670db',
            Created_date: '2024-10-18'
        },
        {
            Order_Id: '67122cd152401e7d1cc819ae', Paymant_Id: 'pay_PASDh2097f3B02',
            Products: 'Click here to view', Name: 'demo',
            Phone_Number: ' 9490261313', Address: 'srirampuram,near saradha vikas school,Gudivada.Gudivada',
            Pincode: '516001', Total_amount: 1500,
            Email: 'demo12@gmail.com', UserId: '67122ac3019ba270ce4670db',
            Created_date: '2024-10-18'
        },
        {
            Order_Id: '67122cd152401e7d1cc819ae', Paymant_Id: 'pay_PASDh2097f3B02',
            Products: 'Click here to view', Name: 'demo',
            Phone_Number: ' 9490261313', Address: 'srirampuram,near saradha vikas school,Gudivada.Gudivada',
            Pincode: '516001', Total_amount: 1500,
            Email: 'demo12@gmail.com', UserId: '67122ac3019ba270ce4670db',
            Created_date: '2024-10-18'
        },
        {
            Order_Id: '67122cd152401e7d1cc819ae', Paymant_Id: 'pay_PASDh2097f3B02',
            Products: 'Click here to view', Name: 'demo',
            Phone_Number: ' 9490261313', Address: 'srirampuram,near saradha vikas school,Gudivada.Gudivada',
            Pincode: '516001', Total_amount: 1500,
            Email: 'demo12@gmail.com', UserId: '67122ac3019ba270ce4670db',
            Created_date: '2024-10-18'
        },
    ]

    const displayedRows = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4">
                    <h5 className="mb-0">Order List</h5>
                    <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
                        <StyledBreadcumb
                            component="a"
                            href="#"
                            label="Dashboard"
                            icon={<HomeIcon fontSize="small" />}
                        />

                        <StyledBreadcumb
                            label="Orders"
                        />
                    </Breadcrumbs>
                </div>

                <div className="row">
                    <div className="col-sm-12">
                        <div className="card p-4">
                            <div className="table-responsive mt-3">
                                <table className="table table-bordered v-align table-striped">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Payment ID</th>
                                            <th>Products</th>
                                            <th>Name</th>
                                            <th>Phone Number</th>
                                            <th>Address</th>
                                            <th>Pincode</th>
                                            <th>Total Amount</th>
                                            <th>Email</th>
                                            <th>User ID</th>
                                            <th>Order Status</th>
                                            <th>Created Date</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {displayedRows.map((row) => (
                                            <tr>
                                                <td>{row.Order_Id}</td>
                                                <td>{row.Paymant_Id}</td>
                                                <td>{row.Products}</td>
                                                <td>{row.Name}</td>
                                                <td>
                                                    <span><FaPhoneAlt /></span>
                                                    {row.Phone_Number}
                                                </td>
                                                <td>{row.Address}</td>
                                                <td>{row.Pincode}</td>
                                                <td>{row.Total_amount}</td>
                                                <td>
                                                    <span><MdEmail /></span>
                                                    {row.Email}
                                                </td>
                                                <td>{row.UserId}</td>
                                                <td>
                                                    <Select
                                                        value={age}
                                                        onChange={handleChange}
                                                        displayEmpty
                                                        inputProps={{ 'aria-label': 'Without label' }}
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        <MenuItem value={10}>Pending</MenuItem>
                                                        <MenuItem value={20}>Confirm</MenuItem>
                                                        <MenuItem value={30}>Delivered</MenuItem>
                                                    </Select>
                                                </td>
                                                <td>
                                                    <span>
                                                        <MdDateRange />
                                                        {row.Created_date}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="d-flex tableFooter">
                                    <p>showing <b>12</b> of <b>60</b> results</p>
                                    <Pagination
                                        count={Math.ceil(rows.length/rowsPerPage)} 
                                        page={page}
                                        color="primary" 
                                        onChange={handleChangePage}
                                        className="pagination"
                                        showFirstButton showLastButton />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default OrderList;