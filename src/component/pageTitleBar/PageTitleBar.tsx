import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface PageTitleBarProps {
  title: string;
}

const PageTitleBar: FC<PageTitleBarProps> = ({ title }) => {
  const { isAuth, loggedInUser } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (isAuth) {
      console.log({ loggedInUser });
    }
  }, [isAuth, loggedInUser]);

  const getUserInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="flex-row w-full text-3xl bg-gray-900 text-white p-4 flex items-center justify-between border-b border-l border-l-white">
      <div>{title}</div>
      <div>
        {isAuth && loggedInUser ? (
          loggedInUser.profilePhoto && loggedInUser.profilePhoto.data.length ? (
            <img
              src={`data:image/png;base64,${Buffer.from(
                loggedInUser.profilePhoto.data
              ).toString("base64")}`}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-full">
              {getUserInitials(loggedInUser.firstName, loggedInUser.lastName)}
            </div>
          )
        ) : (
          "RK"
        )}
      </div>
    </div>
  );
};

export default PageTitleBar;
