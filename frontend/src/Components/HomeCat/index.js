import React, { useState } from "react";
import Slider from "react-slick";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const HomeCat = () => {


    const [itemBg, setItemBg] = useState([
        '#fffceb',
        '#ecfffec',
        '#feefea',
        '#fff3eb',
        '#fff3ff',
        '#f2fce4',
        '#feefea',
        '#fffceb',
        '#feefea',
        '#ecffec',
        '#feefea',
        '#fffceb',
        '#feefea',
        '#ecffec',
        '#feefea',
    ]);

  return (
    <section className="homeCat">
      <div className="container">
        <h3 class="mb-3 hd">Featured Categories</h3>
        <Swiper
          slidesPerView={10}
          spaceBetween={8}
          navigation={true}
          slidesPerGroup={3}
          modules={[Navigation]}
          className="mySwiper"
        >

        {
            itemBg?.map((item, index)=>{
                return(
                    <SwiperSlide>
                        <div className="item text-center cursor" style={{background:item}}>
                            <img src="https://res.cloudinary.com/da26rdzwp/image/upload/v1725960852/1725960851153_fash.png"/>
                            <h6>Fashion</h6>
                        </div>
                    </SwiperSlide>
                )
            })
        }
            

            {/* <SwiperSlide>
                <div className="item text-center">
                    <img src="https://res.cloudinary.com/da26rdzwp/image/upload/v1725960852/1725960851153_fash.png"/>
                
                    <h6>Fashion</h6>
                </div>
            </SwiperSlide>

            <SwiperSlide>
                <div className="item text-center">
                    <img src="https://res.cloudinary.com/da26rdzwp/image/upload/v1725960852/1725960851153_fash.png"/>
                
                    <h6>Fashion</h6>
                </div>
            </SwiperSlide>

            <SwiperSlide>
                <div className="item text-center">
                    <img src="https://res.cloudinary.com/da26rdzwp/image/upload/v1725960852/1725960851153_fash.png"/>
                
                    <h6>Fashion</h6>
                </div>
            </SwiperSlide>

            <SwiperSlide>
                <div className="item text-center">
                    <img src="https://res.cloudinary.com/da26rdzwp/image/upload/v1725960852/1725960851153_fash.png"/>
                
                    <h6>Fashion</h6>
                </div>
            </SwiperSlide>

            <SwiperSlide>
                <div className="item text-center">
                    <img src="https://res.cloudinary.com/da26rdzwp/image/upload/v1725960852/1725960851153_fash.png"/>
                
                    <h6>Fashion</h6>
                </div>
            </SwiperSlide>

            <SwiperSlide>
                <div className="item text-center">
                    <img src="https://res.cloudinary.com/da26rdzwp/image/upload/v1725960852/1725960851153_fash.png"/>
                
                    <h6>Fashion</h6>
                </div>
            </SwiperSlide>

            <SwiperSlide>
                <div className="item text-center">
                    <img src="https://res.cloudinary.com/da26rdzwp/image/upload/v1725960852/1725960851153_fash.png"/>
                
                    <h6>Fashion</h6>
                </div>
            </SwiperSlide>

            <SwiperSlide>
                <div className="item text-center">
                    <img src="https://res.cloudinary.com/da26rdzwp/image/upload/v1725960852/1725960851153_fash.png"/>
                
                    <h6>Fashion</h6>
                </div>
            </SwiperSlide>

            <SwiperSlide>
                <div className="item text-center">
                    <img src="https://res.cloudinary.com/da26rdzwp/image/upload/v1725960852/1725960851153_fash.png"/>
                
                    <h6>Fashion</h6>
                </div>
            </SwiperSlide>

            <SwiperSlide>
                <div className="item text-center">
                    <img src="https://res.cloudinary.com/da26rdzwp/image/upload/v1725960852/1725960851153_fash.png"/>
                
                    <h6>Fashion</h6>
                </div>
            </SwiperSlide> */}
        </Swiper>
      </div>
    </section>
  );
};

export default HomeCat;
