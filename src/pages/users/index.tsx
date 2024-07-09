import { useState, FC, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "@/component/spinner/Spinner";
const Users: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const getAllUsers = async () => {
    try {
      const response = await axios.get("/api/users");
      console.log({ response });
    } catch (error: any) {
      toast.error(error?.response?.data?.error, {
        position: "top-right",
        autoClose: 15000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setIsLoading(false);
      console.error("Failed to get Users list:", error);
    }
  };
  useEffect(()=>{
    getAllUsers()
  },[])
  return (
    <div className="flex justify-center items-center h-full">
      <Spinner
        text="Loading..."
        closedIn={125000}
        onClose={() => setIsLoading(false)}
        isVisible={isLoading}
      />
      <h1>Users</h1>
      <p>Welcome to the Users page.</p>
    </div>
  );
};

export default Users;
