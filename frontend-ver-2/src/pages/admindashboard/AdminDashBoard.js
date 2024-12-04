import "bootstrap/dist/css/bootstrap.min.css";
import {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {MyContext} from "../../App";
import '../../App.css';
import HeaderAdmin from '../../components/headerAdmin';
import SidebarAdmin from "../../components/sidebarAdmin";
import AddBrand from '../../pages/admindashboard/AddBrand';
import AddCategory from '../../pages/admindashboard/AddCategory';
import AddProductRam from '../../pages/admindashboard/AddProductRam';
import AddProductSize from '../../pages/admindashboard/AddProductSize';
import AddProductWeight from '../../pages/admindashboard/AddProductWeight';
import AddUser from '../../pages/admindashboard/AddUser';
import CategoryList from '../../pages/admindashboard/CategoryList';
import Dashboard from '../../pages/admindashboard/Dashboard';
import EditCategory from '../../pages/admindashboard/EditCategory';
import EditUser from '../../pages/admindashboard/EditUser';
import ListUser from '../../pages/admindashboard/ListUser';
import OrderList from '../../pages/admindashboard/OrderList';
import ProductDetails from '../../pages/admindashboard/ProductDetails';
import ProductEdit from '../../pages/admindashboard/ProductEdit';
import Products from '../../pages/admindashboard/Products';
import ProductUpload from '../../pages/admindashboard/ProductUpload';


function AdminDashBoard() {
    const [isToggleSidebar, setIsToggleSidebar] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [isHindSidebarAndHeader, setisHindSidebarAndHeader] = useState(false);
    const [themeMode, setThemeMode] = useState(true);

    useEffect(() => {
        if (themeMode === true) {
            document.body.classList.remove('dark');
            document.body.classList.add('light');
            localStorage.setItem('themeMode', 'light');
        } else {
            document.body.classList.remove('light');
            document.body.classList.add('dark');
            localStorage.setItem('themeMode', 'dark');
        }

    }, [themeMode])

    const values = {
        isToggleSidebar,
        setIsToggleSidebar,
        isLogin,
        setIsLogin,
        isHindSidebarAndHeader,
        setisHindSidebarAndHeader,
        themeMode,
        setThemeMode
    }

    return (
        <>
            {
                isHindSidebarAndHeader !== true &&
                <HeaderAdmin/>
            }
            <div className='main d-flex'>
                {
                    isHindSidebarAndHeader !== true &&
                    <div className={`sidebarWrapper ${isToggleSidebar === true ? 'toggle' : ''}`}>
                        <SidebarAdmin/>
                    </div>
                }


                <div className={`content ${isHindSidebarAndHeader === true && 'full'}
            ${isToggleSidebar === true ? 'toggle' : ''}`}>
                    <Routes>
                        <Route path="/" exact={true} element={<Dashboard/>}/>
                        <Route path="/dashboard" exact={true} element={<Dashboard/>}/>
                        <Route path='/products' exact={true} element={<Products/>}/>
                        <Route path='/product/details' exact={true} element={<ProductDetails/>}/>
                        <Route path='/product/upload' exact={true} element={<ProductUpload/>}/>
                        <Route path='/product/addram' exact={true} element={<AddProductRam/>}/>
                        <Route path='/product/addweight' exact={true} element={<AddProductWeight/>}/>
                        <Route path='/product/addsize' exact={true} element={<AddProductSize/>}/>
                        <Route path='/categorys' exact={true} element={<CategoryList/>}/>
                        <Route path='/category/add' exact={true} element={<AddCategory/>}/>
                        <Route path='/brand/add' exact={true} element={<AddBrand/>}/>
                        <Route path='/orders' exact={true} element={<OrderList/>}/>
                        <Route path='/product/edit' exact={true} element={<ProductEdit/>}/>
                        <Route path='/category/edit' exact={true} element={<EditCategory/>}/>
                        <Route path='/user/add' exact={true} element={<AddUser/>}/>
                        <Route path='/users' exact={true} element={<ListUser/>}/>
                        <Route path='/user/edit/:id' exact={true} element={<EditUser/>}/>
                    </Routes>
                </div>
            </div>
        </>
    );
}

export default AdminDashBoard;
