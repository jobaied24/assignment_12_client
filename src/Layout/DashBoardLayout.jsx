import { NavLink, Outlet } from "react-router";

const DashBoardLayout = () => {
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
    <ul className="space-y-4 menu bg-base-200 min-h-full w-80 px-6 py-10">
      {/* Sidebar content here */}
      <NavLink>Analytics</NavLink>
      <NavLink>Profile</NavLink>
      <NavLink to="/dashBoard/myRegesteredCamps">My Registered camps</NavLink>
      <NavLink to="/dashBoard/paymentHistory">Payment History</NavLink>
    </ul>
  </div>
</div>
    );
};

export default DashBoardLayout;