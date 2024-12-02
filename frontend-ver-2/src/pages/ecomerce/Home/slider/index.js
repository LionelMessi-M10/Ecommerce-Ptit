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

  return (
    <section className="homeSlider">
      <div className="container-fluid position-relative">
        <Slider {...settings} className="home_slider_Main">
          {props?.data.length !== 0 &&
            props?.data?.map((item, index) => {
              return (
                <div className="item" key={index}>
                <img src={item?.images[0]} className="w-100"/>
              
                 {
                //     <div className="info">
                //     <h2 class="mb-4">
                //       Don’t miss amazing
                //       <br />
                //       grocery deals
                //     </h2>
                //     <p>Sign up for the daily newsletter</p>
                //   </div>
                 }
                </div>
              );
            })}
        </Slider>

      
      </div>
    </section>
  );
};

export default HomeSlider;
