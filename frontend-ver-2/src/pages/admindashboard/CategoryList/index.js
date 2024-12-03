import HomeIcon from "@mui/icons-material/Home";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import { emphasize, styled } from "@mui/material/styles";

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, { useEffect, useState } from "react";

import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { deleteCategoryList, fetchCategoryList } from "./CategoryListService/CategoryListService";
import "./listCategory.css";


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



const CategoryList = () => {

    const [showBy, setshowBy] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategoryList().then(data => {
            setCategories(data);
        }).catch(error => {
            console.error('Có lỗi xảy ra khi lọc dữ liệu:', error);
        });
    }, []);

    const handleDelete = (id) => {
        deleteCategoryList(id).then(data => {
            setCategories(categories.map((item) => {
                if(item.id === data.id) item = data;
            }))
        }).catch(error => {
            console.error('Có lỗi xảy ra khi update dữ liệu:', error);
        });
    }

    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4">
                    <h5 className="mb-0">Category List</h5>
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
                            label="Categorys"
                        />
                    </Breadcrumbs>
                </div>

                <div className="row">
                    <div className="col-sm-12">
                        <div className="card p-4">
                            <div className="row cardFilters mt-3">
                                <div className="col-md-3">
                                    <h4>IS ACTIVE</h4>
                                    <FormControl size="small" className="w-100">
                                        <Select
                                            value={showBy}
                                            onChange={(e) => setshowBy(e.target.value)}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }}
                                            labelId="demo-select-small-label"
                                            className="w-100"
                                        >
                                            <MenuItem value={10}>YES</MenuItem>
                                            <MenuItem value={20}>NO</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>

                                <div className="col-md-9 btn-add-user">
                                    <Link to="/category/add">
                                        <Button className="btn-blue btn-lg btn-round">Add Category</Button>
                                    </Link>
                                </div>
                            </div>
                            <div className="table-responsive mt-3">
                                <table className="table table-bordered v-align table-striped">
                                    <thead className="thead-dark">
                                        <tr className="text-center">
                                            <th style={{ width: '20%' }}>IMAGE</th>
                                            <th style={{ width: '30%' }}>CATEGORY NAME</th>
                                            <th style={{ width: '20%' }}>ACTIVE</th>
                                            <th>ACTION</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            categories.length > 0 && categories.map((category) => {
                                                return <>
                                                    <tr>
                                                        <td>
                                                            <img
                                                                src={`http://localhost:8080${category.categoryImage}`}
                                                                alt="CategoryImage"
                                                                className="img-thumbnail mb-2"
                                                                style={{ width: '100px', height: '100px' }}
                                                            />
                                                        </td>
                                                        <td>{category.categoryName}</td>
                                                        <td>{category.enabled === 1 ? 'Active' : 'Unactive'}</td>
                                                        <td>
                                                            <div className="actions d-flex align-items-center">
                                                                <Link to={`/category/edit/${category.id}`}>
                                                                    <Button className="success" color="success"><FaPencilAlt /></Button>
                                                                </Link>

                                                                <Button className="error" color="error" onClick={() => handleDelete(category.id)} ><MdDelete /></Button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </>
                                            })
                                        }
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


export default CategoryList;