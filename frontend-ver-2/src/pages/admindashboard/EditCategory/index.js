import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";

import React, { useRef } from "react";
import Slider from "react-slick";
import { MdBrandingWatermark } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";

import LinearProgress from '@mui/material/LinearProgress';
import UserAvatarImgComponent from "../../../components/userAvatarImg";
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
// import Pagination from '@mui/material/Pagination';
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
import { MyContext } from "../../../App";
import { FaCloudUploadAlt, FaTrashAlt } from "react-icons/fa";
import './categoryEdit.css';


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


const EditCategory = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const fileInputRef = useRef();

    const handleImageUpload = (e) => {
        setSelectedImages([...selectedImages, ...e.target.files]);
    };

    const handleImageRemove = (index) => {
        const newImages = [...selectedImages];
        newImages.splice(index, 1);
        setSelectedImages(newImages);
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4">
                    <h5 className="mb-0">Edit Category</h5>
                    <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
                        <StyledBreadcumb
                            component="a"
                            href="#"
                            label="Dashboard"
                            icon={<HomeIcon fontSize="small" />}
                        />

                        <StyledBreadcumb
                            label="Category"
                            component="a"
                            href="#"
                        />

                        <StyledBreadcumb
                            label="Edit Category"
                        />
                    </Breadcrumbs>
                </div>


                <form className="form">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card p-4">
                                <div className="form-group">
                                    <h6>Category Name</h6>
                                    <input type="text" />
                                </div>

                                <div className="form-group">
                                    <h6>Color</h6>
                                    <input type="text" />
                                </div>

                                <div className="media-container">
                                    {selectedImages.map((image, index) => (
                                        <div key={index} className="media-item">
                                            <img src={URL.createObjectURL(image)} alt={`Uploaded ${index}`} />
                                            <button type="button" className="remove-btn" onClick={() => handleImageRemove(index)}>
                                                <FaTrashAlt />
                                            </button>
                                        </div>
                                    ))}
                                    <div className="image-upload" onClick={triggerFileInput}>
                                        <p>Upload images</p>
                                        <input
                                            type="file"
                                            multiple
                                            ref={fileInputRef}
                                            onChange={handleImageUpload}
                                            style={{ display: 'none' }} // Hide the input
                                        />
                                    </div>
                                </div>
                                <Button className="btn-lg btn-blue btn-big">Update Category</Button>
                            </div>
                        </div>
                    </div>

                </form>

            </div>
        </>
    )
}

export default EditCategory;