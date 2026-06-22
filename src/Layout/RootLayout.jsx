import { Outlet } from 'react-router';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import Footer from '../Pages/Shared/Footer/Footer';

const RootLayout = () => {
  
    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar></Navbar>
            
            <div className='flex-grow'>
          <Outlet></Outlet>
            </div>
  
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;