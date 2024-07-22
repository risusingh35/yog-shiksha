import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axiosInstance from "@/utils/axiosInstance";
import PageTitleBar from "@/component/pageTitleBar/PageTitleBar";
import SelectField from "@/component/form/SelectField";
import {
  DEPARTMENTS_NAME_OPTIONS,
  ROLE_NAME_OPTIONS,
  ROLE_LEVEL_OPTIONS,
} from "@/constants/selectOptions";
import { useSelector } from "react-redux";
const AddEditRole = () => {
  const router = useRouter();
  const { id } = router.query;
  const { loggedInUser } = useSelector((state: any) => state.auth);
  const [formData, setFormData] = useState({
    department: "",
    roleName: "",
    roleLevel: "",
  });

  useEffect(() => {
    if (id) {
      fetchRoleData(id as string);
    }
  }, [id]);

  const fetchRoleData = async (roleId: string) => {
    try {
      console.log({ roleId });
      const response = await axiosInstance.get(`/roles?id=${roleId}`);
      const role = response.data.role;
      console.log({ response });
      if (role) {
        setFormData({
          roleName: role.roleName || "",
          department: role.department || "",
          roleLevel: role.roleLevel || "",
        });
      }
    } catch (error) {
      console.error("Error fetching role data:", error);
      toast.error("Failed to fetch role data. Please try again later.");
    }
  };

  const filteredRoleOptions = useMemo(() => {
    if (formData.department) {
      return ROLE_NAME_OPTIONS.filter(
        (role) => role.department === formData.department
      );
    } else {
      return [];
    }
  }, [formData.department]);
  const filteredRoleLevelOptions = useMemo(() => {
    switch (formData.department) {
      case "user":
        return ROLE_LEVEL_OPTIONS.filter((level) => level.id === 0);
      case "developer":
        return ROLE_LEVEL_OPTIONS.filter((level) => {
          switch (formData.roleName) {
            case "developer_intern":
              return level.id === 0;
            case "developer_junior":
              return level.id === 2;
            case "developer_senior":
              return level.id === 4;
            case "developer_tl":
              return level.id === 5;
            case "developer_mp":
              return level.id === 6;
            default:
              return level.id === 0;
          }
        });
      default:
        return ROLE_LEVEL_OPTIONS;
    }
  }, [formData.roleName, formData.department]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let response;
      if (id) {
        // Update role
        response = await axiosInstance.put("/roles", {
          ...formData,
          loggedInUserId: loggedInUser?._id,
          id
        });
        if (response.status === 200) {
          toast.success("Role updated successfully!");
        }
      } else {
        // Create new role
        console.log({ formData });
        response = await axiosInstance.post("/roles", {
          ...formData,
          loggedInUserId: loggedInUser?._id,
        });
        if (response.status === 201) {
          toast.success("Role created successfully!");
        }
      }
      router.push("/roles");
    } catch (error) {
      toast.error(
        `Error during ${id ? "update" : "creation"}. Please try again later.`
      );
      console.error(`Error during ${id ? "update" : "creation"}:`, error);
    }
  };

  const handleBackClick = () => {
    router.push("/roles");
  };

  return (
    <div>
      <PageTitleBar
        title="Roles"
        btnText="Back"
        handleBtnClick={handleBackClick}
        isSearchVisible={false}
      />
      <div className="flex justify-center items-center h-full w-full bg-gray-500 p-5">
        <div className="bg-white p-5 rounded shadow-md w-full max-w-2xl">
          <h2 className="text-2xl mb-4">{id ? "Update" : "Create"} Role</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex">
              <SelectField
                label="Role Department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                options={DEPARTMENTS_NAME_OPTIONS}
                valueKey="key"
                labelKey="value"
              />
              <SelectField
                label="Role Name"
                name="roleName"
                value={formData.roleName}
                onChange={handleChange}
                options={filteredRoleOptions}
                valueKey="key"
                labelKey="value"
              />
              <SelectField
                label="Role Level"
                name="roleLevel"
                value={formData.roleLevel}
                onChange={handleChange}
                options={filteredRoleLevelOptions}
                valueKey="key"
                labelKey="value"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
            >
              {id ? "Update" : "Create"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditRole;
