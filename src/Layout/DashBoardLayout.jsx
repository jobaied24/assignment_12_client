import { NavLink, Outlet } from "react-router";
import useUserRole from "../Hook/useUserRole";
import {
  FaChartPie,
  FaCampground,
  FaMoneyCheckAlt,
  FaPlusCircle,
  FaClipboardList,
  FaUsers,
  FaUserCircle,
  FaClipboardCheck,
} from "react-icons/fa";
import CampCureLogo from "../Pages/Shared/CampLogo/CampCureLogo";

const DashBoardLayout = () => {
  const { role } = useUserRole();
  console.log(role);


  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
        {/* Page content here */}
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full  lg:hidden">
          <div className="flex-none">
            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
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
          <div className="mx-2 flex-1 px-2">Navbar Title</div>
        </div>

        {/* Page content here */}
        <Outlet></Outlet>

      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
       
<ul className="menu bg-base-200 min-h-full w-80 px-3 py-7 space-y-2">

  {/* Logo */}
  <div className="mb-4"> 
  <CampCureLogo></CampCureLogo>
  </div>

  {/* Participant Sidebar */}
  {role === "participant" && (
    <>
      <NavLink
        to="/dashboard/analytics"
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-4 rounded-md font-medium transition-all duration-200 ${
            isActive
              ? "bg-blue-100 text-primary"
              : "text-gray-600 hover:bg-blue-100 hover:text-primary"
          }`
        }
      >
        <FaChartPie className="text-lg" />
        <span>Analytics</span>
      </NavLink>

      <NavLink
        to="/dashboard/myRegesteredCamps"
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-4 rounded-md font-medium transition-all duration-200 ${
            isActive
              ? "bg-blue-100 text-primary"
              : "text-gray-600 hover:bg-blue-100 hover:text-primary"
          }`
        }
      >
  <FaClipboardCheck className="text-lg" />
        <span>My Registered Camps</span>
      </NavLink>

      <NavLink
        to="/dashboard/paymentHistory"
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-4 rounded-md font-medium transition-all duration-200 ${
            isActive
              ? "bg-blue-100 text-primary"
              : "text-gray-600 hover:bg-blue-100 hover:text-primary"
          }`
        }
      >
        <FaMoneyCheckAlt className="text-lg" />
        <span>Payment History</span>
      </NavLink>
    </>
  )}

  {/* Organizer Sidebar */}
  {role === "organizer" && (
    <>
      <NavLink
        to="/dashboard/addCamp"
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-4 rounded-md font-medium transition-all duration-200 ${
            isActive
              ? "bg-blue-100 text-primary"
              : "text-gray-600 hover:bg-blue-100 hover:text-primary"
          }`
        }
      >
        <FaPlusCircle className="text-lg" />
        <span>Add Camp</span>
      </NavLink>

      <NavLink
        to="/dashboard/manageCamps"
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-4 rounded-md font-medium transition-all duration-200 ${
            isActive
              ? "bg-blue-100 text-primary"
              : "text-gray-600 hover:bg-blue-100 hover:text-primary"
          }`
        }
      >
        <FaClipboardList className="text-lg" />
        <span>Manage Camps</span>
      </NavLink>

      <NavLink
        to="/dashboard/manageRegisteredCamps"
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-4 rounded-md font-medium transition-all duration-200 ${
            isActive
              ? "bg-blue-100 text-primary"
              : "text-gray-600 hover:bg-blue-100 hover:text-primary"
          }`
        }
      >
        <FaUsers className="text-lg" />
        <span>Manage Registered Camps</span>
      </NavLink>
    </>
  )}

  {/* Profile */}
  <NavLink
    to="/dashboard/profile"
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-4 rounded-md font-medium transition-all duration-200 ${
        isActive
          ? "bg-blue-100 text-primary"
          : "text-gray-600 hover:bg-blue-100 hover:text-primary"
      }`
    }
  >
    <FaUserCircle className="text-lg" />
    <span>Profile</span>
  </NavLink>

</ul>
      </div>
    </div>
  );
};

export default DashBoardLayout;

