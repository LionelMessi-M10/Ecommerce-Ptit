import HomeIcon from "@mui/icons-material/Home";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import { emphasize, styled } from "@mui/material/styles";

import React, {useEffect, useState} from "react";

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



const AddProductSize = () => {
    const [size,setSize] = useState([]);
    const [newSize, setNewSize] = useState('');

    const getAllSize = async () => {
        const response = await fetchDataFromApi("/seller/productSize")
        setSize(response);
    }

    const addsize = async () => {
        if (!newSize.trim()) {
            alert("Please enter a valid size value.");
            return;
        }

        const response = await postData("/seller/createProductSize", { screenSize: newSize });
        if (response.id) {
            setNewSize("");
            getAllSize();
        } else {
            alert("Failed to add RAM. Please try again.");
        }
    };

    useEffect(() => {
        getAllSize();
    },[])

    console.log("size",size);
    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4">
                    <h5 className="mb-0">Add Product Size</h5>
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
                            label="Add Products SIZE"
                        />
                    </Breadcrumbs>
                </div>


                <form className="form">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card p-4">
                                <div className="form-group">
                                    <h6>PRODUCT SIZE</h6>
                                    <input
                                        type="text"
                                        value={newSize}
                                        onChange={(e) => setNewSize(e.target.value)}
                                        placeholder="Enter size (e.g., 15.6inch)"
                                    />
                                </div>
                                <Button className="btn-lg btn-blue btn-big" onClick={addsize}>Add Size</Button>
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
                                            <th style={{ width: '75%' }}>PRODUCT SIZE</th>
                                            <th>ACTION</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                    {size.length > 0 ? (
                                        size.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.screenSize}</td>
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
                                            <td colSpan="2" className="text-center">No Sizes available</td>
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

export default AddProductSize;