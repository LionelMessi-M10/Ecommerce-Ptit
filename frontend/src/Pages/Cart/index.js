import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import QuantityBox from '../../Components/QuantityBox';
import { MdOutlineClose } from "react-icons/md";
import Button from "@mui/material/Button";
import { IoIosCart } from "react-icons/io";
const Cart = () => {
  return (
    <>
    <section className='section cartPage'>
      <div className='container'>
      <h2 className='hd mb-1'>Your Cart</h2>
      <p>There are <b className='text-red'>3</b> products in your cart</p>
        <div className='row'>
          <div className='col-md-9 pr-5'>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr>
                    <th width="35%">Product</th>
                    <th width="15%">Unit Price</th>
                    <th width="20%">Quantity</th>
                    <th width="15%">Subtotal</th>
                    <th width="10%">Remove</th>
                  </tr>
                </thead>
                <tbody>
                   
                    <tr>
                      <td width="35%">
                        <Link to="/product/1">
                          <div className="d-flex align-items-center cartItemimgWrapper">
                            <div className="imgWrapper">
                              <img src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-62.jpg"
                                className="w-100"
            
                              />
                            </div>
                            <div className='info px-3'>
                              <h6>Freld Roast Chao Cheese Creamy</h6>
                              <Rating
                                name='read-only'
                                value={4.5}
                                readOnly
                                precision={0.5}
                                size='small'
                              />
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td width="15%">$7.25</td>
                      <td width="20%"><QuantityBox/></td>
                      <td width="15%">$7.25</td>
                      <td width="10%"><span className="remove"><MdOutlineClose/></span></td>
                       
                    </tr>
                    <tr>
                      <td width="35%">
                        <Link to="/product/1">
                          <div className="d-flex align-items-center cartItemimgWrapper">
                            <div className="imgWrapper">
                              <img src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-62.jpg"
                                className="w-100"
            
                              />
                            </div>
                            <div className='info px-3'>
                              <h6>Freld Roast Chao Cheese Creamy</h6>
                              <Rating
                                name='read-only'
                                value={4.5}
                                readOnly
                                precision={0.5}
                                size='small'
                              />
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td width="15%">$7.25</td>
                      <td width="20%"><QuantityBox/></td>
                      <td width="15%">$7.25</td>
                      <td width="10%"><span className="remove"><MdOutlineClose/></span></td>
                       
                    </tr>
                    <tr>
                      <td width="35%">
                        <Link to="/product/1">
                          <div className="d-flex align-items-center cartItemimgWrapper">
                            <div className="imgWrapper">
                              <img src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-62.jpg"
                                className="w-100"
            
                              />
                            </div>
                            <div className='info px-3'>
                              <h6>Freld Roast Chao Cheese Creamy</h6>
                              <Rating
                                name='read-only'
                                value={4.5}
                                readOnly
                                precision={0.5}
                                size='small'
                              />
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td width="15%">$7.25</td>
                      <td width="20%"><QuantityBox/></td>
                      <td width="15%">$7.25</td>
                      <td width="10%"><span className="remove"><MdOutlineClose/></span></td>
                       
                    </tr>
                
        
                </tbody>
              </table>
            </div>
          </div>
          <div className='col-md-3'>
            <div className='card border p-3 cartDetails'>
                <h4>CART TOTALS</h4>
                <div className='d-flex align-items-center mb-3'>
                    <span>Subtotal</span>
                    <span className='ml-auto text-red font-weight-bold'>$12.31</span>
                </div>
                <div className='d-flex align-items-center mb-3'>
                    <span>Shipping</span>
                    <span className='ml-auto'><b>Free</b></span>
                </div>
                <div className='d-flex align-items-center mb-3'>
                    <span>Estimate for</span>
                    <span className='ml-auto'><b>United Kingdom</b></span>
                </div>
                <div className='d-flex align-items-center mb-3'>
                    <span>Total</span>
                    <span className='ml-auto text-red font-weight-bold'>$12.31</span>
                </div>
                <br />
                <Button className="btn-blue btn-lg btn-big">
                    <IoIosCart/>Checkout
                </Button>
            </div>

          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Cart;