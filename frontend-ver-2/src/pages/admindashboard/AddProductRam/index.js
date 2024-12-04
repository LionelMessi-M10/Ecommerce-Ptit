import HomeIcon from "@mui/icons-material/Home";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import { emphasize, styled } from "@mui/material/styles";

import React, {useEffect, useState} from "react";

// import Button from "@mui/material/Button";
// import DashboardBox from "./components/dashboardBox";
// import { FaUserCircle } from "react-icons/fa";
// import { IoMdCart } from "react-icons/io";
// import { MdShoppingBag } from "react-icons/md";
import Button from '@mui/material/Button';

import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {fetchDataFromApi, postData} from "../../../utils/api";


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


const AddProductRam = () => {
    const [rams,setRams] = useState([]);
    const [newRam, setNewRam] = useState('');

    const getAllRams = async () => {
        const response = await fetchDataFromApi("/seller/rams")
        setRams(response);
    }

    const addRam = async () => {
        if (!newRam.trim()) {
            alert("Please enter a valid RAM value.");
            return;
        }

        const response = await postData("/seller/createRam", { ram: newRam });
        if (response.id) {
            setNewRam("");
            getAllRams();
        } else {
            alert("Failed to add RAM. Please try again.");
        }
    };

    useEffect(() => {
        getAllRams();
    },[])

    console.log("rams",rams);


    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4">
                    <h5 className="mb-0">Add Product Ram</h5>
                    <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
                        <StyledBreadcumb
                            component="a"
                            href="#"
                            label="Dashboard"
                            icon={<HomeIcon fontSize="small" />}
                        />

                        <StyledBreadcumb
                            label="Products"
                            component="a"
                            href="#"
                        />

                        <StyledBreadcumb
                            label="Add Products RAMS"
                        />
                    </Breadcrumbs>
                </div>


                <form className="form">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card p-4">
                                <div className="form-group">
                                    <h6>PRODUCT RAM</h6>
                                    <input
                                        type="text"
                                        value={newRam}
                                        onChange={(e) => setNewRam(e.target.value)}
                                        placeholder="Enter RAM size (e.g., 8GB)"
                                    />
                                </div>
                                <Button className="btn-lg btn-blue btn-big" onClick={addRam}>Add Ram</Button>
                            </div>
                        </div>
                    </div>

                </form>

                <div className="row">
                    <div className="col-sm-12">
                        <div className="card p-4">
                            <div className="table-responsive mt-3">
                                <table className="table table-bordered v-align table-striped">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th style={{width: '75%'}}>PRODUCT RAM</th>
                                            <th>ACTION</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                    {rams.length > 0 ? (
                                        rams.map((ram, index) => (
                                            <tr key={index}>
                                                <td>{ram.ram}</td>
                                                <td>
                                                    <div className="actions d-flex align-items-center">
                                                        <Button className="success" color="success"><FaPencilAlt /></Button>
                                                        <Button className="error" color="error"><MdDelete /></Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="2" className="text-center">No RAMs available</td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}


export default AddProductRam;