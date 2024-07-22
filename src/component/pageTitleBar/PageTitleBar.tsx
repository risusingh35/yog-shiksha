import React, { FC, useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCog, FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import debounce from "lodash/debounce";

interface PageTitleBarProps {
  title: string;
  btnText: string;
  searchDelay?: number;
  minSearchChars?: number;
  searchPlaceholder?: string;
  isSearchVisible?: boolean;
  performSearch?: (query: string) => void;
  handleBtnClick?: () => void;
}

const PageTitleBar: FC<PageTitleBarProps> = ({
  title,
  searchDelay = 500,
  minSearchChars = 3,
  searchPlaceholder = "Search...",
  performSearch,
  handleBtnClick,
  btnText,
  isSearchVisible = true,
}) => {
  const { isAuth, loggedInUser } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (isAuth) {
      console.log({ loggedInUser });
    }
  }, [isAuth, loggedInUser]);

  const getUserInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const handleLogout = () => {
    if (confirm("Are you sure to logout")) {
      router.push("/login");
      dispatch({ type: "LOGOUT" });
    } else {
      console.log("Not log out");
    }
  };

  const handleSettings = () => {
    // Navigate to settings page
    // router.push('/settings');
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value.length >= minSearchChars || !value.length) {
      console.log(value,'val',typeof value)
      debouncedSearch(value);
    }
  };

  const debouncedSearch = useCallback(
    debounce((query) => performSearch(query || ''), searchDelay),
    [performSearch, searchDelay]
  );

  return (
    <div className="flex flex-row w-full text-3xl bg-gray-900 text-white px-4 mx-4 py-3 items-center justify-between border-b border-l border-l-white">
      <div className="flex flex-row items-center">
        <div className="p-2.5 text-2xl">{title}</div>
        {isSearchVisible && (
          <div className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white ml-4">
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="text-[12px] ml-1 bg-transparent focus:outline-none w-72 "
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ height: "24px" }}
            />
          </div>
        )}
      </div>
      <div className="flex items-center">
        <div className="flex items-center rounded-md duration-300 cursor-pointer bg-blue-500  text-white mr-3">
          <button
            className="rounded-lg flex items-center mx-2 my-1 text-xl"
            onClick={handleBtnClick}
          >
            {btnText}
          </button>
        </div>
        <div>
          {isAuth && loggedInUser && (
            <div className="relative group size-12 rounded-full bg-[#FF9900] flex items-center justify-center">
              {loggedInUser.profilePhoto &&
              loggedInUser.profilePhoto.data.length > 1 ? (
                <img
                  src={`data:image/png;base64,${Buffer.from(
                    loggedInUser.profilePhoto.data
                  ).toString("base64")}`}
                  alt="Profile"
                  className="cursor-pointer rounded-full"
                />
              ) : (
                <div className="flex items-center justify-center cursor-pointer rounded-full">
                  <span className="text-xl">
                    {getUserInitials(
                      loggedInUser.firstName,
                      loggedInUser.lastName
                    )}
                  </span>
                </div>
              )}
              <div className="hidden group-hover:block absolute right-0 mt-0 w-48 bg-gray-700 text-black rounded shadow-lg z-10 flex flex-col items-start text-white text-3xl cursor-pointer">
                <div
                  onClick={handleLogout}
                  className="flex items-center hover:bg-blue-600 px-2 py-1 duration-300 cursor-pointer w-full rounded-t"
                >
                  <FaSignOutAlt className="mr-2" />
                  <span className="text-[15px]">Logout</span>
                </div>
                <div
                  onClick={handleSettings}
                  className="flex items-center hover:bg-blue-600 px-2 py-1 duration-300 cursor-pointer w-full rounded-b"
                >
                  <FaCog className="mr-2" />
                  <span className="text-[15px]">Settings</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageTitleBar;
