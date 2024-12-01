import React, { useRef } from "react";
import Slider from "react-slick";

const ProductZoom = ({ images }) => {
  const zoomSliderBig = useRef();
  const zoomSlider = useRef();

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    fade: false,
    arrows: true,
    focusOnSelect: true,
  };

  const settings2 = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    arrows: false,
  };

  const goto = (index) => {
    zoomSlider.current.slickGoTo(index);
    zoomSliderBig.current.slickGoTo(index);
  };

  return (
    <div className="productZoom position-relative">
      <div className="badge badge-primary">23%</div>
      <Slider {...settings2} className="zoomSliderBig" ref={zoomSliderBig}>
        {images.map((image, index) => (
          <div className="item" key={index}>
            <img
              src={image}
              className="w-100"
              alt={`Product Image ${index + 1}`}
              style={{ cursor: 'pointer' }} // Thay đổi cursor để chỉ ra rằng có thể click
              // Không cần xử lý phóng to
            
            />
          </div>
        ))}
      </Slider>
      <Slider {...settings} className="zoomSlider mt-3" ref={zoomSlider}>
        {images.map((image, index) => (
          <div className="item thumbnail" key={index} onClick={() => goto(index)}>
            <img
              src={image}
              className="w-100"
              alt={`Thumbnail ${index + 1}`}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductZoom;
