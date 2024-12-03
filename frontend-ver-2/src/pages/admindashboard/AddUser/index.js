import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import Chip from "@mui/material/Chip";
import FormControlLabel from '@mui/material/FormControlLabel';
import { emphasize, styled } from "@mui/material/styles";
import { useRef, useState } from "react";
import { FaCloudUploadAlt, FaTrashAlt } from "react-icons/fa";
import './addUser.css';



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


const AddUser = () => {

    const [selectedImages, setSelectedImages] = useState([]);
    const [categoryVal, setcategoryVal] = useState('');
    const [brandVal, setBrandVal] = useState('');
    const [activeVal, setActiveVal] = useState('');
    const [productRamVal, setProductRamVal] = useState('');
    const [productWeightVal, setProductWeightVal] = useState('');
    const [productSizeVal, setProductSizeVal] = useState('');
    const [productLocationVal, setProductLocationVal] = useState('');
    const [ratingsValue, setRatingValue] = useState(1);
    const fileInputRef = useRef();

    const handleChangeCategory = (event) => {
        setcategoryVal(event.target.value);
    };

    const handleChangeBrand = (event) => {
        setBrandVal(event.target.value);
    }

    const handleChangeActive = (event) => {
        setActiveVal(event.target.value);
    }

    const handleChangeProductRam = (event) => {
        setProductRamVal(event.target.value);
    }

    const handleChangeProductWeight = (event) => {
        setProductWeightVal(event.target.value);
    }

    const handleChangeProductSize = (event) => {
        setProductSizeVal(event.target.value);
    }

    const handleChangeProductLocation = (event) => {
        setProductLocationVal(event.target.value);
    }

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
                    <h5 className="mb-0">AddUser</h5>
                    <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
                        <StyledBreadcumb
                            component="a"
                            href="#"
                            label="Dashboard"
                            icon={<HomeIcon fontSize="small" />}
                        />

                        <StyledBreadcumb
                            label="User"
                            component="a"
                            href="#"
                            deleteIcon={<ExpandMoreIcon />}
                        />

                        <StyledBreadcumb
                            label="AddUser"
                            deleteIcon={<ExpandMoreIcon />}
                        />
                    </Breadcrumbs>
                </div>

                <form className="form">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card p-4">
                                <h5 className="mb-4">User Infomation</h5>


                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>NAME</h6>
                                            <input type="text" className="upload-info" />
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="form-group">
                                            <h6>EMAIL</h6>
                                            <input type="text" className="upload-info" />
                                        </div>
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>TELEPHONE</h6>
                                            <input type="text" className="upload-info" />
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="form-group">
                                            <h6>ADDRESS</h6>
                                            <input type="text" className="upload-info" />
                                        </div>
                                    </div>
                                    
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>SET ENABLE</h6>
                                            <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                                        </div>
                                    </div>

                                </div>

                                <br />

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

                                <Button className="btn-blue btn-lg btn-big"><FaCloudUploadAlt />
                                    &nbsp; ADD NEW USER</Button>
                            </div>
                        </div>
                    </div>
                </form >
            </div >
        </>
    )
}

export default AddUser;