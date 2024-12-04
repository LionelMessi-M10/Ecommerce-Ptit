import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {useEffect, useState} from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import { Pagination } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import { emphasize, styled } from "@mui/material/styles";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import "./listUser.css";
import {deleteData, fetchDataFromApi} from "../../../utils/api";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

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

const ListUser = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [showBy, setshowBy] = useState('');
    const [showBysetCatBy, setCatBy] = useState('');
    const [users, setUsers] = useState([]);
    const open = Boolean(anchorEl);

    const ITEM_HEIGHT = 48;

    const fetchAllUsers = async () => {
        const data = await fetchDataFromApi("/admin/users");
        setUsers(data);
    }

    useEffect(() => {
        fetchAllUsers();
    }, []);

    console.log("users",users)

    const handleDelete = async (id) => {
        await deleteData(`/admin/delete/${id}`)
        alert("User deleted successfully");
        fetchAllUsers();

    }
    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4">
                    <h5 className="mb-0">List User</h5>
                    <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
                        <StyledBreadcumb
                            // component="a"
                            // href="#"
                            label="Dashboard"
                            icon={<HomeIcon fontSize="small" />}
                        />

                        <StyledBreadcumb
                            label="User"
                            // component="a"
                            // href="#"
                            deleteIcon={<ExpandMoreIcon />}
                        />

                        <StyledBreadcumb
                            label="ListUser"
                            deleteIcon={<ExpandMoreIcon />}
                        />
                    </Breadcrumbs>
                </div>


                <div className="card shadow border-0 p-3 mt-4">
                    <div className="row cardFilters mt-3">
                        {/* <div className="col-md-3">
                            <h4>SORT BY NAME</h4>
                            <FormControl size="small" className="w-100">
                                <Select
                                    value={showBy}
                                    onChange={(e) => setshowBy(e.target.value)}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    labelId="demo-select-small-label"
                                    className="w-100"
                                >
                                    <MenuItem value={10}>ASC</MenuItem>
                                    <MenuItem value={20}>DESC</MenuItem>
                                </Select>
                            </FormControl>
                        </div> */}

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
                            <Link to="/user/add">
                                <Button className="btn-blue btn-lg 
                                btn-round">Add User</Button>
                            </Link>
                        </div>
                    </div>


                    <div className="table-responsive mt-3">
                        <table className="table table-bordered v-align table-striped">
                            <thead className="thead-dark">
                                <tr>
                                    <th>IMAGE</th>
                                    <th>NAME</th>
                                    <th>ADDRESS</th>
                                    <th>EMAIL</th>
                                    <th>PHONENUMBER</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>

                            <tbody>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <tr key={user.id}>
                                        <td>
                                            <div className="d-flex align-items-center productBox">
                                                <div className="imgWrapper">
                                                    <div className="img card shadow m-0">
                                                        <img
                                                            src={"http://localhost:8080" + user.image}
                                                            className="w-100"
                                                            alt={`image-user-${user.id}`}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{user.username}</td>
                                        <td>{user.address}</td>
                                        <td>{user.email}</td>
                                        <td>{user.telephone}</td>
                                        <td>
                                            <div className="actions d-flex align-items-center">
                                                <Link to={`/admin/user/edit/${user.id}`}>
                                                    <Button className="success" color="success">
                                                        <FaPencilAlt />
                                                    </Button>
                                                </Link>
                                                <Button className="error" color="error" onClick={() => handleDelete(user.id)}>
                                                    <MdDelete />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">
                                        No users found.
                                    </td>
                                </tr>
                            )}

                            </tbody>
                        </table>

                        <div className="d-flex tableFooter">
                            <p>showing <b>12</b> of <b>60</b> results</p>
                            <Pagination count={10} color="primary" className="pagination"
                                showFirstButton showLastButton />
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ListUser;