import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import MenuItem from '@mui/material/MenuItem';
import Rating from '@mui/material/Rating';
import Select from '@mui/material/Select';
import { emphasize, styled } from "@mui/material/styles";
import { useRef, useState } from "react";
import { FaCloudUploadAlt, FaTrashAlt } from "react-icons/fa";
import './productUpload.css';



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


const ProductUpload = () => {

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
                    <h5 className="mb-0">Product Upload</h5>
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
                            deleteIcon={<ExpandMoreIcon />}
                        />

                        <StyledBreadcumb
                            label="Product Upload"
                            deleteIcon={<ExpandMoreIcon />}
                        />
                    </Breadcrumbs>
                </div>

                <form className="form">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card p-4">
                                <h5 className="mb-4">Basic Infomation</h5>

                                <div className="form-group">
                                    <h6>TITLE</h6>
                                    <input type="text" />
                                </div>
                                <div className="form-group">
                                    <h6>DESCRIPTION</h6>
                                    <textarea rows={5} cols={10} />
                                </div>


                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>CATEGORY</h6>
                                            <Select
                                                value={categoryVal}
                                                onChange={handleChangeCategory}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className="w-100"
                                            >
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </div>
                                    </div>


                                    <div className="col">
                                        <div className="form-group">
                                            <h6>BRAND</h6>
                                            <Select
                                                value={brandVal}
                                                onChange={handleChangeBrand}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className="w-100"
                                            >
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="form-group">
                                            <h6>REGULAR PRICE</h6>
                                            <input type="text" className="upload-info" />
                                        </div>
                                    </div>
                                </div>


                                <div className="row">


                                    <div className="col">
                                        <div className="form-group">
                                            <h6>OLD PRICE</h6>
                                            <input type="text" className="upload-info" />
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="form-group">
                                            <h6>IS ACTIVE</h6>
                                            <Select
                                                value={activeVal}
                                                onChange={handleChangeActive}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className="w-100"
                                            >
                                                <MenuItem value={1}>True</MenuItem>
                                                <MenuItem value={0}>False</MenuItem>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="form-group">
                                            <h6>PRODUCT STOCK</h6>
                                            <input type="text" className="upload-info" />
                                        </div>
                                    </div>


                                </div>


                                <div className="row">


                                    <div className="col">
                                        <div className="form-group">
                                            <h6>DISCOUNT</h6>
                                            <input type="text" className="upload-info" />
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="form-group">
                                            <h6>PRODUCT RAMS</h6>
                                            <Select
                                                value={productRamVal}
                                                onChange={handleChangeProductRam}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className="w-100"
                                            >
                                                <MenuItem value={2}>2GB</MenuItem>
                                                <MenuItem value={4}>4GB</MenuItem>
                                                <MenuItem value={6}>8GB</MenuItem>
                                                <MenuItem value={0}>10GB</MenuItem>
                                                <MenuItem value={0}>12GB</MenuItem>
                                            </Select>
                                        </div>
                                    </div>


                                    <div className="col">
                                        <div className="form-group">
                                            <h6>PRODUCT WEIGHTS</h6>
                                            <Select
                                                value={productWeightVal}
                                                onChange={handleChangeProductWeight}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className="w-100"
                                            >
                                                <MenuItem value={2}>2KG</MenuItem>
                                                <MenuItem value={4}>4KG</MenuItem>
                                                <MenuItem value={6}>8KG</MenuItem>
                                                <MenuItem value={0}>10KG</MenuItem>
                                                <MenuItem value={0}>12KG</MenuItem>
                                            </Select>
                                        </div>
                                    </div>




                                </div>

                                <div className="row">

                                    <div className="col">
                                        <div className="form-group">
                                            <h6>PRODUCT SIZE</h6>
                                            <Select
                                                value={productSizeVal}
                                                onChange={handleChangeProductSize}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className="w-100"
                                            >
                                                <MenuItem value={2}>2KG</MenuItem>
                                                <MenuItem value={4}>4KG</MenuItem>
                                                <MenuItem value={6}>8KG</MenuItem>
                                                <MenuItem value={0}>10KG</MenuItem>
                                                <MenuItem value={0}>12KG</MenuItem>
                                            </Select>
                                        </div>
                                    </div>


                                    <div className="col">
                                        <div className="form-group">
                                            <h6>PRODUCT LOCATIONS</h6>
                                            <Select
                                                value={productLocationVal}
                                                onChange={handleChangeProductLocation}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className="w-100"
                                            >
                                                <MenuItem value={2}>2KG</MenuItem>
                                                <MenuItem value={4}>4KG</MenuItem>
                                                <MenuItem value={6}>8KG</MenuItem>
                                                <MenuItem value={0}>10KG</MenuItem>
                                                <MenuItem value={0}>12KG</MenuItem>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="form-group">
                                            <h6>RATINGS</h6>
                                            <Rating
                                                name="simple-controlled"
                                                value={ratingsValue}
                                                onChange={(event, newValue) => {
                                                    setRatingValue(newValue);
                                                }}
                                            />
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
                                    &nbsp; PUBLISH AND VIEW</Button>
                            </div>
                        </div>
                    </div>
                </form >
            </div >
        </>
    )
}

export default ProductUpload;