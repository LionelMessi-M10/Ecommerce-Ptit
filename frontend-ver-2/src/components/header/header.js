import React, { useState, useEffect, useRef, useContext } from "react";
import "../header/header.css";
import Logo from "../../assets/images/logo.jpg";
import SearchIcon from "@mui/icons-material/Search";
import Select from "../selectDrop/select";
import axios from "axios";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import VerifiedIcon from "@mui/icons-material/Verified";
import Button from "@mui/material/Button";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import Nav from "./nav/nav";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";

const Header = (props) => {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [isOpenAccDropDown, setIsOpenAccDropDown] = useState(false);
  const [countryData, setCountryData] = useState([]); // State lưu danh sách thành phố
  const [categories, setCategories] = useState([]);
  const [isOpenNav, setIsOpenNav] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const headerRef = useRef();
  const searchInput = useRef();
  const context = useContext(MyContext);
  const history = useNavigate();

  const role = localStorage.getItem("role");

  // Danh sách thành phố
  const cityList = [
    "Hà Nội",
    "TP. Hồ Chí Minh",
    "Đà Nẵng",
    "Hải Phòng",
    "Cần Thơ",
    "An Giang",
    "Bà Rịa - Vũng Tàu",
    "Bắc Giang",
    "Bắc Ninh",
    "Bến Tre",
    "Bình Dương",
    "Bình Phước",
    "Bình Thuận",
    "Cà Mau",
    "Cao Bằng",
    "Đắk Lắk",
    "Đắk Nông",
    "Điện Biên",
    "Đồng Nai",
    "Đồng Tháp",
    "Gia Lai",
    "Hà Giang",
    "Hà Nam",
    "Hải Dương",
    "Hậu Giang",
    "Hòa Bình",
    "Hưng Yên",
    "Khánh Hòa",
    "Kiên Giang",
    "Kon Tum",
    "Lai Châu",
    "Lâm Đồng",
    "Lạng Sơn",
    "Lào Cai",
    "Long An",
    "Nam Định",
    "Nghệ An",
    "Ninh Bình",
    "Ninh Thuận",
    "Phú Thọ",
    "Phú Yên",
    "Quảng Bình",
    "Quảng Nam",
    "Quảng Ngãi",
    "Quảng Ninh",
    "Quảng Trị",
    "Sóc Trăng",
    "Sơn La",
    "Tây Ninh",
    "Thái Bình",
    "Thái Nguyên",
    "Thanh Hóa",
    "Thừa Thiên Huế",
    "Tiền Giang",
    "Trà Vinh",
    "Tuyên Quang",
    "Vĩnh Long",
    "Vĩnh Phúc",
    "Yên Bái",
  ];

  useEffect(() => {
    // Lắng nghe sự kiện cuộn trang
    window.addEventListener("scroll", () => {
      let position = window.pageYOffset;
      if (position > 100) {
        headerRef.current.classList.add("fixed");
      } else {
        headerRef.current.classList.remove("fixed");
      }
    });

    // Gán danh sách thành phố vào countryData
    setCountryData(cityList);
  }, []);

  const logout = () => {
    context.setIsLogin(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    history("/ecommerce/signIn");
  };

  const searchProducts = (e) => {
    if (searchInput.current.value !== "") {
      setIsLoading(true);
      fetchDataFromApi(`/api/search?q=${searchInput.current.value}`).then(
        (res) => {
          context.setSearchItems(res);
          setTimeout(() => {
            history("/search");
            setIsLoading(false);
            searchInput.current.value = "";
            context.closeSearch();
          }, 2000);
        }
      );
    }
  };

  const selectedSelectBoxItem = (name, id) => {
    // Khi chọn thành phố, lưu vào localStorage và chuyển hướng về trang chủ
    if (name === "Your Location") {
      localStorage.setItem("location", "All");
    } else {
      localStorage.setItem("location", name);
    }
    window.location.href = "/";
  };

  const openNav = () => {
    setIsOpenNav(true);
    context.setIsopenNavigation(true);
    context.setIsBottomShow(false);
  };

  const closeNav = () => {
    setIsOpenNav(false);
    setIsOpenAccDropDown(false);
    context.setIsopenNavigation(false);
    context.setIsBottomShow(true);
  };

  return (
    <>
      <div className="headerWrapper" ref={headerRef}>
        <header>
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-2 part1 d-flex align-items-center">
                {context.windowWidth < 992 && <MenuIcon onClick={openNav} />}
                <Link to="/">
                  <img src={Logo} className="logo" alt="Logo" />
                </Link>

                {context.windowWidth < 992 && (
                  <ul className="list list-inline mb-0 headerTabs pl-0">
                    <li className="list-inline-item ml-0">
                      <span>
                        <Link to="/cart">
                          <ShoppingCartOutlinedIcon />
                          <span className="badge bg-success rounded-circle">
                            {context.cartItems.length}
                          </span>
                          Cart
                        </Link>
                      </span>
                    </li>
                  </ul>
                )}
              </div>

              {/*headerSearch start here */}
              <div className="col-sm-5 part2">
                <div
                  className={`headerSearch d-flex align-items-center ${
                    context.isOpenSearch ? "open" : ""
                  }`}>
                  <div className="search">
                    <input
                      type="text"
                      placeholder="Search for items..."
                      ref={searchInput}
                    />
                    {isLoading ? (
                      <CircularProgress
                        color="inherit"
                        className="searchIcon loading_"
                      />
                    ) : (
                      <SearchIcon
                        className="searchIcon cursor"
                        onClick={searchProducts}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="col-sm-5 d-flex align-items-center part3 res-hide">
                <div className="ml-auto d-flex align-items-center">
                  <div className="countryWrapper">
                    {countryData.length > 0 && (
                      <Select
                        data={countryData}
                        placeholder={"All"}
                        icon={
                          <LocationOnOutlinedIcon style={{ opacity: "0.5" }} />
                        }
                        view="country"
                        selectedSelectBoxItem={selectedSelectBoxItem}
                      />
                    )}
                  </div>
                  <ClickAwayListener
                    onClickAway={() => setIsOpenDropDown(false)}>
                    <ul className="list list-inline mb-0 headerTabs">
                      <li className="list-inline-item">
                        <Link to="/myList">
                          <span>
                            <FavoriteBorderOutlinedIcon />
                            <span className="badge bg-success rounded-circle">
                              {context.myListData?.length}
                            </span>
                            Wishlist
                          </span>
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link to="/cart">
                          <span>
                            <ShoppingCartOutlinedIcon />
                            <span className="badge bg-success rounded-circle">
                              {context.cartItems.length}
                            </span>
                            Cart
                          </span>
                        </Link>
                      </li>

                      {context.isLogin ? (
                        <li className="list-inline-item">
                          <span
                            onClick={() => setIsOpenDropDown(!isOpenDropDown)}>
                            <Person2OutlinedIcon />
                            Account
                          </span>

                          {isOpenDropDown && (
                            <ul className="dropdownMenu">
                              <li>
                                <Link to="/my-account">
                                  <Button
                                    onClick={() =>
                                      setIsOpenDropDown(!isOpenDropDown)
                                    }>
                                    <Person2OutlinedIcon /> My Account
                                  </Button>
                                </Link>
                              </li>
                              <li>
                                <Link to="/orders">
                                  <Button
                                    onClick={() =>
                                      setIsOpenDropDown(!isOpenDropDown)
                                    }>
                                    <VerifiedIcon /> Orders
                                  </Button>
                                </Link>
                              </li>
                              <li>
                                <Button onClick={logout}>
                                  <LogoutOutlinedIcon /> Logout
                                </Button>
                              </li>
                            </ul>
                          )}
                        </li>
                      ) : (
                        <li className="list-inline-item">
                          <Link to="/ecommerce/signIn">
                            <span className="signInBtn">Sign In</span>
                          </Link>
                        </li>
                      )}
                    </ul>
                  </ClickAwayListener>
                </div>
              </div>
            </div>
          </div>
        </header>
        <Nav isOpenNav={isOpenNav} closeNav={closeNav} />
      </div>
    </>
  );
};

export default Header;
