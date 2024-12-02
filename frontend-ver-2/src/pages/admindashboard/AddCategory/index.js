import HomeIcon from "@mui/icons-material/Home";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import { emphasize, styled } from "@mui/material/styles";

import React, { useRef } from "react";

import Button from '@mui/material/Button';
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import './categoryUpload.css';


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


const AddCategory = () => {

    const [newCatetory, setCategory] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const fileInputRef = useRef();

    const [formData, setFormData] = useState({
        categoryName: '',
        categoryImage: '',
        colorCategory: '',
        enabled: 1,
    });

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
                    <h5 className="mb-0">Add Category</h5>
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
                            label="Add Category"
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
                                            ref={fileInputRef}
                                            onChange={handleImageUpload}
                                            style={{ display: 'none' }} // Hide the input
                                        />
                                    </div>
                                </div>
                                <Button className="btn-lg btn-blue btn-big">Add Category</Button>
                            </div>
                        </div>
                    </div>

                </form>

            </div>
        </>
    )
}

export default AddCategory;