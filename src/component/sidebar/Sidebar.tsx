import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMdArrowBack, IoMdArrowForward, IoMdSettings } from "react-icons/io";
import { FaHome, FaEnvelope, FaInfoCircle,FaChevronCircleLeft  } from "react-icons/fa";

interface SidebarProps {
  isExpanded: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isExpanded, toggleSidebar }) => {
  const pathname = usePathname();

  return (
    <div
      className={`overflow-y-auto sidebar fixed top-0 bottom-0 lg:left-0 px-2 text-center bg-gray-900 ${
        isExpanded ? "w-64" : "w-20"
      } transition-all duration-300`}
    >
      <div className="flex items-center justify-start text-white text-3xl py-4 cursor-pointer">
        {isExpanded ? (
          <>
            <img
              onClick={toggleSidebar}
              src={"/img/brandlogoround.png"}
              alt="Yog Shiksha logo"
              className="h-16"
            />
            <h1 className="text-gray-200 ml-4 text-lg">Yog Shiksha</h1>
            <FaChevronCircleLeft onClick={toggleSidebar} className="ml-auto" />
          </>
        ) : (
          <>
            <img
              onClick={toggleSidebar}
              src={"/img/brandlogoround.png"}
              alt="Yog Shiksha logo"
              className="h-16"
            />
            <IoMdArrowForward onClick={toggleSidebar} className="ml-auto" />
          </>
        )}
      </div>

      <div className="mb-2 mt-1 bg-gray-600 h-[1px]"></div>

      {/* {isExpanded && (
        <div className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white">
          <i className="bi bi-search text-sm"></i>
          <input
            type="text"
            placeholder="Search"
            className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
          />
        </div>
      )} */}

      <Link href="/dashboard">
        <div
          className={`p-2.5 mt-3 flex items-center rounded-md hover:bg-gray-700 px-4 duration-300 cursor-pointer text-white ${
            isExpanded ? "justify-start" : "justify-center"
          } ${pathname === "/dashboard" ? "font-bold bg-blue-600" : ""}`}
        >
          <FaHome className="h-6 w-6 mr-2" />
          <span className="text-[15px]">{isExpanded ? "Dashboard" : ""}</span>
        </div>
      </Link>

      <Link href="/contact">
        <div
          className={`p-2.5 mt-3 flex items-center rounded-md hover:bg-gray-700 px-4 duration-300 cursor-pointer text-white ${
            isExpanded ? "justify-start" : "justify-center"
          } ${pathname === "/contact" ? "font-bold bg-blue-600" : ""}`}
        >
          <FaEnvelope className="h-6 w-6 mr-2" />
          <span className="text-[15px]">{isExpanded ? "Contact Us" : ""}</span>
        </div>
      </Link>

      <Link href="/about">
        <div
          className={`p-2.5 mt-3 flex items-center rounded-md hover:bg-gray-700 px-4 duration-300 cursor-pointer text-white ${
            isExpanded ? "justify-start" : "justify-center"
          } ${pathname === "/about" ? "font-bold bg-blue-600" : ""}`}
        >
          <FaInfoCircle className="h-6 w-6 mr-2" />
          <span className="text-[15px]">{isExpanded ? "About Us" : ""}</span>
        </div>
      </Link>

      <Link href="/setting">
        <div
          className={`p-2.5 mt-3 flex items-center rounded-md hover:bg-gray-700 px-4 duration-300 cursor-pointer text-white ${
            isExpanded ? "justify-start" : "justify-center"
          } ${pathname === "/setting" ? "font-bold bg-blue-600" : ""}`}
        >
          <IoMdSettings className="h-6 w-6 mr-2" />
          <span className="text-[15px]">{isExpanded ? "Setting" : ""}</span>
        </div>
      </Link>

      <Link href="/users">
        <div
          className={`p-2.5 mt-3 flex items-center rounded-md hover:bg-gray-700 px-4 duration-300 cursor-pointer text-white ${
            isExpanded ? "justify-start" : "justify-center"
          } ${pathname === "/users" ? "font-bold bg-blue-600" : ""}`}
        >
          <IoMdSettings className="h-6 w-6 mr-2" />
          <span className="text-[15px]">{isExpanded ? "Users" : ""}</span>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
