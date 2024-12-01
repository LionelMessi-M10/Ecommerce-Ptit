import HomeBanner from "../../Components/HomeBanner";
import Button from "@mui/material/Button";
import { IoIosArrowRoundForward } from "react-icons/io";
import React from "react";
import Slider from "react-slick";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Rating from "@mui/material/Rating";
import { TfiFullscreen } from "react-icons/tfi";
import ProductItem from "../../Components/ProductItem";
import banner from "../../assets/images/banner.jpg";
import HomeCat from "../../Components/HomeCat";
import { Link } from "react-router-dom";
import banner2 from "../../assets/images/banner2.jpg";
import banner3 from "../../assets/images/banner3.jpg";
import newLetterImg from "../../assets/images/coupon.png";
import { IoMailOutline } from "react-icons/io5";
const Home = () => {
  var productSliderOptions = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <>
      <HomeBanner />
      <HomeCat />

      <section className="homeProducts">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="sticky">
                <div className="banner">
                  <img
                    src="https://res.cloudinary.com/da26rdzwp/image/upload/v1726335522/1726335520004_home-20-product-block-collection-3.webp"
                    className="cursor w-100"
                  />
                </div>

                <div className="banner mt-4">
                  <img src={banner} className="cursor w-100" />
                </div>
              </div>
            </div>
            <div className="col-md-9 productRow">
              <div className="d-flex align-items-center">
                <div className="info w-75">
                  <h3 className="mb-0 hd">BEST SELLERS</h3>
                  <p className="text-light text-sml mb-0">
                    Do not miss the current offers until the end of March.
                  </p>
                </div>
                <Link to={'/cat/1'} className="ml-auto link-view" onClick={() => window.scrollTo(0, 50)}>
                <Button className="viewAllBtn">
                  View All
                  <IoIosArrowRoundForward />
                </Button>
                </Link>
              </div>

              <div className="product_row w-100 mt-4">
                <Swiper
                  slidesPerView={4}
                  spaceBetween={0}
                  navigation={true}
                  slidesPerGroup={3}
                  modules={[Navigation]}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    <ProductItem />
                  </SwiperSlide>
                  <SwiperSlide>
                    <ProductItem />
                  </SwiperSlide>
                  <SwiperSlide>
                    <ProductItem />
                  </SwiperSlide>
                  <SwiperSlide>
                    <ProductItem />
                  </SwiperSlide>
                  <SwiperSlide>
                    <ProductItem />
                  </SwiperSlide>
                  <SwiperSlide>
                    <ProductItem />
                  </SwiperSlide>
                </Swiper>
              </div>

              <div className="d-flex align-items-center mt-5">
                <div className="info w-75">
                  <h3 className="mb-0 hd">NEW PRODUCTS</h3>
                  <p className="text-light text-sml mb-0">
                    New products with updated stocks
                  </p>
                </div>
                <Link to={'/cat/1'} className="ml-auto link-view" onClick={() => window.scrollTo(0, 50)}>
                <Button className="viewAllBtn ml-auto">
                  View All
                  <IoIosArrowRoundForward />
                </Button>
                </Link>
              </div>

              <div className="product_row productRow2 w-100 mt-4 d-flex">
                {/* <Swiper
                                    slidesPerView={4}
                                    spaceBetween={0}
                                    pagination={{
                                        clickable:true,
                                    }}
                                    modules={[Navigation]}
                                    className="mySwiper">
                                
                                <SwiperSlide>
                                    <ProductItem/>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <ProductItem/>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <ProductItem/>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <ProductItem/>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <ProductItem/>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <ProductItem/>
                                </SwiperSlide>
                                    
                                </Swiper> */}
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
              </div>

              <div className="d-flex mt-4 mb-5 bannerSec">
                <div className="banner">
                  <img src={banner2} className="cursor w-100" />
                </div>
                <div className="banner">
                  <img src={banner3} className="cursor w-100" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="newsLetterSection mt-3 mb-3 d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p className="text-white mb-1">
                $20 discount for your first order
              </p>
              <h3 className="text-White">Join our newsletter and get...</h3>
              <p className="" text-light>
                Join our email subscription now to get updates on <br />
                promotions and coupons.
              </p>

              <form>
                <IoMailOutline />
                <input type="text" placeholder="Your Email Address" />
                <Button>Subscribe</Button>
              </form>
            </div>
            <div className="col-md-6">
              <img src={newLetterImg} />
            </div>
          </div>
        </div>
      </section>
    
    </>
  );
};

export default Home;
