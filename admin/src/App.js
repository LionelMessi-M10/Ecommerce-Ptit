import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { createContext, useEffect, useState } from 'react';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import ProductUpload from './pages/ProductUpload';
import AddProductRam from './pages/AddProductRam';
import AddProductWeight from './pages/AddProductWeight';
import AddProductSize from './pages/AddProductSize';
import CategoryList from './pages/CategoryList';
import AddCategory from './pages/AddCategory';
import AddBrand from './pages/AddBrand';
import OrderList from './pages/OrderList';
import ProductEdit from './pages/ProductEdit';
import EditCategory from './pages/EditCategory';
import AddUser from './pages/AddUser';
import ListUser from './pages/ListUser';
import EditUser from './pages/EditUser';


const MyContext = createContext();

function App() {

  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isHindSidebarAndHeader, setisHindSidebarAndHeader] = useState(false);
  const [themeMode, setThemeMode] = useState(true);

  useEffect(() => {
    if (themeMode === true) {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
      localStorage.setItem('themeMode', 'light');
    }else{
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
    <BrowserRouter>
      <MyContext.Provider value={values}>
        {
          isHindSidebarAndHeader !== true &&
          <Header />
        }
        <div className='main d-flex'>
          {
            isHindSidebarAndHeader !== true &&
            <div className={`sidebarWrapper ${isToggleSidebar === true ? 'toggle' : ''}`}>
              <Sidebar />
            </div>
          }


          <div className={`content ${isHindSidebarAndHeader === true && 'full'} 
            ${isToggleSidebar === true ? 'toggle' : ''}`}>
            <Routes>
              <Route path="/" exact={true} element={<Dashboard />} />
              <Route path="/dashboard" exact={true} element={<Dashboard />} />
              <Route path="/login" exact={true} element={<Login />} />
              <Route path="/signUp" exact={true} element={<SignUp />} />
              <Route path='/products' exact={true} element={<Products />} />
              <Route path='/product/details' exact={true} element={<ProductDetails />} />
              <Route path='/product/upload' exact={true} element={<ProductUpload />} />
              <Route path='/product/addram' exact={true} element={<AddProductRam />} />
              <Route path='/product/addweight' exact={true} element={<AddProductWeight />} />
              <Route path='/product/addsize' exact={true} element={<AddProductSize />} />
              <Route path='/categorys' exact={true} element={<CategoryList />} />
              <Route path='/category/add' exact={true} element={<AddCategory />} />
              <Route path='/brand/add' exact={true} element={<AddBrand />} />
              <Route path='/orders' exact={true} element={<OrderList />} />
              <Route path='/product/edit' exact={true} element={<ProductEdit />} />
              <Route path='/category/edit' exact={true} element={<EditCategory />} />
              <Route path='/user/add' exact={true} element={<AddUser />} />
              <Route path='/users' exact={true} element={<ListUser />} />
              <Route path='/user/edit' exact={true} element={<EditUser />} />
            </Routes>
          </div>
        </div>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
export { MyContext }
