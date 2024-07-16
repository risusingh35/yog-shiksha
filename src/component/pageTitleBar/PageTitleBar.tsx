import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCog, FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/router";
interface PageTitleBarProps {
  title: string;
}

const PageTitleBar: FC<PageTitleBarProps> = ({ title }) => {
  const { isAuth, loggedInUser } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (isAuth) {
      console.log({ loggedInUser });
    }
  }, [isAuth, loggedInUser]);

  const getUserInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const handleLogout = () => {
    alert("LOGOUT");
    dispatch({ type: "LOGOUT" });
  };

  const handleSettings = () => {
    // Navigate to settings page
    // router.push('/settings');
  };

  return (
    <div className="flex flex-row w-full text-3xl bg-gray-900 text-white px-4 py-3 items-center justify-between border-b border-l border-l-white">
      <div>{title}</div>
      <div>
        {isAuth && loggedInUser && (
          <div className="relative group size-12 rounded-full bg-[#FF9900] flex items-center justify-center">
            {loggedInUser.profilePhoto && loggedInUser.profilePhoto.data.length > 1 ? (
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
  );
  
};

export default PageTitleBar;
