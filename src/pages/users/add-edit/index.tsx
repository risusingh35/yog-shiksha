import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import InputField from "@/component/form/InputField";
import axiosInstance from "@/utils/axiosInstance";
import PageTitleBar from "@/component/pageTitleBar/PageTitleBar";

const AddEditUser = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    contact: "",
    country: "India",
    state: "",
    city: "",
    addressLine1: "",
    pinCode: "",
    profilePhoto: null as File | null,
    isActive: true,
    isActiveSubscription: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchUserData(id);
    }
  }, [id]);

  const fetchUserData = async (id: string | string[]) => {
    try {
      const response = await axiosInstance.get(`/users/find-one?id=${id}`);
      const user = response?.data?.user;

      if (user) {
        setFormData({
          email: user.email || "",
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          contact: user.contact || "",
          country: user.address?.country || "India",
          state: user.address?.state || "",
          city: user.address?.city || "",
          addressLine1: user.address?.addressLine1 || "",
          pinCode: user.address?.pinCode || "",
          profilePhoto: null, // Handle profile photo separately if needed
          isActive: user.isActive ?? true,
          isActiveSubscription: user.isActiveSubscription ?? true,
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to fetch user data. Please try again later.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === "file") {
      setFormData({
        ...formData,
        profilePhoto: (e.target as HTMLInputElement).files?.[0] || null,
      });
    } else if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleSubmit clicked");

    if (isSubmitting) return;
    setIsSubmitting(true);
    let response: any;
    try {
      console.log("handleSubmit clicked data", formData);
      const data = new FormData();

      // Append form data fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          data.append(key, value as string | Blob);
        }
      });
      if (id) {
        data.append("id", id as string);

        const endpoint = "/users"; // Endpoint for updating user
        response = await axiosInstance.put(endpoint, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        const endpoint = "/users/create"; // Endpoint for creating new user
        response = await axiosInstance.post(endpoint, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      if (response.status === 200 || response.status === 201) {
        toast.success(`User ${id ? "updated" : "created"} successfully!`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        router.push("/users");
      }
    } catch (error) {
      toast.error(
        `Error during ${id ? "update" : "creation"}. Please try again later.`,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      console.error(`Error during ${id ? "update" : "creation"}:`, error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleBackClick = () => {
    router.push('/users');
};
  return (
    <div className="">
      <PageTitleBar
        title="Users"
        btnText="Back"
        handleBtnClick={handleBackClick}
        isSearchVisible={false}
      />
      <div className="flex justify-center items-center h-full w-full bg-gray-500 p-5">
        <div className="bg-white p-5 rounded shadow-md w-full max-w-2xl">
          <h2 className="text-2xl mb-4">{id ? "Update" : "Create"} User</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex items-center">
              <InputField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={id ? true : false}
              />
              <InputField
                label="Contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4 flex items-center">
              <InputField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <InputField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4 flex items-center">
              <InputField
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
              <InputField
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4 flex items-center">
              <InputField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
              <InputField
                label="House/Flat/Building"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4 flex items-center">
              <InputField
                label="Pin Code"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleChange}
                required
              />
              <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Profile Photo:
                </label>
                <input
                  type="file"
                  name="profilePhoto"
                  onChange={handleChange}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
              disabled={isSubmitting}
            >
              {id ? "Update" : "Create"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditUser;
