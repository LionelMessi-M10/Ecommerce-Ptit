import React, { useContext } from "react";
import Slider from "react-slick";
import { MyContext } from "../../App";
import { Link } from "react-router-dom";
import "./style.css";

const Banners = (props) => {
  const context = useContext(MyContext);

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    fade: false,
    arrows: context.windowWidth < 992 ? false : true,
  };

  const imgSlider = [
    {
      image:
        "https://res.cloudinary.com/dkgonwhvj/image/upload/v1731427522/1731427519864_New_Project_11.jpg",
      subCatId: 1,
      catId: 101,
    },
    {
      image:
        "https://res.cloudinary.com/dkgonwhvj/image/upload/v1731427470/1731427468095_New_Project_13.jpg",
      subCatId: null,
      catId: 102,
    },
  ];

  return (
    <div className="bannerSection">
      <div className="container-fluid">
        <Slider className="prodSlider" {...settings}>
          {imgSlider.length > 0 &&
            imgSlider.map((item, index) => {
              return (
                <div className="box" key={index}>
                  {/* Kiểm tra subCatId để điều hướng đúng */}
                  {item.subCatId !== null ? (
                    <Link
                      to={`/products/subCat/${item.subCatId}`}
                      className="box">
                      <img
                        src={item.image}
                        className="w-100 transition"
                        alt="banner img"
                      />
                    </Link>
                  ) : (
                    <Link
                      to={`/products/category/${item.catId}`}
                      className="box">
                      <img
                        src={item.image}
                        className="w-100 transition"
                        alt="banner img"
                      />
                    </Link>
                  )}
                </div>
              );
            })}
        </Slider>
      </div>
    </div>
  );
};

export default Banners;
