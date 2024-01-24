import React from "react";
import {
  RiHome6Line,
  RiArticleLine,
  RiPieChartLine,
  RiMailLine,
  RiNotification3Line,
  RiSettings4Line,
  RiLogoutCircleRLine,
} from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

const NavLink = ({ to, icon, text, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li
      className={`${
        isActive
          ? "bg-[#262837] p-4 rounded-tl-xl rounded-bl-xl"
          : "hover:bg-[#262837] p-4 rounded-tl-xl rounded-bl-xl group transition-colors"
      }`}
    >
      <Link
        to={to}
        className={`${
          isActive
            ? "bg-[#ec7c6a] p-4 flex justify-center rounded-xl text-white"
            : "group-hover:bg-[#ec7c6a] p-4 flex justify-center rounded-xl text-[#ec7c6a] group-hover:text-white transition-colors"
        }`}
        onClick={onClick}
      >
        {icon}
      </Link>
    </li>
  );
};

const Sidebar = (props) => {
  const [logout, setLogout] = useState(false);
  const handleLogout = () => {
    window.localStorage.removeItem("token"); // Elimina  de acceso
    setLogout(!logout);
    setTimeout(() => {
      window.location.reload();
    }, 1200);
  };
  if (logout) {
    return <Navigate to="/" />; // Redirecciona a la página Home después del inicio de sesión exitoso
  }
  const { showMenu } = props;

  return (
    <div
      className={`bg-[#1F1D2B] fixed lg:left-0 top-0 w-28 h-full flex flex-col justify-between py-6 rounded-tr-xl rounded-br-xl z-50 transition-all ${
        showMenu ? "left-0" : "-left-full"
      }`}
    >
      <div>
        <ul className="pl-4">
          <li>
            <h1 className="text-2xl text-gray-300 uppercase font-bold text-center my-5">
              Logo
            </h1>
          </li>
          <NavLink
            to="/home"
            icon={<RiHome6Line className="text-2xl" />}
            text="Home"
          />
          <NavLink
            to="/menu"
            icon={<RiArticleLine className="text-2xl" />}
            text="Menu"
          />
          <NavLink
            to="/pedidos"
            icon={<RiPieChartLine className="text-2xl" />}
            text="pedidos"
          />
          <NavLink
            to="#"
            icon={<RiMailLine className="text-2xl" />}
            text="Mail"
          />
          <NavLink
            to="#"
            icon={<RiNotification3Line className="text-2xl" />}
            text="Notifications"
          />
          <NavLink
            to="#"
            icon={<RiSettings4Line className="text-2xl" />}
            text="Settings"
          />
        </ul>
      </div>
      <div>
        <ul className="pl-4">
          <NavLink
            icon={<RiLogoutCircleRLine className="text-2xl" />}
            text="Logout"
            onClick={handleLogout}
          />
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
