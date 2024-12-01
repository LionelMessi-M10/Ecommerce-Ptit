import DashboardBox from "./components/dashboardBox";
import { HiDotsVertical } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { MdShoppingBag } from "react-icons/md";
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
import Pagination from '@mui/material/Pagination';
import { MyContext } from "../../App";
import React from "react";
import * as d3 from 'd3';
import { Link } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import { Rating } from "@mui/material";
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };




export const data1 = [
    ["Year", "Sales", "Expenses"],
    ["2013", 1000, 400],
    ["2014", 1170, 460],
    ["2015", 660, 1120],
    ["2016", 1030, 540],
];

export const options = {
    'backgroundColor': 'transparent',
    'chartArea': { 'width': '100%', 'height': '100%' },
}

const Dashboard = () => {
    const data = [
        { month: 'JAN', sales: 19080 }, { month: 'FEB', sales: 24056 },
        { month: 'MAR', sales: 28045 }, { month: 'APR', sales: 26054 },
        { month: 'MAY', sales: 30125 }, { month: 'JUN', sales: 33054 },
        { month: 'JUL', sales: 34058 }, { month: 'AUG', sales: 32125 },
        { month: 'SEP', sales: 80125 }, { month: 'OCT', sales: 145067 },
        { month: 'NOV', sales: 158067 }, { month: 'DEC', sales: 155067 }
    ];

    // Tạo SVG container
    const width = 1200;
    const height = 600;

    // Tạo các thành phần biểu đồ
    const x = d3.scaleBand()
        .range([0, width])
        .padding(0.1);
    const y = d3.scaleLinear()
        .range([height, 0]);

    x.domain(data.map(d => d.month));
    y.domain([0, d3.max(data, d => d.sales)]);


    const [anchorEl, setAnchorEl] = useState(null);
    const [showBy, setshowBy] = useState('');
    const [showBysetCatBy, setCatBy] = useState('');
    const open = Boolean(anchorEl);

    const ITEM_HEIGHT = 48;

    const context = useContext(MyContext)

    useEffect(() => {
        context.setisHindSidebarAndHeader(false);

        window.scrollTo(0, 0);
    }, [])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <>
            <div className="right-content w-100">
                <div className="row dashboardBoxWrapperRow">
                    <div className="col-md-8">
                        <div className="dashboardBoxWrapper d-flex">
                            <DashboardBox color={["#1da256", "#48d483"]} icon={<FaUserCircle />}
                                grow={true} />
                            <DashboardBox color={["#c012e2", "#eb64fe"]} icon={<IoMdCart />} />
                            <DashboardBox color={["#2c78e5", "#60aff5"]} icon={<MdShoppingBag />} />
                            <DashboardBox color={["#e1950e", "#f3cd29"]} icon={<GiStarsStack />} />
                        </div>
                    </div>


                    <div className="col-md-4 pl-0">
                        <div className="box graphBox">
                            <div className="d-flex align-items-center w-100 bottomEle">
                                <h6 className="text-white mb-0 mt-0">Total Sales</h6>
                                <div className="ml-auto">
                                    <Button className="ml-auto toggleIcon" onClick={handleClick}><HiDotsVertical /></Button>
                                    <Menu
                                        id="long-menu"
                                        MenuListProps={{
                                            'aria-labelledby': 'long-button',
                                        }}
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        slotProps={{
                                            paper: {
                                                style: {
                                                    maxHeight: ITEM_HEIGHT * 4.5,
                                                    width: '20ch',
                                                },
                                            },
                                        }}
                                    >

                                        <MenuItem onClick={handleClose}>
                                            <IoIosTimer />    Last Day
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <IoIosTimer />    Last Week
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <IoIosTimer />    Last Month
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <IoIosTimer />    Last Year
                                        </MenuItem>
                                    </Menu>
                                </div>
                            </div>

                            <h3 className="text-white font-weight-bold">$3,787,681.00</h3>
                            <p>$3,587.90 in last month</p>

                            <Chart
                                chartType="PieChart"
                                width="100%"
                                height="170px"
                                data={data1}
                                options={options}
                            />
                        </div>
                    </div>
                </div>



                <div className="card shadow border-0 p-3 mt-4">
                    <h3 className="hd">Best Selling Products</h3>


                    <div className="row cardFilters mt-3">
                        <div className="col-md-3">
                            <h4>SHOW BY</h4>
                            <FormControl size="small" className="w-100">
                                <Select
                                    value={showBy}
                                    onChange={(e) => setshowBy(e.target.value)}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    className="w-100"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div className="col-md-3">
                            <h4>CATEGORY BY</h4>
                            <FormControl size="small" className="w-100">
                                <Select
                                    value={showBysetCatBy}
                                    onChange={(e) => setCatBy(e.target.value)}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    labelId="demo-select-small-label"
                                    className="w-100"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>


                    <div className="table-responsive mt-3">
                        <table className="table table-bordered v-align table-striped">
                            <thead className="thead-dark">
                                <tr>
                                    <th>UID</th>
                                    <th style={{ width: '300px' }}>PRODUCT</th>
                                    <th>CATEGORY</th>
                                    <th>BRAND</th>
                                    <th>PRICE</th>
                                    <th>RATING</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>

                            <tbody>
                            <tr>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <Checkbox {...label} /> <span>#1</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center productBox">
                                            <div className="imgWrapper">
                                                <div className="img card shadow m-0">
                                                    <img src="https://mironcoder-hotash.netlify.app/images/product/01.webp"
                                                        className="w-100" />
                                                </div>
                                            </div>
                                            <div className="info pl-3">
                                                <h6>Tops and skirt set for Female...</h6>
                                                <p>Women's exclusive summer Tops and skirt set
                                                    for Female Tops and skirt set
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>Office</td>
                                    <td>ASUS</td>
                                    <td>
                                        <div style={{ width: '70px' }}>
                                            <del className="old">$21.00</del>
                                            <span className="new text-danger">$21.00</span>
                                        </div>
                                    </td>
                                    <td><Rating name="read-only" defaultValue={4.5} precision={0.5}
                                        size="small" readOnly /></td>
                                    <td>
                                        <div className="actions d-flex align-items-center">
                                            <Link to="/product/details">
                                                <Button className="secondary"
                                                    color="secondary"><FaEye /></Button>
                                            </Link>
                                            <Link to="/product/edit">
                                                <Button className="success" color="success"><FaPencilAlt /></Button>
                                            </Link>
                                            <Button className="error" color="error"><MdDelete /></Button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <Checkbox {...label} /> <span>#1</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center productBox">
                                            <div className="imgWrapper">
                                                <div className="img card shadow m-0">
                                                    <img src="https://mironcoder-hotash.netlify.app/images/product/01.webp"
                                                        className="w-100" />
                                                </div>
                                            </div>
                                            <div className="info pl-3">
                                                <h6>Tops and skirt set for Female...</h6>
                                                <p>Women's exclusive summer Tops and skirt set
                                                    for Female Tops and skirt set
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>Office</td>
                                    <td>ASUS</td>
                                    <td>
                                        <div style={{ width: '70px' }}>
                                            <del className="old">$21.00</del>
                                            <span className="new text-danger">$21.00</span>
                                        </div>
                                    </td>
                                    <td><Rating name="read-only" defaultValue={4.5} precision={0.5}
                                        size="small" readOnly /></td>
                                    <td>
                                        <div className="actions d-flex align-items-center">
                                            <Link to="/product/details">
                                                <Button className="secondary"
                                                    color="secondary"><FaEye /></Button>
                                            </Link>
                                            <Link to="/product/edit">
                                                <Button className="success" color="success"><FaPencilAlt /></Button>
                                            </Link>
                                            <Button className="error" color="error"><MdDelete /></Button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <Checkbox {...label} /> <span>#1</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center productBox">
                                            <div className="imgWrapper">
                                                <div className="img card shadow m-0">
                                                    <img src="https://mironcoder-hotash.netlify.app/images/product/01.webp"
                                                        className="w-100" />
                                                </div>
                                            </div>
                                            <div className="info pl-3">
                                                <h6>Tops and skirt set for Female...</h6>
                                                <p>Women's exclusive summer Tops and skirt set
                                                    for Female Tops and skirt set
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>Office</td>
                                    <td>ASUS</td>
                                    <td>
                                        <div style={{ width: '70px' }}>
                                            <del className="old">$21.00</del>
                                            <span className="new text-danger">$21.00</span>
                                        </div>
                                    </td>
                                    <td><Rating name="read-only" defaultValue={4.5} precision={0.5}
                                        size="small" readOnly /></td>
                                    <td>
                                        <div className="actions d-flex align-items-center">
                                            <Link to="/product/details">
                                                <Button className="secondary"
                                                    color="secondary"><FaEye /></Button>
                                            </Link>
                                            <Link to="/product/edit">
                                                <Button className="success" color="success"><FaPencilAlt /></Button>
                                            </Link>
                                            <Button className="error" color="error"><MdDelete /></Button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <Checkbox {...label} /> <span>#1</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center productBox">
                                            <div className="imgWrapper">
                                                <div className="img card shadow m-0">
                                                    <img src="https://mironcoder-hotash.netlify.app/images/product/01.webp"
                                                        className="w-100" />
                                                </div>
                                            </div>
                                            <div className="info pl-3">
                                                <h6>Tops and skirt set for Female...</h6>
                                                <p>Women's exclusive summer Tops and skirt set
                                                    for Female Tops and skirt set
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>Office</td>
                                    <td>ASUS</td>
                                    <td>
                                        <div style={{ width: '70px' }}>
                                            <del className="old">$21.00</del>
                                            <span className="new text-danger">$21.00</span>
                                        </div>
                                    </td>
                                    <td><Rating name="read-only" defaultValue={4.5} precision={0.5}
                                        size="small" readOnly /></td>
                                    <td>
                                        <div className="actions d-flex align-items-center">
                                            <Link to="/product/details">
                                                <Button className="secondary"
                                                    color="secondary"><FaEye /></Button>
                                            </Link>
                                            <Link to="/product/edit">
                                                <Button className="success" color="success"><FaPencilAlt /></Button>
                                            </Link>
                                            <Button className="error" color="error"><MdDelete /></Button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <Checkbox {...label} /> <span>#1</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center productBox">
                                            <div className="imgWrapper">
                                                <div className="img card shadow m-0">
                                                    <img src="https://mironcoder-hotash.netlify.app/images/product/01.webp"
                                                        className="w-100" />
                                                </div>
                                            </div>
                                            <div className="info pl-3">
                                                <h6>Tops and skirt set for Female...</h6>
                                                <p>Women's exclusive summer Tops and skirt set
                                                    for Female Tops and skirt set
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>Office</td>
                                    <td>ASUS</td>
                                    <td>
                                        <div style={{ width: '70px' }}>
                                            <del className="old">$21.00</del>
                                            <span className="new text-danger">$21.00</span>
                                        </div>
                                    </td>
                                    <td><Rating name="read-only" defaultValue={4.5} precision={0.5}
                                        size="small" readOnly /></td>
                                    <td>
                                        <div className="actions d-flex align-items-center">
                                            <Link to="/product/details">
                                                <Button className="secondary"
                                                    color="secondary"><FaEye /></Button>
                                            </Link>
                                            <Link to="/product/edit">
                                                <Button className="success" color="success"><FaPencilAlt /></Button>
                                            </Link>
                                            <Button className="error" color="error"><MdDelete /></Button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <Checkbox {...label} /> <span>#1</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center productBox">
                                            <div className="imgWrapper">
                                                <div className="img card shadow m-0">
                                                    <img src="https://mironcoder-hotash.netlify.app/images/product/01.webp"
                                                        className="w-100" />
                                                </div>
                                            </div>
                                            <div className="info pl-3">
                                                <h6>Tops and skirt set for Female...</h6>
                                                <p>Women's exclusive summer Tops and skirt set
                                                    for Female Tops and skirt set
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>Office</td>
                                    <td>ASUS</td>
                                    <td>
                                        <div style={{ width: '70px' }}>
                                            <del className="old">$21.00</del>
                                            <span className="new text-danger">$21.00</span>
                                        </div>
                                    </td>
                                    <td><Rating name="read-only" defaultValue={4.5} precision={0.5}
                                        size="small" readOnly /></td>
                                    <td>
                                        <div className="actions d-flex align-items-center">
                                            <Link to="/product/details">
                                                <Button className="secondary"
                                                    color="secondary"><FaEye /></Button>
                                            </Link>
                                            <Link to="/product/edit">
                                                <Button className="success" color="success"><FaPencilAlt /></Button>
                                            </Link>
                                            <Button className="error" color="error"><MdDelete /></Button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <Checkbox {...label} /> <span>#1</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center productBox">
                                            <div className="imgWrapper">
                                                <div className="img card shadow m-0">
                                                    <img src="https://mironcoder-hotash.netlify.app/images/product/01.webp"
                                                        className="w-100" />
                                                </div>
                                            </div>
                                            <div className="info pl-3">
                                                <h6>Tops and skirt set for Female...</h6>
                                                <p>Women's exclusive summer Tops and skirt set
                                                    for Female Tops and skirt set
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>Office</td>
                                    <td>ASUS</td>
                                    <td>
                                        <div style={{ width: '70px' }}>
                                            <del className="old">$21.00</del>
                                            <span className="new text-danger">$21.00</span>
                                        </div>
                                    </td>
                                    <td><Rating name="read-only" defaultValue={4.5} precision={0.5}
                                        size="small" readOnly /></td>
                                    <td>
                                        <div className="actions d-flex align-items-center">
                                            <Link to="/product/details">
                                                <Button className="secondary"
                                                    color="secondary"><FaEye /></Button>
                                            </Link>
                                            <Link to="/product/edit">
                                                <Button className="success" color="success"><FaPencilAlt /></Button>
                                            </Link>
                                            <Button className="error" color="error"><MdDelete /></Button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <Checkbox {...label} /> <span>#1</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center productBox">
                                            <div className="imgWrapper">
                                                <div className="img card shadow m-0">
                                                    <img src="https://mironcoder-hotash.netlify.app/images/product/01.webp"
                                                        className="w-100" />
                                                </div>
                                            </div>
                                            <div className="info pl-3">
                                                <h6>Tops and skirt set for Female...</h6>
                                                <p>Women's exclusive summer Tops and skirt set
                                                    for Female Tops and skirt set
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>Office</td>
                                    <td>ASUS</td>
                                    <td>
                                        <div style={{ width: '70px' }}>
                                            <del className="old">$21.00</del>
                                            <span className="new text-danger">$21.00</span>
                                        </div>
                                    </td>
                                    <td><Rating name="read-only" defaultValue={4.5} precision={0.5}
                                        size="small" readOnly /></td>
                                    <td>
                                        <div className="actions d-flex align-items-center">
                                            <Link to="/product/details">
                                                <Button className="secondary"
                                                    color="secondary"><FaEye /></Button>
                                            </Link>
                                            <Link to="/product/edit">
                                                <Button className="success" color="success"><FaPencilAlt /></Button>
                                            </Link>
                                            <Button className="error" color="error"><MdDelete /></Button>
                                        </div>
                                    </td>
                                </tr>

                            </tbody>
                        </table>

                        <div className="d-flex tableFooter">
                            <p>showing <b>12</b> of <b>60</b> results</p>
                            <Pagination count={10} color="primary" className="pagination"
                                showFirstButton showLastButton />
                        </div>
                    </div>
                </div>

                <div className="card shadow border-0 p-3 mt-4">
                    <svg width={width} height={height}>
                        {data.map((d, i) => (
                            <rect
                                key={i}
                                x={x(d.month)}
                                width={x.bandwidth()}
                                y={y(d.sales)}
                                height={height - y(d.sales)}
                                fill="#4285F4"
                            />
                        ))}

                        <g transform={`translate(0,${height})`}>
                            {d3.axisBottom(x)(d3.select(null))}
                        </g>

                        <g>
                            {d3.axisLeft(y)(d3.select(null))}
                        </g>

                        <text x={width / 2} y={30} textAnchor="middle" fontSize={24} fontWeight="bold">
                            Total Sales
                        </text>
                        <text transform="rotate(-90)" x={-height / 2} y={-50} textAnchor="middle" fontSize={18}>
                            Sales
                        </text>
                        <text x={width / 2} y={height + 50} textAnchor="middle" fontSize={18}>
                            Month
                        </text>
                    </svg>
                </div>
            </div>
        </>
    )
}

export default Dashboard