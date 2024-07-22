import { useState, FC, useEffect, Fragment } from "react";
import { toast } from "react-toastify";
import Spinner from "@/component/spinner/Spinner";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import PageTitleBar from "@/component/pageTitleBar/PageTitleBar";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/router";
import Pagination from "@/component/pagination/Pagination";

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  contact: string;
  address: {
    country: string;
    state: string;
    city: string;
    _id: string;
  };
  isActive: boolean;
  isActiveSubscription: boolean;
  __v: number;
}

const Users: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageLimit, setPageLimit] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsersCount, setTotalUsersCount] = useState(1);
  const router = useRouter();
  interface getQueryParam {
    searchText?: string;
    pageLimit: number;
    currentPage: number;
  }
  const getAllUsers = async () => {
    try {
      setIsLoading(true);
      let url = "/users";
      const params: getQueryParam = {
        currentPage,
        pageLimit,
      };
      if (searchText) {
        params.searchText = searchText;
      }
      const response = await axiosInstance.get(url, { params });
      console.log({ response });
      setUsers(response.data.users);
      setTotalUsersCount(response.data.totalCount);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch users", {
        position: "top-right",
        autoClose: 15000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      if (error?.response?.status === 403) {
        router.push("/login");
      }
      console.error("Failed to get Users list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [pageLimit, searchText, currentPage]);

  // const handleEditUser = (userId: string) => {
  //   console.log("Edit user:", userId);
  // };

  const handleDeleteUser = async (userId: string) => {
    try {
      const response = await axiosInstance.delete("/users", {
        data: { userId },
      });

      if (response.data.success) {
        toast.success("User deleted successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setUsers(users.filter((user) => user._id !== userId));
      } else {
        throw new Error("Failed to delete user");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Failed to delete user", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error("Failed to delete user:", error);
    }
  };
  const performSearch = (query: string) => {
    setSearchText(query);
    console.log("Searching for:", query);
  };
  const onLimitChange = (limit: number) => {
    setPageLimit(limit);
    setCurrentPage(1);
    console.log("onLimitChange for:", limit);
  };
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const handleAddEditClick = (id: string | null = null) => {
    router.push({
        pathname: '/users/add-edit',
        query: { id: id }
    });
};

  return (
    <div className="flex justify-center items-center flex-col h-full">
      <Spinner
        text="Loading user list..."
        closedIn={125000}
        onClose={() => setIsLoading(false)}
        isVisible={isLoading}
      />
      <PageTitleBar
        title="Users"
        btnText="Create User"
        performSearch={performSearch}
        handleBtnClick={handleAddEditClick}
        searchDelay={800}
        searchPlaceholder="Search Users"
      />
      {users.length > 0 ? (
        <>
          <div className="w-full max-w-full bg-white shadow-md">
            <div
              className="overflow-y-auto"
              style={{ maxHeight: "calc(100vh - 229px)" }}
            >
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="text-left py-2 px-3 border-r">Email</th>
                    <th className="text-left py-2 px-3 border-r">Name</th>
                    <th className="text-left py-2 px-3 border-r">Contact</th>
                    <th className="text-center py-2 px-3 border-r">Status</th>
                    <th className="text-center py-2 px-3 border-r">
                      Subscription
                    </th>
                    <th className="text-center py-2 px-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <Fragment key={user._id}>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="py-2 px-3 border-r">{user.email}</td>
                        <td className="py-2 px-3 border-r">{`${user.firstName} ${user.lastName}`}</td>
                        <td className="py-2 px-3 border-r">{user.contact}</td>
                        <td className="py-2 px-3 border-r text-center">
                          {user.isActive ? (
                            <span className="inline-block w-4 h-4 rounded-full bg-green-500"></span>
                          ) : (
                            <span className="inline-block w-4 h-4 rounded-full bg-red-500"></span>
                          )}
                        </td>
                        <td className="py-2 px-3 border-r text-center">
                          {user.isActiveSubscription ? (
                            <span className="inline-block w-4 h-4 rounded-full bg-green-500"></span>
                          ) : (
                            <span className="inline-block w-4 h-4 rounded-full bg-gray-400"></span>
                          )}
                        </td>
                        <td className="py-2 px-3 flex justify-center items-center space-x-2">
                          <button
                            onClick={() => handleAddEditClick(user._id)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <BsPencilSquare className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <BsTrash className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Pagination
            totalPage={Math.ceil(totalUsersCount / pageLimit)}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            pageLimit={pageLimit}
            onLimitChange={onLimitChange}
            totalItem={totalUsersCount + " Users"}
          />
        </>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default Users;
