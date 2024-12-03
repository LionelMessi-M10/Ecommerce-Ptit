import HomeIcon from "@mui/icons-material/Home";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import { emphasize, styled } from "@mui/material/styles";

import React from "react";

import Button from '@mui/material/Button';

import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


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
                                    <input type="text" />
                                </div>
                                <Button className="btn-lg btn-blue btn-big">Add Size</Button>
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
                                        <tr>
                                            <td>4GB</td>
                                            <td>
                                                <div className="actions d-flex align-items-center">
                                                    <Button className="success" color="success"><FaPencilAlt /></Button>
                                                    <Button className="error" color="error"><MdDelete /></Button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>6GB</td>
                                            <td>
                                                <div className="actions d-flex align-items-center">
                                                    <Button className="success" color="success"><FaPencilAlt /></Button>
                                                    <Button className="error" color="error"><MdDelete /></Button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>8GB</td>
                                            <td>
                                                <div className="actions d-flex align-items-center">
                                                    <Button className="success" color="success"><FaPencilAlt /></Button>
                                                    <Button className="error" color="error"><MdDelete /></Button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>10GB</td>
                                            <td>
                                                <div className="actions d-flex align-items-center">
                                                    <Button className="success" color="success"><FaPencilAlt /></Button>
                                                    <Button className="error" color="error"><MdDelete /></Button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>12GB</td>
                                            <td>
                                                <div className="actions d-flex align-items-center">
                                                    <Button className="success" color="success"><FaPencilAlt /></Button>
                                                    <Button className="error" color="error"><MdDelete /></Button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>16GB</td>
                                            <td>
                                                <div className="actions d-flex align-items-center">
                                                    <Button className="success" color="success"><FaPencilAlt /></Button>
                                                    <Button className="error" color="error"><MdDelete /></Button>
                                                </div>
                                            </td>
                                        </tr>
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