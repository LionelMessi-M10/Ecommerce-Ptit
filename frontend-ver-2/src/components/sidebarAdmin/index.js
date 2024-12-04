import Button from "@mui/material/Button";
import { MdDashboard } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa6";
import { FaProductHunt } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa6";
import { MdMessage } from "react-icons/md";
import { FaBell } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { IoMdLogOut } from "react-icons/io";
import { MyContext } from "../../App";
import { MdCategory } from "react-icons/md";
import { FaUser } from "react-icons/fa";



const SidebarAdmin = () => {

    const [activeTab, setActiveTab] = useState(0);
    const [isToggleSubmenu, setIsToggleSubmenu] = useState(false);

    const context = useContext(MyContext);

    const isOpenSubmenu = (index) => {
        setActiveTab(index);
        setIsToggleSubmenu(!isToggleSubmenu)
    }
    const role = localStorage.getItem("role");

    return (
        <>
            <div className="sidebar">
                <ul>
                    <li>
                        <Link to="/admin">
                            <Button className={`w-100 ${activeTab === 0 ? "active" : ""}`}
                                    onClick={() => isOpenSubmenu(0)}>
                                <span className="icon"><MdDashboard /></span>
                                Dashboard
                                {/* <span className="arrow"><FaAngleRight /></span> */}
                            </Button>
                        </Link>
                    </li>
                    {role === "ROLE_ADMIN" && (
                        <li>
                            <Button className={`w-100 ${activeTab === 1 &&
                            isToggleSubmenu === true ? "active" : ""}`} onClick={() => isOpenSubmenu(1)}>
                                <span className="icon"><FaUser /></span>
                                User
                                <span className="arrow"><FaAngleRight /></span>
                            </Button>
                            <div className={`submenuWrapper ${activeTab === 1 &&
                            isToggleSubmenu === true ? "colapse" : "colapsed"}`}>
                                <ul className="submenu">
                                    <li><Link to="/admin/user/add">Add User</Link></li>
                                    <li><Link to="/admin/users">List User</Link></li>
                                </ul>
                            </div>
                        </li>
                    )}
                    <li>
                        <Button className={`w-100 ${activeTab === 2 &&
                        isToggleSubmenu === true ? "active" : ""}`} onClick={() => isOpenSubmenu(2)}>
                            <span className="icon"><FaProductHunt /></span>
                            Product
                            <span className="arrow"><FaAngleRight /></span>
                        </Button>
                        <div className={`submenuWrapper ${activeTab === 2 &&
                        isToggleSubmenu === true ? "colapse" : "colapsed"}`}>
                            <ul className="submenu">
                                <li><Link to="/admin/products">Product List</Link></li>
                                <li><Link to="/admin/product/upload">Product Upload</Link></li>
                                <li><Link to="/admin/product/addram">Add Product RAMS</Link></li>
                                <li><Link to="/admin/product/addweight">Add Product WEIGHT</Link></li>
                                <li><Link to="/admin/product/addsize">Add Product SIZE</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <Button className={`w-100 ${activeTab === 3 &&
                        isToggleSubmenu === true ? "active" : ""}`} onClick={() => isOpenSubmenu(3)}>
                            <span className="icon"><MdCategory /></span>
                            Category
                            <span className="arrow"><FaAngleRight /></span>
                        </Button>
                        <div className={`submenuWrapper ${activeTab === 3 &&
                        isToggleSubmenu === true ? "colapse" : "colapsed"}`}>
                            <ul className="submenu">
                                <li><Link to="/admin/categorys">Category List</Link></li>
                                <li><Link to="/admin/category/add">Add Category</Link></li>
                                <li><Link to="/admin/brand/add">Add Brand</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <Link to="/admin/orders">
                            <Button className={`w-100 ${activeTab === 4 ? "active" : ""}`}
                                    onClick={() => isOpenSubmenu(4)}>
                                <span className="icon"><FaCartArrowDown /></span>
                                Orders
                                {/* <span className="arrow"><FaAngleRight /></span> */}
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/">
                            <Button className={`w-100 ${activeTab === 5 ? "active" : ""}`}
                                    onClick={() => isOpenSubmenu(5)}>
                                <span className="icon"><MdMessage /></span>
                                Messages
                                <span className="arrow"><FaAngleRight /></span>
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/">
                            <Button className={`w-100 ${activeTab === 6 ? "active" : ""}`}
                                    onClick={() => isOpenSubmenu(6)}>
                                <span className="icon"><FaBell /></span>
                                Notifications
                                <span className="arrow"><FaAngleRight /></span>
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/">
                            <Button className={`w-100 ${activeTab === 7 ? "active" : ""}`}
                                    onClick={() => isOpenSubmenu(7)}>
                                <span className="icon"><IoIosSettings /></span>
                                Settings
                                <span className="arrow"><FaAngleRight /></span>
                            </Button>
                        </Link>
                    </li>
                </ul>


                <br />

                <div className="logoutWrapper">
                    <div className="logoutBox">
                        <Button variant="contained"><IoMdLogOut />Logout</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SidebarAdmin;