import React, { useContext } from "react";
import Dialog from "@mui/material/Dialog";
import { MdClose } from "react-icons/md";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import QuantityBox from "../QuantityBox";
import { IoIosHeartEmpty } from "react-icons/io";
import { MdOutlineCompareArrows } from "react-icons/md";
import { MyContext } from "../../App";
import ProductZoom from "../ProductZoom";
import { IoIosCart } from "react-icons/io";

const ProductModal = () => {
  const context = useContext(MyContext);

  return (
    <Dialog
      open={context.isOpenProductModal}
      className="productModal"
      onClose={() => context.setisOpenProductModal(false)}
    >
      <Button className="close" onClick={() => context.setisOpenProductModal(false)}>
        <MdClose />
      </Button>
      <h4 className="mb-1 font-weight-bold">
        All Natural Italian-Style Chicken Meatballs
      </h4>
      <div className="d-flex align-items-center">
        <div className="d-flex align-items-center mr-4">
          <span>Brands:</span>
          <span className="ml-2">
            <b>Welch's</b>
          </span>
        </div>
        <Rating
          name="read-only"
          value={5}
          size="small"
          precision={0.5}
          readOnly
        />
      </div>
      <hr />
      <div className="row mt-2 productDetailModal">
        <div className="col-md-5">
          <ProductZoom
            images={[
              "https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-62.jpg",
              "https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image2-47.jpg",
              "https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image3-35.jpg",
            ]}
          />
        </div>
        <div className="col-md-7">
          <div className="d-flex info align-items-center mb-3">
            <span className="oldPrice lg mr-2">$9.35</span>
            <span className="netPrice text-danger lg">$7.25</span>
          </div>
          <span className="badge bg-success">IN STOCK</span>
          <p className="mt-3">
            Vivamus adipiscing nisl ut dolor dignissim semper. Nulla luctus
            malesuada tincidunt. Class aptent taciti sociosqu ad litora torquent
          </p>
          <div className="d-flex align-items-center">
            <QuantityBox />
            <Button className="btn-blue btn-lg btn-big btn-round ml-3">
              <IoIosCart/>
              Add to Cart
            </Button>
          </div>
          <div className="d-flex align-items-center mt-5 actions">
            <Button className="btn-round btn-sm" variant="outlined">
              <IoIosHeartEmpty /> &nbsp; ADD TO WISHLIST
            </Button>
            <Button className="btn-round btn-sm ml-3" variant="outlined">
              <MdOutlineCompareArrows /> &nbsp; COMPARE
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ProductModal;


// import React, { useContext, useRef } from "react";
// import Dialog from "@mui/material/Dialog";
// import { MdClose } from "react-icons/md";
// import Button from "@mui/material/Button";
// import Rating from "@mui/material/Rating";
// import Slider from "react-slick";
// import QuantityBox from "../QuantityBox";
// import { IoIosHeartEmpty } from "react-icons/io";
// import { MdOutlineCompareArrows } from "react-icons/md";
// import { MyContext } from "../../App";

// const ProductModal = (props) => {
//   const zoomSliderBig = useRef();
//   const zoomSlider = useRef();
//   const context = useContext(MyContext);
//   var settings = {
//     dots: false,
//     infinite: false,
//     speed: 500,
//     slidesToShow: 5,
//     slidesToScroll: 1,
//     fade: false,
//     arrows: true,
//   };

//   var settings2 = {
//     dots: false,
//     infinite: false,
//     speed: 700,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     fade: false,
//     arrows: false,
//   };

//   const goto = (index) => {
//     zoomSlider.current.slickGoTo(index);
//     zoomSliderBig.current.slickGoTo(index);
//   };

//   return (
//     <Dialog
//       open={true}
//       className="productModal"
//       onClose={() => context.setisOpenProductModal(false)}
//     >
//       <Button className="close" onClick={() => context.setisOpenProductModal(false)}>
//         <MdClose />
//       </Button>
//       <h4 className="mb-1 font-weight-bold">
//         All Natural Italian-Style Chicken Meatballs
//       </h4>
//       <div className="d-flex align-items-center">
//         <div className="d-flex align-items-center mr-4">
//           <span>Brands:</span>
//           <span className="ml-2">
//             <b>Welch's</b>
//           </span>
//         </div>
//         <Rating
//           name="read-only"
//           value={5}
//           size="small"
//           precision={0.5}
//           readOnly
//         />
//       </div>
//       <hr />
//       <div className="row mt-2 productDetailModal">
//         <div className="col-md-5">
//           <div className="productZoom position-relative">
//             <div className="badge badge-primary">23%</div>
//             <Slider
//               {...settings2}
//               className="zoomSliderBig"
//               ref={zoomSliderBig}
//             >
//               <div className="item">
//                 <img
//                   src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-62.jpg"
//                   className="w-100"
//                   alt="Product Image 1"
//                 />
//               </div>
//               <div className="item">
//                 <img
//                   src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image2-47.jpg"
//                   className="w-100"
//                   alt="Product Image 2"
//                 />
//               </div>
//               <div className="item">
//                 <img
//                   src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image3-35.jpg"
//                   className="w-100"
//                   alt="Product Image 3"
//                 />
//               </div>
//             </Slider>
//           </div>
//           <Slider {...settings} className="zoomSlider" ref={zoomSlider}>
//             <div className="item">
//               <img
//                 src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-62.jpg"
//                 className="w-100"
//                 onClick={() => goto(0)}
//                 alt="Thumbnail 1"
//               />
//             </div>
//             <div className="item">
//               <img
//                 src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image2-47.jpg"
//                 className="w-100"
//                 onClick={() => goto(1)}
//                 alt="Thumbnail 2"
//               />
//             </div>
//             <div className="item">
//               <img
//                 src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image3-35.jpg"
//                 className="w-100"
//                 onClick={() => goto(2)}
//                 alt="Thumbnail 3"
//               />
//             </div>
//           </Slider>
//         </div>
//         <div className="col-md-7">
//           <div className="d-flex info align-items-center mb-3">
//             <span className="oldPrice lg mr-2">$9.35</span>
//             <span className="netPrice text-danger lg">$7.25</span>
//           </div>
//           <span className="badge bg-success">IN STOCK</span>
//           <p className="mt-3">
//             Vivamus adipiscing nisl ut dolor dignissim semper. Nulla luctus
//             malesuada tincidunt. Class aptent taciti sociosqu ad litora torquent
//           </p>
//           <div className="d-flex align-items-center">
//             <QuantityBox />
//             <Button className="btn-blue btn-lg btn-big btn-round ml-3">
//               Add to Cart
//             </Button>
//           </div>
//           <div className="d-flex align-items-center mt-5 actions">
//             <Button className="btn-round btn-sm" variant="outlined">
//               <IoIosHeartEmpty /> &nbsp; ADD TO WISHLIST
//             </Button>
//             <Button className="btn-round btn-sm ml-3" variant="outlined">
//               <MdOutlineCompareArrows /> &nbsp; COMPARE
//             </Button>
//           </div>
//         </div>
//       </div>
//     </Dialog>
//   );
// };

// export default ProductModal;


// import React, { useContext } from 'react';
// import Dialog from '@mui/material/Dialog';
// import Button from '@mui/material/Button';
// import Rating from '@mui/material/Rating';

// import { IoIosHeartEmpty } from 'react-icons/io';
// import { MdOutlineCompareArrows } from 'react-icons/md';
// import QuantityBox from '../QuantityBox';
// import { MyContext } from '../../App';
// import ProductZoom from '../ProductZoom';

// const ProductModal = (props) => {
//   const context = useContext(MyContext);

//   return (
//     <>
//       <Dialog
//         open={context.isOpenProductModal}
//         className="productModal"
//         onClose={() => context.setIsOpenProductModal(false)}
//       >
//         <div className="d-flex align-items-center mr-4">
//           <span>Brands:</span>
//           <span className="ml-2"><b>Welch's</b></span>
//         </div>
//         <Rating name="read-only" value={5} size="small" precision={0.5} readOnly />
//         <hr />
//         <div className="row mt-2 productDetailModal">
//           <div className="col-md-5">
//             <ProductZoom />
//           </div>
//           <div className="col-md-7">
//             <div className="d-flex info align-items-center mb-3">
//               <span className="oldPrice lg mr-2">$9.35</span>
//               <span className="netPrice text-danger lg">$7.25</span>
//             </div>
//             <span className="badge bg-success">IN STOCK</span>
//             <p className="mt-3">
//               Vivamus adipiscing nisl ut dolor dignissim semper. Nulla luctus
//               malesuada tincidunt. Class aptent taciti sociosqu ad litora torquent
//             </p>
//             <div className="d-flex align-items-center">
//               <QuantityBox />
//               <Button className="btn-blue btn-lg btn-big btn-round ml-3">
//                 Add to Cart
//               </Button>
//             </div>
//             <div className="d-flex align-items-center mt-5 actions">
//               <Button className="btn-round btn-sm" variant="outlined">
//                 <IoIosHeartEmpty /> &nbsp; ADD TO WISHLIST
//               </Button>
//               <Button className="btn-round btn-sm ml-3" variant="outlined">
//                 <MdOutlineCompareArrows /> &nbsp; COMPARE
//               </Button>
//             </div>
//           </div>
//         </div>
//       </Dialog>
//     </>
//   );
// };

// export default ProductModal;
