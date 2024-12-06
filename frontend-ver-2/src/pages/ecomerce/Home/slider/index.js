import React, { useContext } from "react";
import Slider from "react-slick";
import "./index.css";

import { MyContext } from "../../../../App";

import "react-lazy-load-image-component/src/effects/blur.css";

const HomeSlider = (props) => {
  const context = useContext(MyContext);

  var settings = {
    dots: context.windowWidth > 992 ? true : false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    arrows: context.windowWidth > 992 ? true : false,
    autoplay: true,
  };

  const imgSlider = [
    {
      image:
        "https://res.cloudinary.com/dkgonwhvj/image/upload/v1731427522/1731427519864_New_Project_11.jpg",
    },
    {
      image:
        "https://res.cloudinary.com/dkgonwhvj/image/upload/v1731427470/1731427468095_New_Project_13.jpg",
    },
    {
      images:
        "https://res.cloudinary.com/dkgonwhvj/image/upload/v1731427548/1731427544379_New_Project_6.jpg",
    },
    {
      image:
        "https://res.cloudinary.com/dkgonwhvj/image/upload/v1731427470/1731427468095_New_Project_13.jpg",
    },
  ];

  return (
    <section className="homeSlider">
      <div className="container-fluid position-relative">
        <Slider className="home_slider_Main" {...settings}>
          {imgSlider.length !== 0 &&
            imgSlider.map((item, index) => {
              return (
                <div className="item" key={index}>
                  <img src={item.image} className="w-100" />
                </div>
              );
            })}
        </Slider>
      </div>
    </section>
  );
};

export default HomeSlider;
