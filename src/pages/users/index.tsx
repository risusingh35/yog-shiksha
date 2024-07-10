import { useState, FC, useEffect, Fragment } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "@/component/spinner/Spinner";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import PageTitleBar from "@/component/pageTitleBar/PageTitleBar";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/router";
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
  const router = useRouter();
  const getAllUsers = async () => {
    try {
      setIsLoading(true);
      // const response = await axios.get("/api/users");
      const response = await axiosInstance.get("/users");
      console.log({ response });
      setUsers(response.data.data); 
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
     if (error?.response?.status===403) {
      router.push("/login");
     }
      console.error("Failed to get Users list:", error);

    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleEditUser = (userId: string) => {
    // Implement edit user logic
    console.log("Edit user:", userId);
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const response = await axios.delete('/api/users', { data: { userId } });

      if (response.data.success) {
        toast.success('User deleted successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // Refresh the user list or remove the deleted user from the state
        setUsers(users.filter(user => user._id !== userId));
      } else {
        throw new Error('Failed to delete user');
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
  
  return (
    <div className="flex justify-center items-center flex-col h-full">
      <Spinner
        text="Loading..."
        closedIn={125000}
        onClose={() => setIsLoading(false)}
        isVisible={isLoading}
      />
      <PageTitleBar title='Users'/>
        {users.length > 0 ? (
        <div className="w-full max-w-full bg-white shadow-md  overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="text-left py-2 px-3 border-r">Email</th>
                <th className="text-left py-2 px-3 border-r">Name</th>
                <th className="text-left py-2 px-3 border-r">Contact</th>
                <th className="text-center py-2 px-3 border-r">Status</th>
                <th className="text-center py-2 px-3 border-r">Subscription</th>
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
                        onClick={() => handleEditUser(user._id)}
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
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default Users;
