import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMdClose ,IoMdSettings } from "react-icons/io";
import { FaBars, FaHome, FaEnvelope, FaInfoCircle } from "react-icons/fa";

interface SidebarProps {
  isExpanded: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isExpanded, toggleSidebar }) => {
  const pathname = usePathname();

  return (
    <div
      className={`overflow-y-auto sidebar fixed top-0 bottom-0 lg:left-0 p-2 text-center bg-gray-900 ${
        isExpanded ? "w-64" : "w-20"
      } transition-all duration-300`}
    >
      <div className="flex items-center justify-evenly text-white text-3xl py-4 cursor-pointer">
        {isExpanded ? (
          <>
            <FaBars onClick={toggleSidebar} />
            <h1 className="text-gray-200 ml-4 text-lg">BrandName</h1>
          </>
        ) : (
          <IoMdClose onClick={toggleSidebar} />
        )}
      </div>

      <div className="my-2 bg-gray-600 h-[1px]"></div>

      {isExpanded && (
        <div className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white">
          <i className="bi bi-search text-sm"></i>
          <input
            type="text"
            placeholder="Search"
            className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
          />
        </div>
      )}

      <Link href="/dashboard">
        <div
          className={`p-2.5 mt-3 flex items-center rounded-md hover:bg-gray-700 px-4 duration-300 cursor-pointer  text-white ${
            pathname === "/dashboard" ? "font-bold bg-blue-600" : ""
          } ${isExpanded ? "" : "justify-center"}`}
        >
          <FaHome className={isExpanded ? "" : "mx-auto"} />
          {isExpanded && (
            <span className="text-[15px] ml-4">Dashboard</span>
          )}
        </div>
      </Link>

      <Link href="/contact">
        <div
          className={`p-2.5 mt-3 flex items-center rounded-md hover:bg-gray-700 px-4 duration-300 cursor-pointer  text-white ${
            pathname === "/contact" ? "font-bold bg-blue-600" : ""
          } ${isExpanded ? "" : "justify-center"}`}
        >
          <FaEnvelope className={isExpanded ? "" : "mx-auto"} />
          {isExpanded && (
            <span className="text-[15px] ml-4">Contact Us</span>
          )}
        </div>
      </Link>

      <Link href="/about">
        <div
          className={`p-2.5 mt-3 flex items-center rounded-md hover:bg-gray-700 px-4 duration-300 cursor-pointer  text-white ${
            pathname === "/about" ? "font-bold bg-blue-600" : ""
          } ${isExpanded ? "" : "justify-center"}`}
        >
          <FaInfoCircle className={isExpanded ? "" : "mx-auto"} />
          {isExpanded && (
            <span className="text-[15px] ml-4">About Us</span>
          )}
        </div>
      </Link>
      <Link href="/setting">
        <div
          className={`p-2.5 mt-3 flex items-center rounded-md hover:bg-gray-700 px-4 duration-300 cursor-pointer  text-white ${
            pathname === "/setting" ? "font-bold bg-blue-600" : ""
          } ${isExpanded ? "" : "justify-center"}`}
        >
          <IoMdSettings className={isExpanded ? "" : "mx-auto"} />
          {isExpanded && (
            <span className="text-[15px] ml-4">Setting</span>
          )}
        </div>
      </Link>
      <Link href="/users">
        <div
          className={`p-2.5 mt-3 flex items-center rounded-md hover:bg-gray-700 px-4 duration-300 cursor-pointer  text-white ${
            pathname === "/users" ? "font-bold bg-blue-600" : ""
          } ${isExpanded ? "" : "justify-center"}`}
        >
          <IoMdSettings className={isExpanded ? "" : "mx-auto"} />
          {isExpanded && (
            <span className="text-[15px] ml-4">Users</span>
          )}
        </div>
      </Link>
      {/* <Link href="/login">
        <div
          className={`p-2.5 mt-3 flex items-center rounded-md hover:bg-gray-700 px-4 duration-300 cursor-pointer  text-white ${
            pathname === "/login" ? "font-bold bg-blue-600" : ""
          } ${isExpanded ? "" : "justify-center"}`}
        >
          <IoMdSettings className={isExpanded ? "" : "mx-auto"} />
          {isExpanded && (
            <span className="text-[15px] ml-4">Login</span>
          )}
        </div>
      </Link> */}
    </div>
  );
};

export default Sidebar;
