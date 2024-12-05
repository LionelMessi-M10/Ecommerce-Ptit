import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import { GiStarsStack } from "react-icons/gi";

import { FaEye, FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import { Pagination, Rating } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import { emphasize, styled } from "@mui/material/styles";
import { FaUserCircle } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { MdShoppingBag } from "react-icons/md";
import { Link } from "react-router-dom";
import DashboardBox from "../Dashboard/components/dashboardBox";
import { fetchProduct } from "./ProductService/ProductService";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

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
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

const Products = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showBy, setshowBy] = useState("");
  const [showBysetCatBy, setCatBy] = useState("");
  const open = Boolean(anchorEl);

  const ITEM_HEIGHT = 48;

  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    pageNumber: 0,
    pageSize: 10,
    totalElements: 0,
    totalPages: 0,
  });

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { sortedProducts, pagination } = await fetchProduct();
        setProducts(sortedProducts);
        setPagination(pagination);
      } catch (error) {
        console.error("Có lỗi khi tải dữ liệu:", error);
      }
    };

    loadProducts();
  }, []);

  const handlePageChange = async (newPageNumber) => {
    try {
      const { sortedProducts, pagination: updatedPagination } =
        await fetchProduct(newPageNumber, pagination.pageSize);
      setProducts(sortedProducts);
      setPagination(updatedPagination);
    } catch (error) {
      console.error("Có lỗi khi thay đổi trang:", error);
    }
  };

  // Hàm lọc sản phẩm dựa trên showBy
  const filteredProducts = products.filter((product) => {
    if (showBy === 10) {
      return product.enabled === 1;
    }
    if (showBy === 20) {
      return product.enabled === 0;
    }
    return true;
  });

  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4">
          <h5 className="mb-0">Product List</h5>
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
          </Breadcrumbs>
        </div>

        <div className="row dashboardBoxWrapperRow dashboardBoxWrapperRowV2">
          <div className="col-md-12">
            <div className="dashboardBoxWrapper d-flex">
              <DashboardBox
                color={["#1da256", "#48d483"]}
                icon={<FaUserCircle />}
                grow={true}
              />
              <DashboardBox
                color={["#c012e2", "#eb64fe"]}
                icon={<IoMdCart />}
              />
              <DashboardBox
                color={["#2c78e5", "#60aff5"]}
                icon={<MdShoppingBag />}
              />
              <DashboardBox
                color={["#e1950e", "#f3cd29"]}
                icon={<GiStarsStack />}
              />
            </div>
          </div>
        </div>

        <div className="card shadow border-0 p-3 mt-4">
          <h3 className="hd">Best Selling Products</h3>

          <div className="row cardFilters mt-3">
            {/* <div className="col-md-3">
                            <h4>SHOW BY</h4>
                            <FormControl size="small" className="w-100">
                                <Select
                                    value={showBy}
                                    onChange={(e) => setshowBy(e.target.value)}
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
                        </div> */}
            <div className="col-md-3">
              <h4>IS ACTIVE</h4>
              <FormControl size="small" className="w-100">
                <Select
                  value={showBy || ""}
                  onChange={(e) => setshowBy(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  labelId="demo-select-small-label"
                  className="w-100">
                  <MenuItem value="" disabled>
                    Show by
                  </MenuItem>
                  <MenuItem value={10}>YES</MenuItem>
                  <MenuItem value={20}>NO</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-md-9 btn-add-user">
              <Link to="/admin/product/upload">
                <Button
                  className="btn-blue btn-lg 
                                btn-round">
                  Add Product
                </Button>
              </Link>
            </div>
          </div>

          <div className="table-responsive mt-3">
            <table className="table table-bordered v-align table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>ID</th>
                  <th>PRODUCT</th>
                  <th>IMAGES</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th>PRICE</th>
                  <th>RATING</th>
                  <th>Status</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.productName}</td>
                    <td>
                      {product.imageProductPaths &&
                      product.imageProductPaths.length > 0 ? (
                        product.imageProductPaths.map((image, index) => (
                          <img
                            key={index}
                            src={`http://localhost:8080${image}`}
                            alt={`product-image-${index}`}
                            style={{
                              width: "50px",
                              height: "50px",
                              marginRight: "5px",
                            }}
                          />
                        ))
                      ) : (
                        <span>No images available</span>
                      )}
                    </td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>{product.price.toLocaleString()}</td>
                    <td>{product.rating}</td>
                    <td>{product.enabled === 1 ? "YES" : "NO"}</td>
                    <td>
                      <button className="btn btn-primary">Edit</button>
                      <button className="btn btn-danger ml-2">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="d-flex tableFooter">
              <p>
                Showing{" "}
                <b>
                  {pagination.pageNumber * pagination.pageSize +
                    products.length}
                </b>{" "}
                of <b>{pagination.totalElements}</b> results
              </p>
              <Pagination
                count={pagination.totalPages}
                color="primary"
                className="pagination"
                page={pagination.pageNumber + 1}
                onChange={(event, value) => handlePageChange(value - 1)}
                showFirstButton
                showLastButton
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
