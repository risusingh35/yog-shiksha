import { useState, FC, useEffect, Fragment } from "react";
import { toast } from "react-toastify";
import Spinner from "@/component/spinner/Spinner";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import PageTitleBar from "@/component/pageTitleBar/PageTitleBar";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/router";
import Pagination from "@/component/pagination/Pagination";

interface Role {
  _id: string;
  roleName: string;
  roleLevel: string;
  createdBy: string;
  updatedBy: string;
  isDeleted: boolean;
}

const Roles: FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageLimit, setPageLimit] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRolesCount, setTotalRolesCount] = useState(1);
  const router = useRouter();

  interface getQueryParam {
    searchText?: string;
    pageLimit: number;
    currentPage: number;
  }

  const getAllRoles = async () => {
    try {
      setIsLoading(true);
      let url = "/roles";
      const params: getQueryParam = {
        currentPage,
        pageLimit,
      };
      if (searchText) {
        params.searchText = searchText;
      }
      const response = await axiosInstance.get(url, { params });
      console.log({ response });
      setRoles(response.data.roles);
      setTotalRolesCount(response.data.totalCount);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch roles", {
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
      console.error("Failed to get Roles list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllRoles();
  }, [pageLimit, searchText, currentPage]);

  const handleDeleteRole = async (roleId: string) => {
    try {
      const response = await axiosInstance.delete(`/roles?id=${roleId}`);

      if (response.data.success) {
        toast.success("Role deleted successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setRoles(roles.filter((role) => role._id !== roleId));
      } else {
        throw new Error("Failed to delete role");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Failed to delete role", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error("Failed to delete role:", error);
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
      pathname: "/roles/add-edit",
      query: { id: id },
    });
  };

  return (
    <div className="flex justify-center items-center flex-col h-full">
      <Spinner
        text="Loading role list..."
        closedIn={125000}
        onClose={() => setIsLoading(false)}
        isVisible={isLoading}
      />
      <PageTitleBar
        title="Roles"
        btnText="Create Role"
        performSearch={performSearch}
        handleBtnClick={handleAddEditClick}
        searchDelay={800}
        searchPlaceholder="Search Roles"
      />
      {roles.length > 0 ? (
        <>
          <div className="w-full max-w-full bg-white shadow-md">
            <div
              className="overflow-y-auto"
              style={{ maxHeight: "calc(100vh - 229px)" }}
            >
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="text-left py-2 px-3 border-r">Role Name</th>
                    <th className="text-left py-2 px-3 border-r">Role Level</th>
                    <th className="text-left py-2 px-3 border-r">Created By</th>
                    <th className="text-left py-2 px-3 border-r">Updated By</th>
                    <th className="text-center py-2 px-3 border-r">Status</th>
                    <th className="text-center py-2 px-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map((role) => (
                    <Fragment key={role._id}>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="py-2 px-3 border-r">{role.roleName}</td>
                        <td className="py-2 px-3 border-r">{role.roleLevel}</td>
                        <td className="py-2 px-3 border-r">{role.createdBy}</td>
                        <td className="py-2 px-3 border-r">{role.updatedBy}</td>
                        <td className="py-2 px-3 border-r text-center">
                          {role.isDeleted ? (
                            <span className="inline-block w-4 h-4 rounded-full bg-red-500"></span>
                          ) : (
                            <span className="inline-block w-4 h-4 rounded-full bg-green-500"></span>
                          )}
                        </td>
                        <td className="py-2 px-3 flex justify-center items-center space-x-2">
                          <button
                            onClick={() => handleAddEditClick(role._id)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <BsPencilSquare className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteRole(role._id)}
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
            totalPage={Math.ceil(totalRolesCount / pageLimit)}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            pageLimit={pageLimit}
            onLimitChange={onLimitChange}
            totalItem={totalRolesCount + " Roles"}
          />
        </>
      ) : (
        <p>No roles found.</p>
      )}
    </div>
  );
};

export default Roles;
