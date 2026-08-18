import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router';
import CampCureLogo from '../CampLogo/CampCureLogo';
import { AuthContext } from '../../../Context/AuthContext';
import Swal from 'sweetalert2';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logged Out Successfully!",
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const dashboardPath =
    user?.role === 'organizer'
      ? '/dashboard/manageCamps'
      : '/dashboard/analytics';

  const closeDrawer = () => {
    const drawer = document.getElementById('mobile-drawer');

    if (drawer) {
      drawer.checked = false;
    }
  };

  const mobileNav = (
    <>
      <li>
        <NavLink className="p-3 my-1 bg-blue-50" to="/" onClick={closeDrawer}>
          HOME
        </NavLink>
      </li>

      <li>
        <NavLink className="p-3 my-1 bg-blue-50" to="/about" onClick={closeDrawer}>
          ABOUT US
        </NavLink>
      </li>

      <li>
        <NavLink className="p-3 my-1 bg-blue-50" to="/allCamps" onClick={closeDrawer}>
          ALL CAMPS
        </NavLink>
      </li>

      <li>
        <NavLink className="p-3 my-1 bg-blue-50" to={dashboardPath} onClick={closeDrawer}>
          DASHBOARD
        </NavLink>
      </li>
    </>
  );

  const desktopNav = (
    <>
      <li>
        <NavLink to="/">HOME</NavLink>
      </li>

      <li>
        <NavLink to="/about">ABOUT US</NavLink>
      </li>

      <li>
        <NavLink to="/allCamps">ALL CAMPS</NavLink>
      </li>

      <li>
        <NavLink to={dashboardPath}>
          DASHBOARD
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar sticky top-0 z-50 bg-base-100 shadow-sm md:px-5 md:py-3">

      <div className="navbar-start">

        <div className="drawer lg:hidden">

          <input
            id="mobile-drawer"
            type="checkbox"
            className="drawer-toggle"
          />

          <div className="drawer-content">
            <label
              htmlFor="mobile-drawer"
              className="btn btn-ghost"
            >
                    <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current text-primary"
              >

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>

          <div className="drawer-side z-[100]">

            <label
              htmlFor="mobile-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>

            <ul className="menu bg-base-100 min-h-full w-72 text-primary font-medium">

              <li className="mb-2">
                <CampCureLogo/>
              </li>

              {mobileNav}

            </ul>

          </div>
        </div>

        <a className="btn btn-ghost text-xl hidden lg:block">
          <CampCureLogo />
        </a>

      </div>

      <div className="navbar-center hidden lg:flex">

        <ul className="menu menu-horizontal px-1 font-semibold text-primary">
          {desktopNav}
        </ul>

      </div>

      <div className="navbar-end flex gap-4">

        {user ? (

          <div className="dropdown dropdown-end">

            <div
              tabIndex={0}
              role="button"
            >
              <img
                src={user?.photoURL}
                className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-full"
                alt="Photo"
              />
            </div>

            <ul
              tabIndex="-1"
              className="dropdown-content menu bg-base-100 rounded-box z-[100] w-52 md:w-58 m-3 p-2 shadow-sm md:space-y-2"
            >

              <li className="text-primary font-semibold md:font-bold text-lg mx-auto">
                {user?.displayName}
              </li>

              <li className="text-primary font-semibold md:font-bold text-lg mx-auto">
                <Link to={dashboardPath}>
                  Dashboard
                </Link>
              </li>

              <li>
                <a
                  onClick={handleLogOut}
                  className="btn btn-sm md:btn-md btn-primary"
                >
                  Logout
                </a>
              </li>

            </ul>

          </div>

        ) : (

          <Link
            to="/login"
            className="btn btn-primary"
          >
            LogIn
          </Link>

        )}

      </div>

    </div>
  );
};

export default Navbar;