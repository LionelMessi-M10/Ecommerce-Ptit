import React from "react";
import Slider from "react-slick";

const HomeBanner = () =>{
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:true,
        autoplay:true
      };

    return(
        <div className="homeBannerSection">
            <Slider {...settings}>
                <div className="item">
                    <img src="https://file.hstatic.net/200000722513/file/uu_dai_soc_banner_web_slider_800x400.png" className="w-100"/>
                </div>
                <div className="item">
                    <img src="https://file.hstatic.net/200000722513/file/banner_web_slider_800x400_laptop_gaming_wukong_d33e1e6762764ec799820bfcc5814047.jpg" className="w-100"/>
                </div>
                <div className="item">
                    <img src="https://file.hstatic.net/200000722513/file/banner_web_slider_800x400_xa_kho.jpg" className="w-100"/>
                </div>
                <div className="item">
                    <img src="https://file.hstatic.net/200000722513/file/gearvn_800x400_asus_vivobook_gaming.jpg" className="w-100"/>
                </div>
            </Slider>
        </div>
    )
}

export default HomeBanner