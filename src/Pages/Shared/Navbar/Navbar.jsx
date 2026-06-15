import React, { useContext } from 'react';
import { NavLink } from 'react-router';
import CampCureLogo from '../CampLogo/CampCureLogo';
import { AuthContext } from '../../../Context/AuthContext';
import { Link } from 'react-router';


const Navbar = () => {
  const {user,logOut}=useContext(AuthContext);

  const handleLogOut = () =>{
    logOut()
    .then(()=>{
      console.log('sign out successfully');
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  const nav = <>
       <li><NavLink to='/'>HOME</NavLink></li>
       <li><NavLink to='/about'>ABOUT US</NavLink></li>
  </>



    return (
<div className="navbar sticky top-0 z-50 bg-base-100 shadow-sm px-5 py-3">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {
          nav
        }
      </ul>
    </div>

    {/* Logo */}
    <a className="btn btn-ghost text-xl">
      <CampCureLogo></CampCureLogo>
    </a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 font-semibold text-primary">
{
  nav
}
    </ul>
  </div>
  <div className="navbar-end">
    {
      user ? <a onClick={handleLogOut} className="btn btn-primary">Logout</a>
      : <Link to='login' className="btn btn-primary">LogIn</Link>
    }
    
  </div>
</div>
    );
};

export default Navbar;